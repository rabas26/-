# نظام النسخ الاحتياطي للملفات والمجلدات
# Backup System for Files and Folders

نظام شامل ومتقدم للنسخ الاحتياطي يدعم النسخ من وإلى الأقراص الداخلية والخارجية مع ميزات الضغط والتشفير.

---

## المميزات الرئيسية

### ✨ النسخة البسيطة (Bash Script)
- 📁 نسخ احتياطي أساسي بدون ضغط
- 🗜️ نسخ احتياطي مضغوط (tar.gz, zip, tar.bz2)
- 🔄 نسخ احتياطي متزامن باستخدام rsync
- 💾 عرض الأقراص المتاحة
- 📊 سجل تلقائي لجميع العمليات
- 🎨 واجهة تفاعلية ملونة

### 🚀 النسخة المتقدمة (Python Script)
- 📦 جميع مميزات النسخة البسيطة
- 🔐 تشفير النسخ الاحتياطية (AES-256)
- 🔓 فك تشفير النسخ الاحتياطية
- 🔍 حساب البصمة الرقمية (Checksum) للتحقق من سلامة البيانات
- 📈 حساب نسبة الضغط
- 💾 حساب وعرض الأحجام بشكل تلقائي
- 📝 سجل JSON مفصل
- ⚙️ إعدادات قابلة للتخصيص
- 🖥️ دعم سطر الأوامر (CLI)
- 📱 واجهة تفاعلية

---

## المتطلبات

### النسخة البسيطة (Bash)
```bash
# أدوات أساسية (متوفرة عادة في معظم الأنظمة)
- bash
- tar
- gzip
- rsync (اختياري للنسخ المتزامن)
- zip (اختياري للضغط بصيغة zip)
```

### النسخة المتقدمة (Python)
```bash
# Python 3.6 أو أحدث
python3 --version

# أدوات إضافية للتشفير
sudo dnf install openssl  # Amazon Linux / Fedora
sudo apt install openssl  # Ubuntu / Debian
```

---

## التثبيت والإعداد

### 1. تحميل الملفات
```bash
# منح صلاحيات التنفيذ للسكريبتات
chmod +x backup_system.sh
chmod +x backup_advanced.py
```

### 2. تثبيت الأدوات الاختيارية
```bash
# تثبيت rsync (للنسخ المتزامن)
sudo dnf install rsync

# تثبيت zip (للضغط بصيغة zip)
sudo dnf install zip unzip
```

---

## طرق الاستخدام

## 🔷 الطريقة الأولى: النسخة البسيطة (Bash)

### التشغيل التفاعلي
```bash
./backup_system.sh
```

ستظهر لك قائمة بالخيارات:
```
╔═══════════════════════════════════════════════════════════╗
║        نظام النسخ الاحتياطي للملفات والمجلدات         ║
║        Backup System for Files and Folders             ║
╚═══════════════════════════════════════════════════════════╝

اختر نوع النسخ الاحتياطي:
1. نسخ احتياطي أساسي (نسخ مباشر)
2. نسخ احتياطي مضغوط (tar.gz)
3. نسخ احتياطي مضغوط (zip)
4. نسخ احتياطي متزامن (rsync)
5. عرض الأقراص المتاحة
6. خروج
```

### مثال: نسخ احتياطي لمجلد المستندات
```bash
# اختر الخيار 2 (نسخ مضغوط)
# المصدر: /home/user/Documents
# الوجهة: /media/external_drive/backups
# الاسم: my_documents
```

---

## 🔶 الطريقة الثانية: النسخة المتقدمة (Python)

### التشغيل التفاعلي
```bash
python3 backup_advanced.py
```

### التشغيل من سطر الأوامر

#### نسخ احتياطي بسيط
```bash
python3 backup_advanced.py \
  --source /home/user/Documents \
  --destination /media/external/backups \
  --name my_docs \
  --type simple
```

#### نسخ احتياطي مضغوط (tar.gz)
```bash
python3 backup_advanced.py \
  --source /home/user/Photos \
  --destination /media/external/backups \
  --name my_photos \
  --type tar
```

#### نسخ احتياطي مضغوط (zip)
```bash
python3 backup_advanced.py \
  --source /home/user/Videos \
  --destination /media/external/backups \
  --name my_videos \
  --type zip
```

#### نسخ احتياطي مشفر
```bash
python3 backup_advanced.py \
  --source /home/user/Private \
  --destination /media/external/backups \
  --name private_data \
  --type encrypted \
  --password "your_strong_password"
```

---

## 📖 أمثلة عملية

### المثال 1: نسخ احتياطي من القرص الداخلي إلى قرص خارجي
```bash
# عرض الأقراص المتاحة أولاً
./backup_system.sh
# اختر الخيار 5

# بعد معرفة مسار القرص الخارجي (مثال: /media/external)
# اختر نوع النسخ المناسب
```

### المثال 2: نسخ احتياطي مجدول يومياً
```bash
# إضافة مهمة cron للنسخ الاحتياطي اليومي
crontab -e

# إضافة السطر التالي (نسخ احتياطي يومياً الساعة 2 صباحاً)
0 2 * * * /path/to/backup_advanced.py -s /home/user/Documents -d /media/external/backups -n daily_backup -t tar
```

### المثال 3: نسخ احتياطي متعدد المصادر
```bash
# إنشاء سكريبت للنسخ الاحتياطي المتعدد
#!/bin/bash

# نسخ المستندات
python3 backup_advanced.py -s /home/user/Documents -d /media/external/backups -n docs -t tar

# نسخ الصور
python3 backup_advanced.py -s /home/user/Pictures -d /media/external/backups -n photos -t zip

# نسخ البيانات الحساسة مع التشفير
python3 backup_advanced.py -s /home/user/Private -d /media/external/backups -n private -t encrypted -p "password123"
```

---

## 🔒 التشفير وفك التشفير

### تشفير نسخة احتياطية موجودة
```bash
# استخدام OpenSSL مباشرة
openssl enc -aes-256-cbc -salt -in backup.tar.gz -out backup.tar.gz.enc -k "your_password"
```

### فك تشفير نسخة احتياطية
```bash
# من خلال السكريبت Python
python3 backup_advanced.py
# اختر الخيار 5 (فك التشفير)

# أو باستخدام OpenSSL مباشرة
openssl enc -aes-256-cbc -d -in backup.tar.gz.enc -out backup.tar.gz -k "your_password"
```

---

## 📊 إدارة النسخ الاحتياطية

### عرض سجل النسخ الاحتياطي
```bash
python3 backup_advanced.py
# اختر الخيار 7

# أو عرض ملف السجل مباشرة
cat backup_log.json
```

### حذف النسخ القديمة (تنظيف)
```bash
# حذف النسخ الأقدم من 30 يوم
find /media/external/backups -name "*.tar.gz" -mtime +30 -delete

# حذف النسخ الأقدم من 7 أيام (للنسخ اليومية)
find /media/external/backups -name "daily_*" -mtime +7 -delete
```

---

## 🛠️ استكشاف الأخطاء

### الخطأ: "Permission denied"
```bash
# منح صلاحيات التنفيذ
chmod +x backup_system.sh
chmod +x backup_advanced.py

# أو استخدام sudo إذا لزم الأمر
sudo ./backup_system.sh
```

### الخطأ: "rsync not found"
```bash
# تثبيت rsync
sudo dnf install rsync  # Amazon Linux / Fedora
sudo apt install rsync  # Ubuntu / Debian
```

### الخطأ: "openssl not found"
```bash
# تثبيت OpenSSL
sudo dnf install openssl
```

### الخطأ: "No space left on device"
```bash
# التحقق من المساحة المتاحة
df -h

# حذف النسخ القديمة أو استخدام قرص أكبر
```

---

## 💡 نصائح وأفضل الممارسات

### 1. اختيار نوع الضغط المناسب
- **tar.gz**: الأفضل للأداء والتوافق (موصى به)
- **zip**: سهل الاستخدام في Windows
- **tar.bz2**: أعلى نسبة ضغط لكن أبطأ

### 2. التشفير
- استخدم كلمات مرور قوية (12+ حرف)
- احفظ كلمات المرور في مكان آمن
- فكر في استخدام مدير كلمات المرور

### 3. جدولة النسخ الاحتياطي
- **يومي**: للبيانات المهمة والمتغيرة باستمرار
- **أسبوعي**: للبيانات متوسطة الأهمية
- **شهري**: للأرشيف

### 4. التحقق من النسخ
- تحقق من البصمة الرقمية (Checksum)
- اختبر استعادة النسخ بشكل دوري
- احتفظ بنسخ في أماكن مختلفة (3-2-1 Rule)

### 5. قاعدة 3-2-1
- **3** نسخ من بياناتك
- **2** أنواع مختلفة من الوسائط
- **1** نسخة خارج الموقع (Cloud, قرص خارجي)

---

## 🔍 التحقق من سلامة النسخة الاحتياطية

### حساب البصمة الرقمية
```bash
# استخدام SHA-256
sha256sum backup.tar.gz > backup.tar.gz.sha256

# التحقق لاحقاً
sha256sum -c backup.tar.gz.sha256
```

### اختبار فك الضغط
```bash
# اختبار ملف tar.gz
tar -tzf backup.tar.gz > /dev/null && echo "OK" || echo "CORRUPTED"

# اختبار ملف zip
unzip -t backup.zip
```

---

## 📁 هيكل الملفات

```
backup_system/
├── backup_system.sh              # السكريبت البسيط (Bash)
├── backup_advanced.py            # السكريبت المتقدم (Python)
├── backup_config_example.json    # مثال على ملف الإعدادات
├── BACKUP_README.md              # هذا الملف
├── backup_config.json            # ملف الإعدادات (يُنشأ تلقائياً)
└── backup_log.json               # سجل العمليات (يُنشأ تلقائياً)
```

---

## 🔐 الأمان والخصوصية

- جميع كلمات المرور المدخلة لا يتم حفظها
- التشفير باستخدام معيار AES-256
- يتم حساب البصمة الرقمية للتحقق من السلامة
- السجلات لا تحتوي على معلومات حساسة

---

## 📞 الدعم والمساعدة

إذا واجهت أي مشاكل:
1. تحقق من صلاحيات الملفات
2. تأكد من وجود المساحة الكافية
3. تحقق من تثبيت الأدوات المطلوبة
4. راجع قسم استكشاف الأخطاء

---

## 📝 ملاحظات مهمة

⚠️ **تحذير**:
- تأكد دائماً من صحة المسارات قبل النسخ
- لا تقم بإيقاف عملية النسخ أثناء التنفيذ
- احتفظ بنسخ متعددة في أماكن مختلفة
- اختبر استعادة النسخ بشكل دوري

✅ **توصيات**:
- استخدم أقراص خارجية موثوقة
- فحص الأقراص بشكل دوري
- تحديث السكريبتات بشكل منتظم
- توثيق عمليات النسخ الاحتياطي

---

## 🌟 ميزات إضافية مستقبلية

- [ ] دعم النسخ الاحتياطي إلى السحابة (Cloud)
- [ ] واجهة رسومية (GUI)
- [ ] إشعارات عبر البريد الإلكتروني
- [ ] نسخ احتياطي تزايدي (Incremental)
- [ ] نسخ احتياطي تفاضلي (Differential)
- [ ] دعم قواعد البيانات
- [ ] تقارير مفصلة

---

## 📜 الترخيص

هذا النظام مفتوح المصدر ومتاح للاستخدام الحر.

---

## 🙏 شكر خاص

تم تطوير هذا النظام لتسهيل عملية النسخ الاحتياطي وحماية بياناتك المهمة.

**البيانات أمانة - احفظها بعناية!** 💾🔒

---

**تاريخ التحديث**: 2025-11-07
**الإصدار**: 1.0.0
