# دليل البدء السريع - Quick Start Guide

## 🚀 البدء في 3 خطوات

### الخطوة 1️⃣: التحضير
```bash
# منح صلاحيات التنفيذ
chmod +x backup_system.sh backup_advanced.py
```

### الخطوة 2️⃣: اختر السكريبت المناسب

#### للمستخدمين المبتدئين:
```bash
./backup_system.sh
```

#### للمستخدمين المتقدمين:
```bash
python3 backup_advanced.py
```

### الخطوة 3️⃣: اتبع التعليمات على الشاشة

---

## 📝 أمثلة سريعة

### مثال 1: نسخ مجلد Documents إلى قرص خارجي

```bash
# باستخدام Python (موصى به)
python3 backup_advanced.py \
  -s ~/Documents \
  -d /media/external/backups \
  -n my_documents \
  -t tar
```

### مثال 2: نسخ مع تشفير

```bash
python3 backup_advanced.py \
  -s ~/Private \
  -d /media/external/backups \
  -n private_files \
  -t encrypted \
  -p "MyStr0ng_P@ssw0rd"
```

### مثال 3: نسخ بسيط بدون ضغط

```bash
# تشغيل تفاعلي
./backup_system.sh
# ثم اختر الخيار 1
```

---

## 🎯 سيناريوهات شائعة

### نسخ احتياطي يومي للمشروع
```bash
# إضافة إلى crontab
crontab -e

# نسخ يومي الساعة 2 صباحاً
0 2 * * * /path/to/backup_advanced.py -s ~/projects -d /media/backup -n daily_project -t tar
```

### نسخ احتياطي للصور مع ضغط
```bash
python3 backup_advanced.py \
  -s ~/Pictures \
  -d /media/external \
  -n photos_backup \
  -t zip
```

### نسخ احتياطي للبيانات الحساسة
```bash
python3 backup_advanced.py \
  -s ~/Confidential \
  -d /media/secure_drive \
  -n confidential \
  -t encrypted \
  -p "$(read -sp 'Password: ' pwd; echo $pwd)"
```

---

## ⚡ نصائح سريعة

1. **تحقق من القرص الخارجي أولاً**
   ```bash
   df -h
   # أو
   lsblk
   ```

2. **اختبر مع ملفات صغيرة أولاً**
   قبل نسخ البيانات الكبيرة، جرب مع مجلد صغير

3. **احتفظ بكلمات المرور في مكان آمن**
   لا يمكن استرجاع الملفات المشفرة بدون كلمة المرور!

4. **تحقق من المساحة المتاحة**
   ```bash
   du -sh ~/Documents  # حجم المصدر
   df -h /media/external  # المساحة المتاحة
   ```

---

## 🆘 مساعدة سريعة

### عرض جميع الخيارات
```bash
python3 backup_advanced.py --help
```

### استعادة ملف مضغوط
```bash
# tar.gz
tar -xzf backup.tar.gz

# zip
unzip backup.zip
```

### فك تشفير ملف
```bash
openssl enc -aes-256-cbc -d -in backup.tar.gz.enc -out backup.tar.gz -k "password"
```

---

## 📱 اتصل بالوثائق الكاملة

للمزيد من التفاصيل، راجع: `BACKUP_README.md`

---

**جاهز للبدء؟ شغّل السكريبت الآن!** 🎉
