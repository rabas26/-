#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
نظام النسخ الاحتياطي المتقدم
Advanced Backup System with Encryption
"""

import os
import sys
import shutil
import tarfile
import zipfile
import hashlib
import json
import argparse
from datetime import datetime
from pathlib import Path
import subprocess

# الألوان للعرض في الطرفية
class Colors:
    RED = '\033[0;31m'
    GREEN = '\033[0;32m'
    YELLOW = '\033[1;33m'
    BLUE = '\033[0;34m'
    PURPLE = '\033[0;35m'
    CYAN = '\033[0;36m'
    NC = '\033[0m'  # بدون لون

class BackupSystem:
    def __init__(self):
        self.config_file = "backup_config.json"
        self.log_file = "backup_log.json"
        self.load_config()

    def print_message(self, color, message):
        """طباعة رسالة ملونة"""
        print(f"{color}{message}{Colors.NC}")

    def show_banner(self):
        """عرض شعار النظام"""
        os.system('clear' if os.name == 'posix' else 'cls')
        self.print_message(Colors.BLUE, "╔═══════════════════════════════════════════════════════════╗")
        self.print_message(Colors.BLUE, "║      نظام النسخ الاحتياطي المتقدم - Advanced Backup     ║")
        self.print_message(Colors.BLUE, "╚═══════════════════════════════════════════════════════════╝")
        print()

    def load_config(self):
        """تحميل الإعدادات"""
        if os.path.exists(self.config_file):
            with open(self.config_file, 'r', encoding='utf-8') as f:
                self.config = json.load(f)
        else:
            self.config = {
                "default_destination": "",
                "compression_type": "tar.gz",
                "verify_checksum": True,
                "backups": []
            }

    def save_config(self):
        """حفظ الإعدادات"""
        with open(self.config_file, 'w', encoding='utf-8') as f:
            json.dump(self.config, f, ensure_ascii=False, indent=2)

    def calculate_checksum(self, file_path, algorithm='sha256'):
        """حساب البصمة الرقمية للملف"""
        hash_func = hashlib.new(algorithm)

        if os.path.isfile(file_path):
            with open(file_path, 'rb') as f:
                for chunk in iter(lambda: f.read(4096), b""):
                    hash_func.update(chunk)
        elif os.path.isdir(file_path):
            for root, dirs, files in os.walk(file_path):
                for file in sorted(files):
                    file_full_path = os.path.join(root, file)
                    if os.path.exists(file_full_path):
                        with open(file_full_path, 'rb') as f:
                            for chunk in iter(lambda: f.read(4096), b""):
                                hash_func.update(chunk)

        return hash_func.hexdigest()

    def get_size(self, path):
        """حساب حجم الملف أو المجلد"""
        if os.path.isfile(path):
            return os.path.getsize(path)

        total_size = 0
        for dirpath, dirnames, filenames in os.walk(path):
            for filename in filenames:
                file_path = os.path.join(dirpath, filename)
                if os.path.exists(file_path):
                    total_size += os.path.getsize(file_path)
        return total_size

    def format_size(self, size_bytes):
        """تنسيق الحجم بالبايتات"""
        for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
            if size_bytes < 1024.0:
                return f"{size_bytes:.2f} {unit}"
            size_bytes /= 1024.0
        return f"{size_bytes:.2f} PB"

    def create_backup_simple(self, source, destination, name):
        """نسخ احتياطي بسيط بدون ضغط"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_name = f"{name}_{timestamp}"
        backup_path = os.path.join(destination, backup_name)

        self.print_message(Colors.YELLOW, f"بدء النسخ الاحتياطي...")
        self.print_message(Colors.BLUE, f"المصدر: {source}")
        self.print_message(Colors.BLUE, f"الوجهة: {backup_path}")

        try:
            if os.path.isfile(source):
                shutil.copy2(source, backup_path)
            else:
                shutil.copytree(source, backup_path)

            size = self.format_size(self.get_size(backup_path))
            self.print_message(Colors.GREEN, f"✓ تم النسخ بنجاح! الحجم: {size}")

            return {
                "success": True,
                "backup_path": backup_path,
                "size": size,
                "timestamp": timestamp
            }
        except Exception as e:
            self.print_message(Colors.RED, f"✗ خطأ: {str(e)}")
            return {"success": False, "error": str(e)}

    def create_backup_tar(self, source, destination, name):
        """نسخ احتياطي مضغوط tar.gz"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_name = f"{name}_{timestamp}.tar.gz"
        backup_path = os.path.join(destination, backup_name)

        self.print_message(Colors.YELLOW, f"بدء النسخ الاحتياطي المضغوط (tar.gz)...")
        self.print_message(Colors.BLUE, f"المصدر: {source}")

        try:
            original_size = self.get_size(source)

            with tarfile.open(backup_path, "w:gz") as tar:
                tar.add(source, arcname=os.path.basename(source))

            compressed_size = os.path.getsize(backup_path)
            ratio = (1 - compressed_size / original_size) * 100 if original_size > 0 else 0

            self.print_message(Colors.GREEN, f"✓ تم النسخ والضغط بنجاح!")
            self.print_message(Colors.GREEN, f"  الملف: {backup_path}")
            self.print_message(Colors.GREEN, f"  الحجم الأصلي: {self.format_size(original_size)}")
            self.print_message(Colors.GREEN, f"  الحجم المضغوط: {self.format_size(compressed_size)}")
            self.print_message(Colors.GREEN, f"  نسبة الضغط: {ratio:.2f}%")

            checksum = self.calculate_checksum(backup_path)

            return {
                "success": True,
                "backup_path": backup_path,
                "original_size": self.format_size(original_size),
                "compressed_size": self.format_size(compressed_size),
                "compression_ratio": f"{ratio:.2f}%",
                "checksum": checksum,
                "timestamp": timestamp
            }
        except Exception as e:
            self.print_message(Colors.RED, f"✗ خطأ: {str(e)}")
            return {"success": False, "error": str(e)}

    def create_backup_zip(self, source, destination, name):
        """نسخ احتياطي مضغوط zip"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_name = f"{name}_{timestamp}.zip"
        backup_path = os.path.join(destination, backup_name)

        self.print_message(Colors.YELLOW, f"بدء النسخ الاحتياطي المضغوط (zip)...")
        self.print_message(Colors.BLUE, f"المصدر: {source}")

        try:
            original_size = self.get_size(source)

            with zipfile.ZipFile(backup_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
                if os.path.isfile(source):
                    zipf.write(source, os.path.basename(source))
                else:
                    for root, dirs, files in os.walk(source):
                        for file in files:
                            file_path = os.path.join(root, file)
                            arcname = os.path.relpath(file_path, os.path.dirname(source))
                            zipf.write(file_path, arcname)

            compressed_size = os.path.getsize(backup_path)
            ratio = (1 - compressed_size / original_size) * 100 if original_size > 0 else 0

            self.print_message(Colors.GREEN, f"✓ تم النسخ والضغط بنجاح!")
            self.print_message(Colors.GREEN, f"  الملف: {backup_path}")
            self.print_message(Colors.GREEN, f"  الحجم الأصلي: {self.format_size(original_size)}")
            self.print_message(Colors.GREEN, f"  الحجم المضغوط: {self.format_size(compressed_size)}")
            self.print_message(Colors.GREEN, f"  نسبة الضغط: {ratio:.2f}%")

            checksum = self.calculate_checksum(backup_path)

            return {
                "success": True,
                "backup_path": backup_path,
                "original_size": self.format_size(original_size),
                "compressed_size": self.format_size(compressed_size),
                "compression_ratio": f"{ratio:.2f}%",
                "checksum": checksum,
                "timestamp": timestamp
            }
        except Exception as e:
            self.print_message(Colors.RED, f"✗ خطأ: {str(e)}")
            return {"success": False, "error": str(e)}

    def encrypt_backup(self, backup_path, password):
        """تشفير النسخة الاحتياطية باستخدام OpenSSL"""
        encrypted_path = f"{backup_path}.enc"

        self.print_message(Colors.YELLOW, "جاري تشفير النسخة الاحتياطية...")

        try:
            # استخدام OpenSSL للتشفير
            cmd = [
                'openssl', 'enc', '-aes-256-cbc', '-salt',
                '-in', backup_path,
                '-out', encrypted_path,
                '-k', password
            ]

            subprocess.run(cmd, check=True, capture_output=True)

            # حذف الملف الأصلي بعد التشفير
            os.remove(backup_path)

            self.print_message(Colors.GREEN, f"✓ تم التشفير بنجاح: {encrypted_path}")
            return {"success": True, "encrypted_path": encrypted_path}

        except subprocess.CalledProcessError as e:
            self.print_message(Colors.RED, f"✗ فشل التشفير: {e.stderr.decode()}")
            return {"success": False, "error": str(e)}
        except Exception as e:
            self.print_message(Colors.RED, f"✗ خطأ في التشفير: {str(e)}")
            return {"success": False, "error": str(e)}

    def decrypt_backup(self, encrypted_path, password, output_path):
        """فك تشفير النسخة الاحتياطية"""
        self.print_message(Colors.YELLOW, "جاري فك تشفير النسخة الاحتياطية...")

        try:
            cmd = [
                'openssl', 'enc', '-aes-256-cbc', '-d',
                '-in', encrypted_path,
                '-out', output_path,
                '-k', password
            ]

            subprocess.run(cmd, check=True, capture_output=True)

            self.print_message(Colors.GREEN, f"✓ تم فك التشفير بنجاح: {output_path}")
            return {"success": True, "decrypted_path": output_path}

        except subprocess.CalledProcessError as e:
            self.print_message(Colors.RED, f"✗ فشل فك التشفير (تحقق من كلمة المرور)")
            return {"success": False, "error": "Wrong password or corrupted file"}
        except Exception as e:
            self.print_message(Colors.RED, f"✗ خطأ في فك التشفير: {str(e)}")
            return {"success": False, "error": str(e)}

    def list_available_disks(self):
        """عرض الأقراص المتاحة"""
        self.print_message(Colors.BLUE, "الأقراص المتاحة:")
        self.print_message(Colors.YELLOW, "════════════════════════════════════════")

        try:
            # محاولة استخدام lsblk
            result = subprocess.run(['lsblk', '-o', 'NAME,SIZE,TYPE,MOUNTPOINT'],
                                  capture_output=True, text=True)
            print(result.stdout)
        except:
            # البديل: استخدام df
            result = subprocess.run(['df', '-h'], capture_output=True, text=True)
            print(result.stdout)

        self.print_message(Colors.YELLOW, "════════════════════════════════════════")

    def log_backup(self, source, destination, result):
        """تسجيل عملية النسخ الاحتياطي"""
        log_entry = {
            "timestamp": datetime.now().isoformat(),
            "source": source,
            "destination": destination,
            "result": result
        }

        # قراءة السجل الحالي
        logs = []
        if os.path.exists(self.log_file):
            with open(self.log_file, 'r', encoding='utf-8') as f:
                logs = json.load(f)

        logs.append(log_entry)

        # حفظ السجل
        with open(self.log_file, 'w', encoding='utf-8') as f:
            json.dump(logs, f, ensure_ascii=False, indent=2)

    def view_backup_history(self):
        """عرض سجل النسخ الاحتياطي"""
        if not os.path.exists(self.log_file):
            self.print_message(Colors.YELLOW, "لا يوجد سجل نسخ احتياطي")
            return

        with open(self.log_file, 'r', encoding='utf-8') as f:
            logs = json.load(f)

        self.print_message(Colors.BLUE, "سجل النسخ الاحتياطي:")
        self.print_message(Colors.YELLOW, "════════════════════════════════════════")

        for i, log in enumerate(logs[-10:], 1):  # عرض آخر 10 عمليات
            status = "✓ نجح" if log['result'].get('success') else "✗ فشل"
            print(f"{i}. {log['timestamp']}")
            print(f"   المصدر: {log['source']}")
            print(f"   الحالة: {status}")
            print()

        self.print_message(Colors.YELLOW, "════════════════════════════════════════")

    def interactive_menu(self):
        """القائمة التفاعلية"""
        while True:
            self.show_banner()

            print("اختر العملية:")
            print("1. نسخ احتياطي بسيط")
            print("2. نسخ احتياطي مضغوط (tar.gz)")
            print("3. نسخ احتياطي مضغوط (zip)")
            print("4. نسخ احتياطي مع تشفير")
            print("5. فك تشفير نسخة احتياطية")
            print("6. عرض الأقراص المتاحة")
            print("7. عرض سجل النسخ الاحتياطي")
            print("8. خروج")
            print()

            choice = input("اختر رقم الخيار: ")

            if choice == "1":
                self.perform_simple_backup()
            elif choice == "2":
                self.perform_tar_backup()
            elif choice == "3":
                self.perform_zip_backup()
            elif choice == "4":
                self.perform_encrypted_backup()
            elif choice == "5":
                self.perform_decrypt()
            elif choice == "6":
                self.list_available_disks()
                input("\nاضغط Enter للمتابعة...")
            elif choice == "7":
                self.view_backup_history()
                input("\nاضغط Enter للمتابعة...")
            elif choice == "8":
                self.print_message(Colors.GREEN, "شكراً لاستخدامك نظام النسخ الاحتياطي!")
                break
            else:
                self.print_message(Colors.RED, "خيار غير صحيح")
                input("اضغط Enter للمتابعة...")

    def perform_simple_backup(self):
        """تنفيذ نسخ احتياطي بسيط"""
        print()
        source = input("أدخل مسار المصدر: ")
        destination = input("أدخل مسار الوجهة: ")
        name = input("أدخل اسم النسخة: ")

        if not os.path.exists(source):
            self.print_message(Colors.RED, "المسار المصدر غير موجود!")
            input("اضغط Enter للمتابعة...")
            return

        os.makedirs(destination, exist_ok=True)
        result = self.create_backup_simple(source, destination, name)
        self.log_backup(source, destination, result)

        input("\nاضغط Enter للمتابعة...")

    def perform_tar_backup(self):
        """تنفيذ نسخ احتياطي tar.gz"""
        print()
        source = input("أدخل مسار المصدر: ")
        destination = input("أدخل مسار الوجهة: ")
        name = input("أدخل اسم النسخة: ")

        if not os.path.exists(source):
            self.print_message(Colors.RED, "المسار المصدر غير موجود!")
            input("اضغط Enter للمتابعة...")
            return

        os.makedirs(destination, exist_ok=True)
        result = self.create_backup_tar(source, destination, name)
        self.log_backup(source, destination, result)

        input("\nاضغط Enter للمتابعة...")

    def perform_zip_backup(self):
        """تنفيذ نسخ احتياطي zip"""
        print()
        source = input("أدخل مسار المصدر: ")
        destination = input("أدخل مسار الوجهة: ")
        name = input("أدخل اسم النسخة: ")

        if not os.path.exists(source):
            self.print_message(Colors.RED, "المسار المصدر غير موجود!")
            input("اضغط Enter للمتابعة...")
            return

        os.makedirs(destination, exist_ok=True)
        result = self.create_backup_zip(source, destination, name)
        self.log_backup(source, destination, result)

        input("\nاضغط Enter للمتابعة...")

    def perform_encrypted_backup(self):
        """تنفيذ نسخ احتياطي مشفر"""
        print()
        source = input("أدخل مسار المصدر: ")
        destination = input("أدخل مسار الوجهة: ")
        name = input("أدخل اسم النسخة: ")
        password = input("أدخل كلمة مرور التشفير: ")

        if not os.path.exists(source):
            self.print_message(Colors.RED, "المسار المصدر غير موجود!")
            input("اضغط Enter للمتابعة...")
            return

        os.makedirs(destination, exist_ok=True)

        # إنشاء نسخة مضغوطة أولاً
        result = self.create_backup_tar(source, destination, name)

        if result['success']:
            # تشفير النسخة
            encrypt_result = self.encrypt_backup(result['backup_path'], password)
            result['encrypted'] = encrypt_result['success']
            if encrypt_result['success']:
                result['backup_path'] = encrypt_result['encrypted_path']

        self.log_backup(source, destination, result)
        input("\nاضغط Enter للمتابعة...")

    def perform_decrypt(self):
        """فك تشفير نسخة احتياطية"""
        print()
        encrypted_file = input("أدخل مسار الملف المشفر: ")
        output_path = input("أدخل مسار حفظ الملف: ")
        password = input("أدخل كلمة المرور: ")

        if not os.path.exists(encrypted_file):
            self.print_message(Colors.RED, "الملف المشفر غير موجود!")
            input("اضغط Enter للمتابعة...")
            return

        result = self.decrypt_backup(encrypted_file, password, output_path)
        input("\nاضغط Enter للمتابعة...")

def main():
    """الدالة الرئيسية"""
    parser = argparse.ArgumentParser(description='نظام النسخ الاحتياطي المتقدم')
    parser.add_argument('-s', '--source', help='مسار المصدر')
    parser.add_argument('-d', '--destination', help='مسار الوجهة')
    parser.add_argument('-n', '--name', help='اسم النسخة الاحتياطية')
    parser.add_argument('-t', '--type', choices=['simple', 'tar', 'zip', 'encrypted'],
                       help='نوع النسخ الاحتياطي')
    parser.add_argument('-p', '--password', help='كلمة مرور التشفير')

    args = parser.parse_args()

    backup_system = BackupSystem()

    # إذا تم تمرير معاملات، تنفيذ مباشر
    if args.source and args.destination and args.name and args.type:
        os.makedirs(args.destination, exist_ok=True)

        if args.type == 'simple':
            result = backup_system.create_backup_simple(args.source, args.destination, args.name)
        elif args.type == 'tar':
            result = backup_system.create_backup_tar(args.source, args.destination, args.name)
        elif args.type == 'zip':
            result = backup_system.create_backup_zip(args.source, args.destination, args.name)
        elif args.type == 'encrypted':
            if not args.password:
                print("يجب تحديد كلمة المرور للتشفير")
                sys.exit(1)
            result = backup_system.create_backup_tar(args.source, args.destination, args.name)
            if result['success']:
                encrypt_result = backup_system.encrypt_backup(result['backup_path'], args.password)

        backup_system.log_backup(args.source, args.destination, result)
    else:
        # وضع تفاعلي
        backup_system.interactive_menu()

if __name__ == "__main__":
    main()
