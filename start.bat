@echo off
chcp 65001 >nul
title مخطط بوابة الخوخة السكنية النموذجية

echo 🏘️  مرحباً بك في موقع مخطط بوابة الخوخة السكنية النموذجية
echo ==================================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js غير مثبت. يرجى تثبيت Node.js أولاً
    echo    يمكنك تحميله من: https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Node.js مثبت
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm غير مثبت
    pause
    exit /b 1
)

echo ✅ npm مثبت
npm --version

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 تثبيت التبعيات...
    npm install
    
    if %errorlevel% neq 0 (
        echo ❌ فشل في تثبيت التبعيات
        pause
        exit /b 1
    )
    
    echo ✅ تم تثبيت التبعيات بنجاح
) else (
    echo ✅ التبعيات مثبتة مسبقاً
)

REM Start the development server
echo 🚀 بدء تشغيل الخادم المحلي...
echo    سيتم فتح الموقع في المتصفح على العنوان: http://localhost:3000
echo    للإيقاف اضغط Ctrl+C
echo.

REM Try different server options
npm list -g live-server >nul 2>&1
if %errorlevel% equ 0 (
    npx live-server --port=3000 --open=/index.html
) else (
    npm list -g http-server >nul 2>&1
    if %errorlevel% equ 0 (
        echo 🌐 فتح المتصفح يدوياً على: http://localhost:8080
        npx http-server -p 8080 -c-1 -o
    ) else (
        echo ⚠️  لم يتم العثور على خادم تطوير
        echo    يمكنك فتح ملف index.html مباشرة في المتصفح
        echo    أو تثبيت live-server: npm install -g live-server
        
        REM Try to open the file directly
        start index.html
    )
)

pause
