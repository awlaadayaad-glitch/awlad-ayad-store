$ErrorActionPreference = 'Stop'
$maxPhotoBytes = 20MB
$botToken = $env:TELEGRAM_BOT_TOKEN
$channelUsername = if ($env:TELEGRAM_CHANNEL_USERNAME) { $env:TELEGRAM_CHANNEL_USERNAME } else { 'Zous13' }
$channelUsername = $channelUsername.Trim().TrimStart('@').ToLowerInvariant()

if ([string]::IsNullOrWhiteSpace($botToken)) {
    throw 'Set TELEGRAM_BOT_TOKEN in this PowerShell session before starting the sync.'
}

$projectRoot = Split-Path -Parent $PSScriptRoot
$outputSetting = if ($env:TELEGRAM_IMAGE_DIRECTORY) { $env:TELEGRAM_IMAGE_DIRECTORY } else { 'images/telegram' }
$outputDirectory = if ([System.IO.Path]::IsPathRooted($outputSetting)) {
    $outputSetting
} else {
    Join-Path $projectRoot $outputSetting
}
$statePath = Join-Path $outputDirectory '.sync-state.json'
$manifestPath = Join-Path $outputDirectory 'manifest.json'
$originalsDirectory = Join-Path $outputDirectory 'originals'
$pythonPath = Join-Path $projectRoot '.venv\Scripts\python.exe'
$imageProcessorPath = Join-Path $PSScriptRoot 'telegram-history-import.py'

if (-not (Test-Path -LiteralPath $pythonPath) -or -not (Test-Path -LiteralPath $imageProcessorPath)) {
    throw 'Set up the project .venv from requirements.txt before starting image sync.'
}

function Read-JsonFile {
    param(
        [string]$Path,
        [object]$DefaultValue
    )

    if (Test-Path -LiteralPath $Path) {
        return Get-Content -LiteralPath $Path -Raw | ConvertFrom-Json
    }
    return $DefaultValue
}

function Write-JsonAtomically {
    param(
        [string]$Path,
        [object]$Value
    )

    $temporaryPath = "$Path.tmp"
    $json = ConvertTo-Json -InputObject $Value -Depth 20
    [System.IO.File]::WriteAllText($temporaryPath, $json, [System.Text.Encoding]::UTF8)
    Move-Item -LiteralPath $temporaryPath -Destination $Path -Force
}

function Invoke-TelegramApi {
    param(
        [string]$Method,
        [hashtable]$Parameters = @{}
    )

    $uri = "https://api.telegram.org/bot$botToken/$Method"
    $body = ConvertTo-Json -InputObject $Parameters -Depth 10 -Compress
    try {
        $response = Invoke-RestMethod -Uri $uri -Method Post -ContentType 'application/json' -Body $body -TimeoutSec 35
    } catch {
        throw "Telegram API request '$Method' failed. Check the local bot token, channel access, and network."
    }

    if (-not $response.ok) {
        throw "Telegram API request '$Method' failed: $($response.description)"
    }
    return $response.result
}

function Invoke-ImageProcessor {
    param(
        [string]$OriginalPath,
        [string]$CleanPath
    )

    $resultLines = & $pythonPath $imageProcessorPath --prepare-image $OriginalPath $CleanPath
    if ($LASTEXITCODE -ne 0) {
        throw 'Image processing failed.'
    }
    return ([string]::Join('', $resultLines) | ConvertFrom-Json)
}

function Update-ChannelProductCatalog {
    & $pythonPath $imageProcessorPath --build-catalog | Out-Null
    if ($LASTEXITCODE -ne 0) {
        throw 'Channel product catalog generation failed.'
    }
}

function Save-TelegramPhoto {
    param(
        [object]$Post,
        [object]$Manifest
    )

    if (-not $Post.photo) {
        return
    }

    $photo = @($Post.photo) |
        Sort-Object -Property @{ Expression = { if ($_.file_size) { [long]$_.file_size } else { 0 } }; Descending = $true } |
        Select-Object -First 1
    if ($photo.file_size -and [long]$photo.file_size -gt $maxPhotoBytes) {
        Write-Warning "Skipped oversized photo in channel post $($Post.message_id)."
        return
    }

    $fileInfo = Invoke-TelegramApi -Method 'getFile' -Parameters @{ file_id = $photo.file_id }
    if (-not $fileInfo.file_path) {
        throw "Telegram returned no file path for channel post $($Post.message_id)."
    }

    $fileName = "$($Post.chat.id)_$($Post.message_id).jpg"
    $destination = Join-Path $outputDirectory $fileName
    $originalDestination = Join-Path $originalsDirectory $fileName
    $existingEntry = @($Manifest.items | Where-Object { $_.fileName -eq $fileName } | Select-Object -First 1)

    if ($existingEntry.Count -eq 0 -or $existingEntry[0].qrProcessed -ne $true) {
        New-Item -ItemType Directory -Path $originalsDirectory -Force | Out-Null
        if ((Test-Path -LiteralPath $destination) -and -not (Test-Path -LiteralPath $originalDestination)) {
            Copy-Item -LiteralPath $destination -Destination $originalDestination
        }

        if (-not (Test-Path -LiteralPath $originalDestination)) {
            $temporaryPath = "$originalDestination.$([guid]::NewGuid().ToString('N')).tmp"
            try {
                $fileUri = "https://api.telegram.org/file/bot$botToken/$($fileInfo.file_path)"
                Invoke-WebRequest -Uri $fileUri -OutFile $temporaryPath -TimeoutSec 35 -UseBasicParsing | Out-Null
                $downloadedBytes = (Get-Item -LiteralPath $temporaryPath).Length
                if ($downloadedBytes -gt $maxPhotoBytes) {
                    Write-Warning "Skipped oversized photo in channel post $($Post.message_id)."
                    return
                }
                Move-Item -LiteralPath $temporaryPath -Destination $originalDestination
            } finally {
                if (Test-Path -LiteralPath $temporaryPath) {
                    Remove-Item -LiteralPath $temporaryPath -Force
                }
            }
        }

        $qrResult = Invoke-ImageProcessor -OriginalPath $originalDestination -CleanPath $destination
        if ($existingEntry.Count -eq 0) {
            $Manifest.items = @($Manifest.items) + @([pscustomobject]@{
                channel = "@$channelUsername"
                messageId = $Post.message_id
                groupedId = if ($Post.media_group_id) { $Post.media_group_id } else { $null }
                caption = if ($Post.caption) { $Post.caption } else { '' }
                fileName = $fileName
                path = "images/telegram/$fileName"
                originalPath = "images/telegram/originals/$fileName"
                publishedAt = [DateTimeOffset]::FromUnixTimeSeconds([long]$Post.date).UtcDateTime.ToString('o')
                qrDetected = [bool]$qrResult.qrDetected
                qrMasked = [bool]$qrResult.qrMasked
                qrProcessed = $true
            })
        } else {
            $existingEntry[0].originalPath = "images/telegram/originals/$fileName"
            $existingEntry[0].qrDetected = [bool]$qrResult.qrDetected
            $existingEntry[0].qrMasked = [bool]$qrResult.qrMasked
            $existingEntry[0].qrProcessed = $true
        }
        Write-JsonAtomically -Path $manifestPath -Value $Manifest
        Update-ChannelProductCatalog
        Write-Host "Downloaded and processed $fileName (QR detected: $($qrResult.qrDetected))."
    }
}

New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null
New-Item -ItemType Directory -Path $originalsDirectory -Force | Out-Null
$state = Read-JsonFile -Path $statePath -DefaultValue ([pscustomobject]@{ offset = 0 })
$manifest = Read-JsonFile -Path $manifestPath -DefaultValue ([pscustomobject]@{ channel = "@$channelUsername"; items = @() })
if ($null -eq $manifest.items) {
    $manifest.items = @()
}

$bot = Invoke-TelegramApi -Method 'getMe'
Write-Host "Bot @$($bot.username) is listening for new photos from @$channelUsername."
Write-Host "Downloaded photos will be saved in $outputDirectory. Press Ctrl+C to stop."

while ($true) {
    try {
        $updates = @(Invoke-TelegramApi -Method 'getUpdates' -Parameters @{
            offset = [long]$state.offset
            timeout = 25
            allowed_updates = @('channel_post')
        })

        foreach ($update in $updates) {
            if ($null -eq $update) {
                continue
            }
            $post = $update.channel_post
            if ($post -and $post.chat.username -and $post.chat.username.ToLowerInvariant() -eq $channelUsername) {
                Save-TelegramPhoto -Post $post -Manifest $manifest
            }
            $state.offset = [long]$update.update_id + 1
            Write-JsonAtomically -Path $statePath -Value $state
        }
    } catch {
        Write-Warning 'Telegram sync paused by a temporary error. Retrying in five seconds; details are omitted to protect the bot token.'
        [System.Threading.Thread]::Sleep(5000)
    }
}
