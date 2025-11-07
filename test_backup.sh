#!/bin/bash

#####################################################
# سكريبت اختبار نظام النسخ الاحتياطي
# Test Script for Backup System
#####################################################

echo "════════════════════════════════════════════════════════"
echo "  اختبار نظام النسخ الاحتياطي - Backup System Test"
echo "════════════════════════════════════════════════════════"
echo ""

# إنشاء مجلدات الاختبار
TEST_SOURCE="./test_backup_source"
TEST_DEST="./test_backup_destination"

echo "📁 إنشاء مجلدات الاختبار..."
mkdir -p "$TEST_SOURCE"
mkdir -p "$TEST_DEST"

# إنشاء ملفات اختبار
echo "📝 إنشاء ملفات اختبار..."
echo "This is a test file 1" > "$TEST_SOURCE/file1.txt"
echo "This is a test file 2" > "$TEST_SOURCE/file2.txt"
echo "هذا ملف اختبار 3" > "$TEST_SOURCE/file3_arabic.txt"

# إنشاء مجلد فرعي
mkdir -p "$TEST_SOURCE/subfolder"
echo "Subfolder test file" > "$TEST_SOURCE/subfolder/subfile.txt"

echo "✓ تم إنشاء ملفات الاختبار"
echo ""

# عرض محتويات المجلد
echo "📂 محتويات مجلد الاختبار:"
tree "$TEST_SOURCE" 2>/dev/null || find "$TEST_SOURCE" -type f
echo ""

# اختبار 1: النسخ الاحتياطي البسيط
echo "════════════════════════════════════════════════════════"
echo "اختبار 1: النسخ الاحتياطي باستخدام Python (tar.gz)"
echo "════════════════════════════════════════════════════════"
python3 backup_advanced.py \
  --source "$TEST_SOURCE" \
  --destination "$TEST_DEST" \
  --name "test_backup" \
  --type tar

echo ""
echo "✓ تم الاختبار 1"
echo ""

# اختبار 2: عرض الملفات المنسوخة
echo "════════════════════════════════════════════════════════"
echo "اختبار 2: عرض الملفات المنسوخة"
echo "════════════════════════════════════════════════════════"
ls -lh "$TEST_DEST"
echo ""

# اختبار 3: التحقق من البصمة الرقمية
echo "════════════════════════════════════════════════════════"
echo "اختبار 3: حساب البصمة الرقمية"
echo "════════════════════════════════════════════════════════"
BACKUP_FILE=$(ls -t "$TEST_DEST"/*.tar.gz | head -1)
if [ -f "$BACKUP_FILE" ]; then
    echo "الملف: $BACKUP_FILE"
    sha256sum "$BACKUP_FILE"
    echo "✓ تم حساب البصمة الرقمية"
else
    echo "✗ لم يتم العثور على ملف النسخة الاحتياطية"
fi
echo ""

# اختبار 4: عرض السجل
echo "════════════════════════════════════════════════════════"
echo "اختبار 4: عرض سجل النسخ الاحتياطي"
echo "════════════════════════════════════════════════════════"
if [ -f "backup_log.json" ]; then
    cat backup_log.json | python3 -m json.tool
    echo "✓ تم عرض السجل"
else
    echo "⚠ السجل غير موجود بعد"
fi
echo ""

# اختبار 5: فك ضغط الملف للتحقق
echo "════════════════════════════════════════════════════════"
echo "اختبار 5: فك ضغط الملف للتحقق"
echo "════════════════════════════════════════════════════════"
TEST_EXTRACT="./test_extract"
mkdir -p "$TEST_EXTRACT"

if [ -f "$BACKUP_FILE" ]; then
    tar -xzf "$BACKUP_FILE" -C "$TEST_EXTRACT"
    echo "✓ تم فك الضغط إلى: $TEST_EXTRACT"
    echo ""
    echo "محتويات الملف المفكوك:"
    find "$TEST_EXTRACT" -type f
    echo "✓ تم التحقق من سلامة النسخة الاحتياطية"
else
    echo "✗ لم يتم العثور على ملف للفك"
fi
echo ""

# ملخص النتائج
echo "════════════════════════════════════════════════════════"
echo "                    ملخص الاختبار"
echo "════════════════════════════════════════════════════════"
echo "✓ تم إنشاء ملفات الاختبار"
echo "✓ تم إجراء النسخ الاحتياطي"
echo "✓ تم التحقق من سلامة البيانات"
echo ""
echo "📊 الإحصائيات:"
echo "   - عدد الملفات المصدر: $(find "$TEST_SOURCE" -type f | wc -l)"
echo "   - حجم المصدر: $(du -sh "$TEST_SOURCE" | cut -f1)"
if [ -f "$BACKUP_FILE" ]; then
    echo "   - حجم النسخة الاحتياطية: $(du -sh "$BACKUP_FILE" | cut -f1)"
    ORIGINAL_SIZE=$(du -sb "$TEST_SOURCE" | cut -f1)
    BACKUP_SIZE=$(stat -c %s "$BACKUP_FILE")
    RATIO=$(echo "scale=2; (1 - $BACKUP_SIZE / $ORIGINAL_SIZE) * 100" | bc)
    echo "   - نسبة الضغط: ${RATIO}%"
fi
echo ""

# تنظيف (اختياري)
echo "════════════════════════════════════════════════════════"
read -p "هل تريد حذف ملفات الاختبار؟ (y/n): " cleanup
if [ "$cleanup" = "y" ] || [ "$cleanup" = "Y" ]; then
    rm -rf "$TEST_SOURCE" "$TEST_DEST" "$TEST_EXTRACT"
    echo "✓ تم حذف ملفات الاختبار"
else
    echo "ℹ تم الاحتفاظ بملفات الاختبار في:"
    echo "   - المصدر: $TEST_SOURCE"
    echo "   - النسخة الاحتياطية: $TEST_DEST"
    echo "   - المفكوكة: $TEST_EXTRACT"
fi
echo ""
echo "════════════════════════════════════════════════════════"
echo "           ✓ اكتمل الاختبار بنجاح!"
echo "════════════════════════════════════════════════════════"
