from __future__ import annotations

import asyncio
import argparse
import getpass
import json
import os
import shutil
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from PIL import Image, ImageDraw, ImageOps
from pyzbar.pyzbar import ZBarSymbol, decode
from telethon import TelegramClient
from telethon.errors import FloodWaitError

PROJECT_ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIRECTORY = PROJECT_ROOT / "images" / "telegram"
ORIGINALS_DIRECTORY = OUTPUT_DIRECTORY / "originals"
SESSION_PATH = PROJECT_ROOT / ".telegram-session"
MANIFEST_PATH = OUTPUT_DIRECTORY / "manifest.json"
CHANNEL_PRODUCTS_PATH = PROJECT_ROOT / "scripts" / "telegram-products.js"
SUPPORTED_IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tif", ".tiff"}
NON_CLOTHING_MESSAGE_IDS = {361, 362, 363}


def read_manifest() -> dict[str, Any]:
    if not MANIFEST_PATH.exists():
        return {"channel": "@Zous13", "items": []}

    with MANIFEST_PATH.open("r", encoding="utf-8-sig") as manifest_file:
        manifest = json.load(manifest_file)
    manifest.setdefault("channel", "@Zous13")
    manifest.setdefault("items", [])
    return manifest


def write_manifest(manifest: dict[str, Any]) -> None:
    MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def write_channel_products(manifest: dict[str, Any]) -> int:
    grouped_items: dict[tuple[int, str], list[dict[str, Any]]] = {}
    channel_items = [
        item
        for item in manifest["items"]
        if item.get("channelId") is not None and int(item.get("messageId", 0)) not in NON_CLOTHING_MESSAGE_IDS
    ]
    for item in channel_items:
        group_id = item.get("groupedId") or item.get("publishedAt") or str(item.get("messageId"))
        key = (int(item["channelId"]), str(group_id))
        grouped_items.setdefault(key, []).append(item)

    products: list[dict[str, Any]] = []
    for (_, _), images in grouped_items.items():
        images.sort(key=lambda item: int(item.get("messageId", 0)))
        captions = [item.get("caption", "").strip() for item in images if item.get("caption", "").strip()]
        combined_caption = " ".join(captions)
        if "عيد" in combined_caption and ("تهنئ" in combined_caption or "مبارك" in combined_caption):
            continue

        for start in range(0, len(images), 10):
            image_batch = images[start : start + 10]
            first = image_batch[0]
            captions = [item.get("caption", "").strip() for item in image_batch if item.get("caption", "").strip()]
            products.append(
                {
                    "title": f"منتج إضافي #{first.get('messageId', '—')}",
                    "caption": captions[0] if captions else "",
                    "price": None,
                    "type": "channel",
                    "category": "channel",
                    "season": "summer",
                    "description": "قطعة صيفية من تشكيلة ZOUS. تواصل معنا لتأكيد اللون والمقاس والسعر.",
                    "images": [item["fileName"] for item in image_batch],
                    "publishedAt": first.get("publishedAt", ""),
                }
            )

    products.sort(key=lambda product: (product["publishedAt"], product["title"]))
    source = "window.telegramProducts = " + json.dumps(products, ensure_ascii=False, separators=(",", ":")) + ";\n"
    CHANNEL_PRODUCTS_PATH.write_text(source, encoding="utf-8")
    return len(products)


def find_green_qr_sticker(image: Image.Image) -> tuple[int, int, int, int] | None:
    width, height = image.size
    corner_width = int(width * 0.25)
    corner_top = int(height * 0.70)

    for side in ("left", "right"):
        left = 0 if side == "left" else width - corner_width
        crop = image.crop((left, corner_top, left + corner_width, height)).convert("RGB")
        sample = crop.resize((128, 128))
        green_points = [
            (index % 128, index // 128)
            for index, (red, green, blue) in enumerate(sample.get_flattened_data())
            if green > 70 and green > red * 1.35 and green > blue * 1.1
        ]
        if len(green_points) < 100:
            continue

        min_x = min(point[0] for point in green_points) * crop.width / 128
        max_x = (max(point[0] for point in green_points) + 1) * crop.width / 128
        min_y = min(point[1] for point in green_points) * crop.height / 128
        max_y = (max(point[1] for point in green_points) + 1) * crop.height / 128
        padding_x = max(8, round((max_x - min_x) * 0.12))
        padding_y = max(8, round((max_y - min_y) * 0.12))
        return (
            max(0, round(left + min_x - padding_x)),
            max(0, round(corner_top + min_y - padding_y)),
            min(width, round(left + max_x + padding_x)),
            min(height, round(corner_top + max_y + padding_y)),
        )

    return None


def image_extension(message: Any) -> str:
    message_file = message.file
    extension = Path(message_file.name or "").suffix.lower() if message_file else ""
    if not extension and message_file:
        extension = (message_file.ext or "").lower()
    return extension if extension in SUPPORTED_IMAGE_EXTENSIONS else ".jpg"


def create_qr_masked_copy(original_path: Path, clean_path: Path) -> tuple[bool, bool]:
    clean_path.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(original_path) as source_image:
        image = ImageOps.exif_transpose(source_image).convert("RGB")
        qr_codes = decode(image, symbols=[ZBarSymbol.QRCODE])
        draw = ImageDraw.Draw(image)
        if qr_codes:
            for qr_code in qr_codes:
                box = qr_code.rect
                padding_x = max(8, round(box.width * 0.12))
                padding_y = max(8, round(box.height * 0.12))
                draw.rectangle(
                    (
                        max(0, box.left - padding_x),
                        max(0, box.top - padding_y),
                        min(image.width, box.left + box.width + padding_x),
                        min(image.height, box.top + box.height + padding_y),
                    ),
                    fill="white",
                )
        else:
            green_sticker = find_green_qr_sticker(image)
            if green_sticker is None:
                shutil.copy2(original_path, clean_path)
                return False, False
            draw.rectangle(green_sticker, fill="white")

        image.save(clean_path, quality=95 if clean_path.suffix.lower() in {".jpg", ".jpeg"} else None)
        return True, True


def has_image_media(message: Any) -> bool:
    if message.photo:
        return True
    mime_type = message.file.mime_type if message.file else None
    return bool(message.document and mime_type and mime_type.lower().startswith("image/"))


def load_credentials() -> tuple[int, str]:
    api_id_value = os.environ.get("TELEGRAM_API_ID") or input("Telegram API ID from my.telegram.org: ").strip()
    api_hash = os.environ.get("TELEGRAM_API_HASH") or getpass.getpass("Telegram API hash (input hidden): ").strip()
    try:
        api_id = int(api_id_value)
    except ValueError as error:
        raise ValueError("TELEGRAM_API_ID must be a number.") from error
    if not api_hash:
        raise ValueError("Telegram API hash is required.")
    return api_id, api_hash


def clean_existing_local_images() -> None:
    OUTPUT_DIRECTORY.mkdir(parents=True, exist_ok=True)
    ORIGINALS_DIRECTORY.mkdir(parents=True, exist_ok=True)
    manifest = read_manifest()
    records_by_source = {
        item.get("sourcePath"): item
        for item in manifest["items"]
        if item.get("source") == "local-library"
    }
    source_images = sorted(
        path
        for path in (PROJECT_ROOT / "images").iterdir()
        if path.is_file() and path.suffix.lower() in SUPPORTED_IMAGE_EXTENSIONS
    )
    processed_count = 0
    masked_count = 0
    no_qr_count = 0

    for source_path in source_images:
        relative_source = source_path.relative_to(PROJECT_ROOT).as_posix()
        file_name = source_path.name
        original_path = ORIGINALS_DIRECTORY / file_name
        clean_path = OUTPUT_DIRECTORY / file_name
        existing_record = records_by_source.get(relative_source)

        if existing_record and existing_record.get("qrProcessed") is True and clean_path.exists():
            continue

        if not original_path.exists():
            shutil.copy2(source_path, original_path)
        try:
            qr_detected, qr_masked = create_qr_masked_copy(original_path, clean_path)
        except Exception as error:
            print(f"Could not prepare {file_name}: {error}")
            continue

        record = {
            "source": "local-library",
            "sourcePath": relative_source,
            "caption": "",
            "fileName": file_name,
            "path": f"images/telegram/{file_name}",
            "originalPath": f"images/telegram/originals/{file_name}",
            "qrDetected": qr_detected,
            "qrMasked": qr_masked,
            "qrProcessed": True,
        }
        if existing_record:
            existing_record.update(record)
        else:
            manifest["items"].append(record)
            records_by_source[relative_source] = record
        processed_count += 1
        masked_count += int(qr_masked)
        no_qr_count += int(not qr_detected)

    if processed_count:
        write_manifest(manifest)
    product_count = write_channel_products(manifest)
    print(f"Built {product_count} channel product cards from the Telegram manifest.")
    print(
        f"Prepared {processed_count} local images; masked {masked_count} QR codes; "
        f"left {no_qr_count} images unchanged because no QR was detected."
    )


async def import_channel_history() -> None:
    OUTPUT_DIRECTORY.mkdir(parents=True, exist_ok=True)
    ORIGINALS_DIRECTORY.mkdir(parents=True, exist_ok=True)
    api_id, api_hash = load_credentials()
    channel = os.environ.get("TELEGRAM_CHANNEL_USERNAME", "Zous13").strip().lstrip("@")
    manifest = read_manifest()
    processed_message_ids = {
        item.get("messageId")
        for item in manifest["items"]
        if item.get("qrProcessed") is True
    }

    async with TelegramClient(str(SESSION_PATH), api_id, api_hash) as client:
        await client.start()
        entity = await client.get_entity(channel)
        channel_id = int(entity.id)
        manifest["channel"] = f"@{channel}"
        print(f"Importing image history from @{channel}. Original files will be preserved.")

        imported_count = 0
        masked_count = 0
        undetected_count = 0

        async for message in client.iter_messages(entity, reverse=True):
            if not has_image_media(message) or message.id in processed_message_ids:
                continue

            extension = image_extension(message)
            file_name = f"{channel_id}_{message.id}{extension}"
            original_path = ORIGINALS_DIRECTORY / file_name
            clean_path = OUTPUT_DIRECTORY / file_name

            if clean_path.exists() and not original_path.exists():
                shutil.copy2(clean_path, original_path)
            if not original_path.exists():
                await message.download_media(file=str(original_path))
            if not original_path.exists():
                continue

            try:
                qr_detected, qr_masked = create_qr_masked_copy(original_path, clean_path)
            except Exception as error:
                print(f"Could not prepare {file_name}: {error}")
                continue

            manifest["items"].append(
                {
                    "channel": f"@{channel}",
                    "channelId": channel_id,
                    "messageId": message.id,
                    "groupedId": message.grouped_id,
                    "caption": message.message or "",
                    "fileName": file_name,
                    "path": f"images/telegram/{file_name}",
                    "originalPath": f"images/telegram/originals/{file_name}",
                    "publishedAt": message.date.astimezone(timezone.utc).isoformat(),
                    "qrDetected": qr_detected,
                    "qrMasked": qr_masked,
                    "qrProcessed": True,
                }
            )
            write_manifest(manifest)
            processed_message_ids.add(message.id)
            imported_count += 1
            masked_count += int(qr_masked)
            undetected_count += int(not qr_detected)

            if imported_count % 25 == 0:
                print(f"Processed {imported_count} images; QR masked in {masked_count}.")

        print(
            f"Finished. Processed {imported_count} images; masked {masked_count} QR codes; "
            f"no QR detected in {undetected_count}."
        )
        if undetected_count:
            print("Review manifest.json entries with qrDetected=false before publishing those images.")
        product_count = write_channel_products(manifest)
        print(f"Built {product_count} channel product cards from the Telegram manifest.")


def main() -> None:
    parser = argparse.ArgumentParser(description="Import Telegram photos or prepare a QR-masked display copy.")
    parser.add_argument(
        "--prepare-image",
        nargs=2,
        metavar=("ORIGINAL", "OUTPUT"),
        help="Create a QR-masked output copy from one already downloaded image.",
    )
    parser.add_argument(
        "--clean-existing",
        action="store_true",
        help="Create QR-masked display copies from local images without Telegram login.",
    )
    parser.add_argument(
        "--build-catalog",
        action="store_true",
        help="Build channel product cards from the local manifest without Telegram login.",
    )
    arguments = parser.parse_args()

    if arguments.prepare_image:
        original_path, output_path = map(Path, arguments.prepare_image)
        detected, masked = create_qr_masked_copy(original_path, output_path)
        print(json.dumps({"qrDetected": detected, "qrMasked": masked}))
        return
    if arguments.clean_existing:
        clean_existing_local_images()
        return
    if arguments.build_catalog:
        manifest = read_manifest()
        product_count = write_channel_products(manifest)
        print(f"Built {product_count} channel product cards from the Telegram manifest.")
        return

    try:
        asyncio.run(import_channel_history())
    except FloodWaitError as error:
        print(f"Telegram rate limit reached. Retry after {error.seconds} seconds.")
    except KeyboardInterrupt:
        print("Import cancelled. Completed downloads and the manifest were preserved.")
    except Exception as error:
        print(f"Import stopped: {error}")
        raise SystemExit(1) from error


if __name__ == "__main__":
    main()
