#!/bin/bash

# Al-Khokhah Gate Website Quick Start Script
# This script helps you quickly start the development server

echo "🏘️  مرحباً بك في موقع مخطط بوابة الخوخة السكنية النموذجية"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js غير مثبت. يرجى تثبيت Node.js أولاً"
    echo "   يمكنك تحميله من: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js مثبت - الإصدار: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm غير مثبت"
    exit 1
fi

echo "✅ npm مثبت - الإصدار: $(npm --version)"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 تثبيت التبعيات..."
    npm install
    
    if [ $? -eq 0 ]; then
        echo "✅ تم تثبيت التبعيات بنجاح"
    else
        echo "❌ فشل في تثبيت التبعيات"
        exit 1
    fi
else
    echo "✅ التبعيات مثبتة مسبقاً"
fi

# Start the development server
echo "🚀 بدء تشغيل الخادم المحلي..."
echo "   سيتم فتح الموقع في المتصفح على العنوان: http://localhost:3000"
echo "   للإيقاف اضغط Ctrl+C"
echo ""

# Check if live-server is available, otherwise use http-server
if command -v live-server &> /dev/null; then
    live-server --port=3000 --open=/index.html --no-browser=false
elif npm list -g live-server &> /dev/null; then
    npx live-server --port=3000 --open=/index.html --no-browser=false
elif command -v http-server &> /dev/null; then
    echo "🌐 فتح المتصفح يدوياً على: http://localhost:8080"
    http-server -p 8080 -c-1 -o
elif npm list -g http-server &> /dev/null; then
    echo "🌐 فتح المتصفح يدوياً على: http://localhost:8080"
    npx http-server -p 8080 -c-1 -o
else
    echo "⚠️  لم يتم العثور على خادم تطوير"
    echo "   يمكنك فتح ملف index.html مباشرة في المتصفح"
    echo "   أو تثبيت live-server: npm install -g live-server"
    
    # Try to open the file directly
    if command -v xdg-open &> /dev/null; then
        xdg-open index.html
    elif command -v open &> /dev/null; then
        open index.html
    elif command -v start &> /dev/null; then
        start index.html
    fi
fi
