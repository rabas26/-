# دليل التثبيت والإعداد الكامل
# Complete Installation and Setup Guide

## 📦 الملفات المتوفرة

تم إنشاء نظام نسخ احتياطي متكامل يتكون من الملفات التالية:

```
📁 backup_system/
├── 📜 backup_system.sh              # سكريبت Bash بسيط وسهل الاستخدام
├── 🐍 backup_advanced.py            # سكريبت Python متقدم مع التشفير
├── ⚙️  backup_config_example.json   # مثال على ملف الإعدادات
├── 🧪 test_backup.sh                # سكريبت اختبار النظام
├── 📖 BACKUP_README.md              # الدليل الكامل والمفصل
├── ⚡ QUICK_START.md                # دليل البدء السريع
└── 📋 INSTALLATION_GUIDE.md         # هذا الملف
```

---

## 🚀 التثبيت السريع

### الخطوة 1: منح الصلاحيات

```bash
chmod +x backup_system.sh
chmod +x backup_advanced.py
chmod +x test_backup.sh
```

### الخطوة 2: تثبيت المتطلبات (اختياري)

#### لنظام Amazon Linux / Fedora / RHEL:
```bash
# rsync للنسخ المتزامن (اختياري)
sudo dnf install rsync

# zip للضغط بصيغة zip (اختياري)
sudo dnf install zip unzip

# openssl للتشفير (غالباً متوفر بالفعل)
sudo dnf install openssl

# Python 3 (غالباً متوفر بالفعل)
sudo dnf install python3
```

#### لنظام Ubuntu / Debian:
```bash
sudo apt update
sudo apt install rsync zip unzip openssl python3
```

#### لنظام macOS:
```bash
# استخدام Homebrew
brew install rsync

# Python 3 غالباً متوفر بالفعل
python3 --version
```

### الخطوة 3: اختبار النظام

```bash
# تشغيل سكريبت الاختبار
./test_backup.sh
```

---

## 📚 دليل الاستخدام حسب السيناريو

### 🎯 السيناريو 1: مستخدم مبتدئ - نسخ بسيط

**الهدف**: نسخ مجلد Documents إلى قرص خارجي

```bash
# 1. شغل السكريبت البسيط
./backup_system.sh

# 2. اختر الخيار 2 (نسخ مضغوط tar.gz)

# 3. أدخل المعلومات:
المصدر: /home/username/Documents
الوجهة: /media/external_drive/backups
الاسم: my_documents

# 4. انتظر حتى تكتمل العملية
```

---

### 🎯 السيناريو 2: مستخدم متوسط - نسخ مجدول

**الهدف**: نسخ احتياطي يومي تلقائي

```bash
# 1. إنشاء سكريبت النسخ
cat > ~/daily_backup.sh << 'EOF'
#!/bin/bash
python3 /path/to/backup_advanced.py \
  -s /home/username/important_data \
  -d /media/external/backups \
  -n daily_backup \
  -t tar
EOF

# 2. منح صلاحيات التنفيذ
chmod +x ~/daily_backup.sh

# 3. جدولة باستخدام cron
crontab -e

# 4. أضف السطر التالي (نسخ يومي الساعة 2 صباحاً)
0 2 * * * /home/username/daily_backup.sh >> /var/log/backup.log 2>&1
```

---

### 🎯 السيناريو 3: مستخدم متقدم - نسخ مشفر

**الهدف**: نسخ بيانات حساسة مع تشفير

```bash
# طريقة تفاعلية آمنة
python3 backup_advanced.py

# اختر الخيار 4 (نسخ مشفر)
# أدخل المعلومات وكلمة المرور

# أو باستخدام سطر الأوامر
python3 backup_advanced.py \
  -s ~/confidential \
  -d /media/secure_drive/encrypted_backups \
  -n confidential_data \
  -t encrypted \
  -p "$(read -sp 'Enter Password: ' pass; echo $pass)"
```

---

### 🎯 السيناريو 4: نسخ احتياطي لخادم

**الهدف**: نسخ احتياطي كامل لخادم ويب

```bash
#!/bin/bash
# server_backup.sh

BACKUP_DATE=$(date +%Y%m%d)
BACKUP_DEST="/mnt/backup_drive"

# 1. نسخ ملفات الموقع
python3 backup_advanced.py \
  -s /var/www/html \
  -d "$BACKUP_DEST/website" \
  -n "website_$BACKUP_DATE" \
  -t tar

# 2. نسخ إعدادات الخادم
python3 backup_advanced.py \
  -s /etc \
  -d "$BACKUP_DEST/configs" \
  -n "configs_$BACKUP_DATE" \
  -t tar

# 3. نسخ قاعدة البيانات (مثال مع MySQL)
mysqldump -u root -p mydatabase > /tmp/db_backup.sql
python3 backup_advanced.py \
  -s /tmp/db_backup.sql \
  -d "$BACKUP_DEST/database" \
  -n "db_$BACKUP_DATE" \
  -t encrypted \
  -p "$DB_BACKUP_PASSWORD"

# 4. تنظيف
rm /tmp/db_backup.sql

# 5. حذف النسخ الأقدم من 30 يوم
find "$BACKUP_DEST" -name "*.tar.gz" -mtime +30 -delete
```

---

## 🔧 إعدادات متقدمة

### تخصيص ملف الإعدادات

```bash
# نسخ ملف الإعدادات المثالي
cp backup_config_example.json backup_config.json

# تعديل الإعدادات
nano backup_config.json
```

مثال على التخصيص:
```json
{
  "default_destination": "/media/backup_drive",
  "compression_type": "tar.gz",
  "verify_checksum": true,
  "automatic_backups": [
    {
      "name": "daily_work",
      "source": "/home/user/work",
      "destination": "/media/backup/daily",
      "schedule": "daily",
      "compression": "tar.gz",
      "encrypt": false
    }
  ]
}
```

---

## 🔍 التحقق من النسخ الاحتياطية

### فحص سلامة الملفات

```bash
# 1. حساب البصمة الرقمية
sha256sum backup_file.tar.gz > backup_file.sha256

# 2. التحقق لاحقاً
sha256sum -c backup_file.sha256

# 3. اختبار فك الضغط
tar -tzf backup_file.tar.gz > /dev/null && echo "OK" || echo "CORRUPTED"
```

### استعادة النسخ الاحتياطية

```bash
# فك ضغط tar.gz
tar -xzf backup_file.tar.gz -C /path/to/restore

# فك ضغط zip
unzip backup_file.zip -d /path/to/restore

# فك تشفير ثم فك ضغط
openssl enc -aes-256-cbc -d \
  -in backup_file.tar.gz.enc \
  -out backup_file.tar.gz \
  -k "password"

tar -xzf backup_file.tar.gz -C /path/to/restore
```

---

## 🎛️ أوامر مفيدة

### عرض معلومات الأقراص

```bash
# عرض جميع الأقراص
lsblk

# عرض المساحة المتاحة
df -h

# عرض حجم مجلد
du -sh /path/to/folder

# عرض أكبر 10 ملفات
du -ah /path | sort -rh | head -n 10
```

### إدارة النسخ الاحتياطية

```bash
# عرض جميع النسخ
ls -lht /media/backup/

# حذف النسخ الأقدم من 30 يوم
find /media/backup -name "*.tar.gz" -mtime +30 -delete

# عد النسخ الاحتياطية
ls -1 /media/backup/*.tar.gz | wc -l

# حساب المساحة المستخدمة
du -sh /media/backup/
```

---

## 🐛 حل المشاكل الشائعة

### المشكلة: "Permission denied"

```bash
# الحل 1: منح صلاحيات التنفيذ
chmod +x backup_system.sh backup_advanced.py

# الحل 2: استخدام sudo إذا لزم الأمر
sudo ./backup_system.sh

# الحل 3: تغيير ملكية الملفات
sudo chown $USER:$USER backup_*.sh backup_*.py
```

### المشكلة: "No space left on device"

```bash
# 1. التحقق من المساحة
df -h

# 2. حذف النسخ القديمة
find /media/backup -mtime +7 -delete

# 3. استخدام قرص أكبر أو مسح البيانات غير الضرورية
```

### المشكلة: "rsync: command not found"

```bash
# تثبيت rsync
sudo dnf install rsync  # Amazon Linux / Fedora
sudo apt install rsync  # Ubuntu / Debian
```

### المشكلة: "Python3 not found"

```bash
# تثبيت Python 3
sudo dnf install python3  # Amazon Linux / Fedora
sudo apt install python3  # Ubuntu / Debian

# التحقق من الإصدار
python3 --version
```

### المشكلة: فشل فك التشفير

```bash
# تحقق من كلمة المرور
# تأكد من استخدام نفس كلمة المرور المستخدمة في التشفير

# إذا نسيت كلمة المرور، لا يمكن استرجاع البيانات!
```

---

## 📊 مراقبة النسخ الاحتياطي

### إنشاء تقرير يومي

```bash
#!/bin/bash
# backup_report.sh

BACKUP_DIR="/media/backup"
REPORT_FILE="/tmp/backup_report.txt"

echo "تقرير النسخ الاحتياطي - $(date)" > "$REPORT_FILE"
echo "════════════════════════════════════════" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

echo "إجمالي المساحة المستخدمة:" >> "$REPORT_FILE"
du -sh "$BACKUP_DIR" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

echo "عدد الملفات:" >> "$REPORT_FILE"
find "$BACKUP_DIR" -type f | wc -l >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

echo "آخر 5 نسخ احتياطية:" >> "$REPORT_FILE"
ls -lt "$BACKUP_DIR" | head -n 6 >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# إرسال التقرير عبر البريد (اختياري)
# mail -s "Backup Report" user@example.com < "$REPORT_FILE"

# عرض التقرير
cat "$REPORT_FILE"
```

---

## 🔐 أفضل الممارسات الأمنية

### 1. تشفير البيانات الحساسة

```bash
# دائماً استخدم كلمات مرور قوية
# مثال: MyV3ry$tr0ng_P@ssw0rd#2024

# تجنب:
# - كلمات قصيرة
# - تواريخ الميلاد
# - أسماء شائعة
```

### 2. حماية ملفات الإعدادات

```bash
# تأكد من أن ملفات الإعدادات محمية
chmod 600 backup_config.json

# لا تحفظ كلمات المرور في الملفات
```

### 3. تطبيق قاعدة 3-2-1

- **3** نسخ من بياناتك
- **2** أنواع مختلفة من الوسائط (قرص داخلي + خارجي)
- **1** نسخة خارج الموقع (سحابة أو موقع آخر)

---

## 📈 تحسين الأداء

### لتسريع النسخ الاحتياطي:

```bash
# 1. استخدام rsync للنسخ التزايدي
rsync -avh --progress /source/ /destination/

# 2. استثناء الملفات غير الضرورية
python3 backup_advanced.py \
  --exclude "*.tmp" \
  --exclude "__pycache__" \
  --exclude "node_modules"

# 3. استخدام الضغط السريع (gzip level 1)
tar -czf --fast backup.tar.gz /source/
```

---

## 📞 الدعم والموارد

### الملفات المرجعية:

1. **BACKUP_README.md** - الدليل الكامل والشامل
2. **QUICK_START.md** - البدء السريع في دقائق
3. **backup_config_example.json** - مثال الإعدادات

### تشغيل الاختبار:

```bash
./test_backup.sh
```

### عرض المساعدة:

```bash
python3 backup_advanced.py --help
```

---

## ✅ قائمة التحقق قبل البدء

- [ ] تم منح صلاحيات التنفيذ للسكريبتات
- [ ] تم تثبيت الأدوات المطلوبة (rsync, openssl)
- [ ] تم تحديد القرص الخارجي ومساره
- [ ] تم التحقق من المساحة المتاحة
- [ ] تم تشغيل سكريبت الاختبار بنجاح
- [ ] تم فهم طريقة الاستعادة

---

## 🎉 جاهز للبدء!

الآن أنت جاهز لاستخدام نظام النسخ الاحتياطي. ابدأ بتشغيل:

```bash
# للمبتدئين
./backup_system.sh

# للمتقدمين
python3 backup_advanced.py
```

**حماية بياناتك أمانة - ابدأ النسخ الاحتياطي الآن!** 💾🔒

---

**آخر تحديث**: 2025-11-07
**الإصدار**: 1.0.0
