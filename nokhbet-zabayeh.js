// تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    setupSmoothScrolling();
    setupActiveNavigation();
    setupAnimations();
    setupWhatsAppIntegration();
});

// تهيئة الموقع
function initializeWebsite() {
    console.log('تم تحميل موقع نخبة الذبائح بنجاح');
    
    // إضافة تأثيرات التحميل
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('fade-in');
        }, index * 200);
    });
}

// إعداد التمرير السلس
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// إعداد التنقل النشط
function setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
}

// إعداد الرسوم المتحركة
function setupAnimations() {
    // مراقب التقاطع للرسوم المتحركة
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // مراقبة العناصر
    const animatedElements = document.querySelectorAll('.feature-card, .product-card');
    animatedElements.forEach(el => observer.observe(el));
}

// إعداد تكامل واتساب
function setupWhatsAppIntegration() {
    // رسائل واتساب مخصصة للمنتجات
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const productType = index === 0 ? 'حري بلدي' : 'سواكني مستورد';
            const message = `السلام عليكم، أريد الاستفسار عن ذبائح ${productType}`;
            const whatsappUrl = `https://wa.me/966508290321?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    });
}

// دالة لإرسال رسالة واتساب مخصصة
function sendWhatsAppMessage(productType, details = '') {
    let message = `السلام عليكم ورحمة الله وبركاته\n\nأريد الاستفسار عن ذبائح ${productType}`;
    
    if (details) {
        message += `\n\nالتفاصيل: ${details}`;
    }
    
    message += '\n\nشكراً لكم';
    
    const whatsappUrl = `https://wa.me/966508290321?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// دالة لعرض معلومات المنتج
function showProductInfo(productType) {
    const productInfo = {
        'حري بلدي': {
            title: 'ذبائح حري بلدي',
            description: 'ذبائح حري بلدي أصيلة من تربية محلية في بيئة طبيعية صحية',
            features: [
                'تربية محلية 100%',
                'تغذية طبيعية على الأعلاف المحلية',
                'فحص بيطري شامل',
                'ذبح حلال وفقاً للشريعة الإسلامية',
                'لحم طري وطعم مميز'
            ]
        },
        'سواكني مستورد': {
            title: 'ذبائح سواكني مستورد',
            description: 'ذبائح سواكني مستوردة عالية الجودة من أفضل المصادر العالمية',
            features: [
                'مستورد من مصادر موثوقة',
                'شهادات جودة دولية',
                'فحص صحي شامل',
                'تبريد وحفظ متخصص',
                'أحجام متنوعة ومختارة'
            ]
        }
    };
    
    const info = productInfo[productType];
    if (info) {
        alert(`${info.title}\n\n${info.description}\n\nالمميزات:\n${info.features.map(f => `• ${f}`).join('\n')}`);
    }
}

// دالة لحساب تكلفة الطلب
function calculateOrderCost() {
    const items = prompt('أدخل تفاصيل طلبك (مثال: خروف حري بلدي متوسط)');
    if (items) {
        const message = `السلام عليكم، أريد حساب تكلفة الطلب التالي:\n\n${items}\n\nيرجى إرسال السعر الإجمالي مع تفاصيل التوصيل`;
        const whatsappUrl = `https://wa.me/966508290321?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
}

// دالة للاستفسار عن التوفر
function checkAvailability() {
    const message = `السلام عليكم، أريد الاستفسار عن الذبائح المتوفرة حالياً وأسعارها`;
    const whatsappUrl = `https://wa.me/966508290321?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// دالة لطلب معاينة الذبائح
function requestPreview() {
    const message = `السلام عليكم، أريد معاينة الذبائح المتوفرة قبل الشراء. هل يمكن إرسال صور أو فيديو للذبائح الحالية؟`;
    const whatsappUrl = `https://wa.me/966508290321?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// دالة لحجز ذبيحة
function reserveAnimal(type, size) {
    const message = `السلام عليكم، أريد حجز ${type} ${size}. يرجى تأكيد التوفر والسعر النهائي`;
    const whatsappUrl = `https://wa.me/966508290321?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// تأثيرات بصرية إضافية
function addVisualEffects() {
    // تأثير التمرير للخلفية
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // تأثير الماوس على البطاقات
    const cards = document.querySelectorAll('.product-card, .feature-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// تشغيل التأثيرات البصرية
addVisualEffects();

// دالة لإظهار رسالة ترحيب
function showWelcomeMessage() {
    setTimeout(() => {
        if (confirm('مرحباً بك في نخبة الذبائح! هل تريد التواصل معنا مباشرة عبر واتساب؟')) {
            const message = 'السلام عليكم، أريد الاستفسار عن منتجاتكم';
            const whatsappUrl = `https://wa.me/966508290321?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        }
    }, 3000);
}

// عرض رسالة الترحيب (يمكن تعطيلها)
// showWelcomeMessage();

// دالة لمشاركة الموقع
function shareWebsite() {
    if (navigator.share) {
        navigator.share({
            title: 'نخبة الذبائح',
            text: 'ذبائح حري بلدي وسواكني مستورد بأعلى جودة',
            url: window.location.href
        });
    } else {
        // نسخ الرابط للحافظة
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('تم نسخ رابط الموقع للحافظة');
        });
    }
}

// دالة للبحث السريع
function quickSearch() {
    const searchTerm = prompt('ابحث عن نوع ذبيحة معين:');
    if (searchTerm) {
        const message = `السلام عليكم، أبحث عن: ${searchTerm}`;
        const whatsappUrl = `https://wa.me/966508290321?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
}

// إضافة اختصارات لوحة المفاتيح
document.addEventListener('keydown', function(e) {
    // Ctrl + W للواتساب
    if (e.ctrlKey && e.key === 'w') {
        e.preventDefault();
        const message = 'السلام عليكم، أريد الاستفسار عن منتجاتكم';
        const whatsappUrl = `https://wa.me/966508290321?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
    
    // Ctrl + S للبحث
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        quickSearch();
    }
});

// تتبع التفاعل مع الموقع
function trackInteraction(action, details = '') {
    const interaction = {
        action: action,
        details: details,
        timestamp: new Date().toISOString(),
        page: window.location.pathname
    };
    
    // حفظ في التخزين المحلي للإحصائيات
    const interactions = JSON.parse(localStorage.getItem('siteInteractions') || '[]');
    interactions.push(interaction);
    localStorage.setItem('siteInteractions', JSON.stringify(interactions));
    
    console.log('تفاعل المستخدم:', interaction);
}

// تتبع النقرات على المنتجات
document.querySelectorAll('.product-card').forEach((card, index) => {
    card.addEventListener('click', function() {
        const productType = index === 0 ? 'حري بلدي' : 'سواكني مستورد';
        trackInteraction('product_click', productType);
    });
});



// تتبع النقرات على واتساب
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
        trackInteraction('whatsapp_click', this.textContent.trim());
    });
});

// دالة لعرض الإحصائيات (للمطور)
function showSiteStats() {
    const interactions = JSON.parse(localStorage.getItem('siteInteractions') || '[]');
    
    if (interactions.length === 0) {
        console.log('لا توجد تفاعلات مسجلة');
        return;
    }
    
    const stats = {
        totalInteractions: interactions.length,
        productClicks: interactions.filter(i => i.action === 'product_click').length,
        priceInquiries: interactions.filter(i => i.action === 'price_inquiry').length,
        whatsappClicks: interactions.filter(i => i.action === 'whatsapp_click').length,
        lastInteraction: interactions[interactions.length - 1]
    };
    
    console.log('إحصائيات الموقع:', stats);
    return stats;
}

// دالة لتحسين الأداء
function optimizePerformance() {
    // تحميل الصور بشكل تدريجي
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// تشغيل تحسين الأداء
optimizePerformance();

// دالة للتحقق من حالة الاتصال
function checkConnectionStatus() {
    if (navigator.onLine) {
        console.log('الاتصال بالإنترنت متاح');
    } else {
        alert('تحقق من اتصالك بالإنترنت للحصول على أفضل تجربة');
    }
}

// مراقبة حالة الاتصال
window.addEventListener('online', () => {
    console.log('تم استعادة الاتصال بالإنترنت');
});

window.addEventListener('offline', () => {
    alert('انقطع الاتصال بالإنترنت. بعض الميزات قد لا تعمل بشكل صحيح.');
});

// دالة لحفظ تفضيلات المستخدم
function saveUserPreferences(preferences) {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
}

// دالة لتحميل تفضيلات المستخدم
function loadUserPreferences() {
    const preferences = localStorage.getItem('userPreferences');
    return preferences ? JSON.parse(preferences) : {};
}

// دالة لإعداد الوضع الليلي (اختيارية)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    saveUserPreferences({ darkMode: isDarkMode });
}

// تحميل التفضيلات عند بدء التشغيل
const userPrefs = loadUserPreferences();
if (userPrefs.darkMode) {
    document.body.classList.add('dark-mode');
}

// دالة لإظهار معلومات الاتصال السريع
function showQuickContact() {
    const contactInfo = `
📞 للطلب والاستفسار:
• واتساب: 01234567890
• هاتف: 01234567890

🕐 ساعات العمل:
• يومياً من 8 صباحاً حتى 8 مساءً

📍 العنوان:
• مزرعة نخبة الذبائح - المنطقة الصناعية

✅ خدماتنا:
• ذبائح حري بلدي
• ذبائح سواكني مستورد
• توصيل لجميع المناطق
• ضمان الجودة
    `;
    
    alert(contactInfo);
}

// إضافة زر المساعدة السريعة
function addHelpButton() {
    const helpBtn = document.createElement('div');
    helpBtn.className = 'help-button';
    helpBtn.innerHTML = '<i class="fas fa-question-circle"></i>';
    helpBtn.onclick = showQuickContact;
    helpBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 60px;
        height: 60px;
        background: #8B4513;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000;
        transition: all 0.3s ease;
        font-size: 1.5rem;
    `;
    
    helpBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = '#A0522D';
    });
    
    helpBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = '#8B4513';
    });
    
    document.body.appendChild(helpBtn);
}

// إضافة زر المساعدة
addHelpButton();

// تحقق من حالة الاتصال عند التحميل
checkConnectionStatus();
