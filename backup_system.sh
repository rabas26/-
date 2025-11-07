#!/bin/bash

#####################################################
# نظام النسخ الاحتياطي للملفات والمجلدات
# Backup System for Files and Folders
#####################################################

# الألوان للعرض
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # بدون لون

# دالة لعرض الرسائل
print_message() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# دالة لعرض الشعار
show_banner() {
    clear
    print_message "$BLUE" "╔═══════════════════════════════════════════════════════════╗"
    print_message "$BLUE" "║        نظام النسخ الاحتياطي للملفات والمجلدات         ║"
    print_message "$BLUE" "║        Backup System for Files and Folders             ║"
    print_message "$BLUE" "╚═══════════════════════════════════════════════════════════╝"
    echo ""
}

# دالة للتحقق من وجود المسار
check_path() {
    local path=$1
    if [ ! -e "$path" ]; then
        print_message "$RED" "خطأ: المسار غير موجود - $path"
        return 1
    fi
    return 0
}

# دالة لإنشاء مجلد النسخ الاحتياطي
create_backup_dir() {
    local backup_dir=$1
    if [ ! -d "$backup_dir" ]; then
        mkdir -p "$backup_dir"
        if [ $? -eq 0 ]; then
            print_message "$GREEN" "✓ تم إنشاء مجلد النسخ الاحتياطي: $backup_dir"
        else
            print_message "$RED" "✗ فشل إنشاء مجلد النسخ الاحتياطي"
            return 1
        fi
    fi
    return 0
}

# دالة لحساب حجم المجلد/الملف
calculate_size() {
    local path=$1
    du -sh "$path" 2>/dev/null | awk '{print $1}'
}

# دالة للنسخ الاحتياطي الأساسي
basic_backup() {
    local source=$1
    local destination=$2
    local backup_name=$3

    print_message "$YELLOW" "بدء عملية النسخ الاحتياطي..."
    print_message "$BLUE" "المصدر: $source"
    print_message "$BLUE" "الوجهة: $destination"

    # حساب الحجم
    local size=$(calculate_size "$source")
    print_message "$BLUE" "الحجم: $size"

    # التاريخ والوقت
    local timestamp=$(date +"%Y%m%d_%H%M%S")
    local backup_file="${destination}/${backup_name}_${timestamp}"

    # نسخ الملفات
    if [ -d "$source" ]; then
        # نسخ مجلد
        cp -r "$source" "$backup_file"
    else
        # نسخ ملف
        cp "$source" "$backup_file"
    fi

    if [ $? -eq 0 ]; then
        print_message "$GREEN" "✓ تم النسخ الاحتياطي بنجاح"
        print_message "$GREEN" "  الملف: $backup_file"
        return 0
    else
        print_message "$RED" "✗ فشل النسخ الاحتياطي"
        return 1
    fi
}

# دالة للنسخ الاحتياطي المضغوط
compressed_backup() {
    local source=$1
    local destination=$2
    local backup_name=$3
    local compression_type=$4

    print_message "$YELLOW" "بدء عملية النسخ الاحتياطي المضغوط..."
    print_message "$BLUE" "المصدر: $source"
    print_message "$BLUE" "الوجهة: $destination"

    # حساب الحجم
    local size=$(calculate_size "$source")
    print_message "$BLUE" "الحجم الأصلي: $size"

    # التاريخ والوقت
    local timestamp=$(date +"%Y%m%d_%H%M%S")
    local backup_file="${destination}/${backup_name}_${timestamp}"

    case $compression_type in
        "tar.gz")
            backup_file="${backup_file}.tar.gz"
            print_message "$YELLOW" "جاري الضغط بصيغة tar.gz..."
            tar -czf "$backup_file" -C "$(dirname "$source")" "$(basename "$source")"
            ;;
        "zip")
            backup_file="${backup_file}.zip"
            print_message "$YELLOW" "جاري الضغط بصيغة zip..."
            if command -v zip &> /dev/null; then
                cd "$(dirname "$source")" && zip -r "$backup_file" "$(basename "$source")"
            else
                print_message "$RED" "✗ برنامج zip غير متوفر"
                return 1
            fi
            ;;
        "tar.bz2")
            backup_file="${backup_file}.tar.bz2"
            print_message "$YELLOW" "جاري الضغط بصيغة tar.bz2..."
            tar -cjf "$backup_file" -C "$(dirname "$source")" "$(basename "$source")"
            ;;
        *)
            print_message "$RED" "نوع ضغط غير مدعوم"
            return 1
            ;;
    esac

    if [ $? -eq 0 ]; then
        local compressed_size=$(calculate_size "$backup_file")
        print_message "$GREEN" "✓ تم النسخ الاحتياطي والضغط بنجاح"
        print_message "$GREEN" "  الملف: $backup_file"
        print_message "$GREEN" "  الحجم بعد الضغط: $compressed_size"
        return 0
    else
        print_message "$RED" "✗ فشل النسخ الاحتياطي المضغوط"
        return 1
    fi
}

# دالة للنسخ الاحتياطي المتزامن (rsync)
sync_backup() {
    local source=$1
    local destination=$2

    print_message "$YELLOW" "بدء عملية النسخ الاحتياطي المتزامن..."
    print_message "$BLUE" "المصدر: $source"
    print_message "$BLUE" "الوجهة: $destination"

    if ! command -v rsync &> /dev/null; then
        print_message "$RED" "✗ برنامج rsync غير متوفر"
        print_message "$YELLOW" "قم بتثبيته باستخدام: sudo dnf install rsync"
        return 1
    fi

    # استخدام rsync للنسخ المتزامن
    rsync -avh --progress "$source" "$destination"

    if [ $? -eq 0 ]; then
        print_message "$GREEN" "✓ تم النسخ الاحتياطي المتزامن بنجاح"
        return 0
    else
        print_message "$RED" "✗ فشل النسخ الاحتياطي المتزامن"
        return 1
    fi
}

# دالة لعرض قائمة الأقراص المتاحة
list_disks() {
    print_message "$BLUE" "الأقراص المتاحة:"
    print_message "$YELLOW" "════════════════════════════════════════"
    lsblk -o NAME,SIZE,TYPE,MOUNTPOINT 2>/dev/null || df -h
    print_message "$YELLOW" "════════════════════════════════════════"
}

# دالة لإنشاء سجل النسخ الاحتياطي
create_backup_log() {
    local log_file=$1
    local source=$2
    local destination=$3
    local status=$4

    local timestamp=$(date +"%Y-%m-%d %H:%M:%S")
    echo "[$timestamp] المصدر: $source | الوجهة: $destination | الحالة: $status" >> "$log_file"
}

# القائمة الرئيسية
main_menu() {
    show_banner

    print_message "$GREEN" "اختر نوع النسخ الاحتياطي:"
    echo "1. نسخ احتياطي أساسي (نسخ مباشر)"
    echo "2. نسخ احتياطي مضغوط (tar.gz)"
    echo "3. نسخ احتياطي مضغوط (zip)"
    echo "4. نسخ احتياطي متزامن (rsync)"
    echo "5. عرض الأقراص المتاحة"
    echo "6. خروج"
    echo ""

    read -p "اختر رقم الخيار: " choice

    case $choice in
        1)
            perform_basic_backup
            ;;
        2)
            perform_compressed_backup "tar.gz"
            ;;
        3)
            perform_compressed_backup "zip"
            ;;
        4)
            perform_sync_backup
            ;;
        5)
            list_disks
            read -p "اضغط Enter للمتابعة..."
            main_menu
            ;;
        6)
            print_message "$GREEN" "شكراً لاستخدامك نظام النسخ الاحتياطي!"
            exit 0
            ;;
        *)
            print_message "$RED" "خيار غير صحيح"
            sleep 2
            main_menu
            ;;
    esac
}

# دالة لتنفيذ النسخ الاحتياطي الأساسي
perform_basic_backup() {
    echo ""
    read -p "أدخل مسار المصدر (المجلد أو الملف للنسخ): " source

    if ! check_path "$source"; then
        read -p "اضغط Enter للمتابعة..."
        main_menu
        return
    fi

    read -p "أدخل مسار الوجهة (القرص الخارجي أو المجلد): " destination
    read -p "أدخل اسم النسخة الاحتياطية: " backup_name

    if ! create_backup_dir "$destination"; then
        read -p "اضغط Enter للمتابعة..."
        main_menu
        return
    fi

    basic_backup "$source" "$destination" "$backup_name"

    # إنشاء سجل
    local log_file="${destination}/backup_log.txt"
    if [ $? -eq 0 ]; then
        create_backup_log "$log_file" "$source" "$destination" "نجح"
    else
        create_backup_log "$log_file" "$source" "$destination" "فشل"
    fi

    read -p "اضغط Enter للمتابعة..."
    main_menu
}

# دالة لتنفيذ النسخ الاحتياطي المضغوط
perform_compressed_backup() {
    local compression=$1
    echo ""
    read -p "أدخل مسار المصدر (المجلد أو الملف للنسخ): " source

    if ! check_path "$source"; then
        read -p "اضغط Enter للمتابعة..."
        main_menu
        return
    fi

    read -p "أدخل مسار الوجهة (القرص الخارجي أو المجلد): " destination
    read -p "أدخل اسم النسخة الاحتياطية: " backup_name

    if ! create_backup_dir "$destination"; then
        read -p "اضغط Enter للمتابعة..."
        main_menu
        return
    fi

    compressed_backup "$source" "$destination" "$backup_name" "$compression"

    # إنشاء سجل
    local log_file="${destination}/backup_log.txt"
    if [ $? -eq 0 ]; then
        create_backup_log "$log_file" "$source" "$destination" "نجح (مضغوط $compression)"
    else
        create_backup_log "$log_file" "$source" "$destination" "فشل (مضغوط $compression)"
    fi

    read -p "اضغط Enter للمتابعة..."
    main_menu
}

# دالة لتنفيذ النسخ الاحتياطي المتزامن
perform_sync_backup() {
    echo ""
    read -p "أدخل مسار المصدر (المجلد أو الملف للنسخ): " source

    if ! check_path "$source"; then
        read -p "اضغط Enter للمتابعة..."
        main_menu
        return
    fi

    read -p "أدخل مسار الوجهة (القرص الخارجي أو المجلد): " destination

    if ! create_backup_dir "$destination"; then
        read -p "اضغط Enter للمتابعة..."
        main_menu
        return
    fi

    sync_backup "$source" "$destination"

    # إنشاء سجل
    local log_file="${destination}/backup_log.txt"
    if [ $? -eq 0 ]; then
        create_backup_log "$log_file" "$source" "$destination" "نجح (متزامن)"
    else
        create_backup_log "$log_file" "$source" "$destination" "فشل (متزامن)"
    fi

    read -p "اضغط Enter للمتابعة..."
    main_menu
}

# بدء البرنامج
main_menu
