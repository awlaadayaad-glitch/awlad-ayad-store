# متجر أولاد عياد

موقع متجر ثابت مبني بـ HTML وCSS وJavaScript، بدون إعداد أدوات بناء أو تثبيت حزم.

## تشغيل الموقع

افتح `index.html` في المتصفح. الصور موجودة في `images/` ويقرأها `app.js` مباشرة.

## الملفات

- `index.html`: هيكل الصفحة ونوافذ السلة وعرض الصور.
- `styles.css`: تنسيق الصفحة واستجابتها للشاشات الصغيرة.
- `app.js`: بيانات المنتجات، معرض الصور داخل كل بطاقة، البحث والتصنيف والسلة وطلب واتساب.
- `images/`: صور المنتجات.

المنتجات التي لا يتوفر لها سعر في البيانات تعرض خيار الاستفسار عن السعر عبر واتساب. لتحديث الأسعار أو الصور، عدّل مصفوفة `products` في `app.js`.

## مزامنة صور قناة Telegram

تستقبل المزامنة الصور المنشورة **بعد إعداد البوت فقط** وتحفظها في `images/telegram/`، مع وصف المنشور وتاريخه في `images/telegram/manifest.json`. يلزم أن تملك القناة أو يكون لديك إذن باستخدام الصور، وأن تضيف بوتك كمسؤول إلى قناة `@Zous13`. لا يتيح Telegram Bot API استعراض سجل القناة كاملًا؛ هذه المزامنة للمنشورات الجديدة والتحديثات المعلقة حديثًا فقط.

يعمل عامل المزامنة على Windows PowerShell 5.1 ويستخدم `.venv` لإزالة QR من الصور الجديدة. أنشئ بوتًا عبر `@BotFather`، أضفه كمسؤول للقناة، ثم أعد إعداد `.venv` من قسم الاستيراد التاريخي قبل تشغيله:

```powershell
$secureToken = Read-Host "Telegram bot token" -AsSecureString
$env:TELEGRAM_BOT_TOKEN = [System.Net.NetworkCredential]::new('', $secureToken).Password
$env:TELEGRAM_CHANNEL_USERNAME = "Zous13"
.\scripts\telegram-image-sync.ps1
```

اترك نافذة PowerShell تعمل لمزامنة الصور تلقائيًا، وأوقفها بـ`Ctrl+C`. كل صورة جديدة تُضاف إلى الفهرس وملف منتجات القناة، وتظهر في المتجر بعد تحديث الصفحة. لا تضع رمز البوت في ملفات الموقع أو ترسله في المحادثات أو تحفظه في Git. الصور التي تصل لا تُسعّر تلقائيًا؛ تظهر بسعر عند الطلب.

## تنزيل أرشيف الصور الحالي

Bot API يستقبل الصور الجديدة فقط. لاستيراد الصور المنشورة سابقًا، استخدم أداة MTProto بحسابك. يلزم إنشاء `API ID` و`API hash` من `my.telegram.org` وتسجيل الدخول إلى حساب Telegram المصرح له برؤية القناة. بيانات الدخول ورمز التحقق تُكتب محليًا في الطرفية فقط.

لتنظيف الصور الموجودة محليًا دون تسجيل دخول إلى Telegram، شغّل:

```powershell
.\.venv\Scripts\python.exe scripts/telegram-history-import.py --clean-existing
```

بعدها يستخدم الموقع النسخ المنظفة من `images/telegram/`، مع حفظ الصور الأصلية في `images/telegram/originals/`.

أنشئ البيئة وثبّت الحزم مرة واحدة:

```powershell
& "$env:USERPROFILE\.local\bin\python3.14.exe" -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

ثم شغّل الاستيراد:

```powershell
$env:TELEGRAM_CHANNEL_USERNAME = "Zous13"
.\.venv\Scripts\python.exe scripts/telegram-history-import.py
```

أدخل `API ID` ثم `API hash` (مدخل مخفي)، وبعدها رقم الهاتف ورمز Telegram وكلمة مرور التحقق بخطوتين إن طُلبت. تحفظ الأصول في `images/telegram/originals/`، والنسخ المعدّة للعرض في `images/telegram/`، وتُسجل النتائج في `manifest.json`. يستخدم الاستيراد `pyzbar` مع احتياط لاكتشاف الشارات الخضراء؛ راجع `qrDetected=false` في الفهرس قبل نشر أي صورة. إعادة تشغيل الأداة تستكمل الصور غير المعالجة.
