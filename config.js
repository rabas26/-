// Configuration file for Al-Khokhah Gate Website
// This file contains all the configurable settings for the website

const CONFIG = {
    // Project Information
    project: {
        name: 'مخطط بوابة الخوخة السكنية النموذجية',
        nameEn: 'Al-Khokhah Gate Residential Model Scheme',
        description: 'مخطط سكني نموذجي في أجمل مواقع اليمن - جوهرة البحر الأحمر',
        totalArea: 1440000, // in square meters
        totalPlots: 4000,
        location: {
            governorate: 'الحديدة',
            district: 'الخوخة',
            coordinates: {
                lat: 13.8500, // Approximate coordinates for Al-Khokhah
                lng: 43.2500
            }
        }
    },

    // Plot Types Configuration
    plotTypes: {
        small: {
            name: 'سكنية صغيرة',
            nameEn: 'Small Residential',
            area: 160, // square meters
            percentage: 15,
            pricePerMeter: 50000, // YER per square meter
            features: ['مناسبة للأسر الصغيرة', 'أسعار تنافسية', 'تصميم عملي'],
            color: '#3498db'
        },
        medium: {
            name: 'سكنية متوسطة',
            nameEn: 'Medium Residential',
            area: 254, // square meters
            percentage: 70,
            pricePerMeter: 45000, // YER per square meter
            features: ['مساحة مثالية للعائلات', 'تصميم متوازن', 'قيمة استثمارية عالية'],
            color: '#27ae60',
            featured: true
        },
        commercial: {
            name: 'تجارية',
            nameEn: 'Commercial',
            areaRange: { min: 300, max: 1600 }, // square meters
            percentage: 15,
            pricePerMeter: 80000, // YER per square meter
            features: ['مواقع استراتيجية', 'عائد استثماري مرتفع', 'مساحات متنوعة'],
            color: '#e74c3c'
        }
    },

    // Distance Information
    distances: {
        cityCenter: {
            name: 'مركز مدينة الخوخة',
            distance: 5.5, // km
            icon: 'fas fa-city'
        },
        seashore: {
            name: 'الساحل البحري',
            distance: 7, // km
            icon: 'fas fa-water'
        },
        hays: {
            name: 'مدينة حيس',
            distance: 20, // km
            icon: 'fas fa-road'
        },
        coastalLine: {
            name: 'الخط الساحلي',
            distance: 6, // km
            icon: 'fas fa-route'
        }
    },

    // Contact Information
    contact: {
        phone: '+967 XXX XXX XXX',
        email: 'info@alkhokhah-gate.com',
        address: 'مديرية الخوخة، محافظة الحديدة، اليمن',
        workingHours: {
            saturday: '8:00 ص - 6:00 م',
            sunday: '8:00 ص - 6:00 م',
            monday: '8:00 ص - 6:00 م',
            tuesday: '8:00 ص - 6:00 م',
            wednesday: '8:00 ص - 6:00 م',
            thursday: '8:00 ص - 6:00 م',
            friday: 'مغلق'
        },
        socialMedia: {
            facebook: '#',
            twitter: '#',
            instagram: '#',
            whatsapp: '+967XXXXXXXXX'
        }
    },

    // Website Settings
    website: {
        title: 'مخطط بوابة الخوخة السكنية النموذجية',
        description: 'استثمر في أجمل مواقع اليمن - مخطط بوابة الخوخة السكنية النموذجية',
        keywords: 'الخوخة, أراضي للبيع, مخطط سكني, الحديدة, اليمن, استثمار عقاري',
        author: 'مخطط بوابة الخوخة',
        language: 'ar',
        direction: 'rtl',
        theme: {
            primaryColor: '#3498db',
            secondaryColor: '#f39c12',
            accentColor: '#27ae60',
            backgroundColor: '#f8f9fa',
            textColor: '#2c3e50'
        }
    },

    // Features List
    features: [
        {
            icon: 'fas fa-thermometer-half',
            title: 'مناخ معتدل',
            description: 'جو منعش وقليل الرطوبة على مدار السنة'
        },
        {
            icon: 'fas fa-gem',
            title: 'جوهرة البحر الأحمر',
            description: 'موقع فريد في أجمل مناطق الساحل اليمني'
        },
        {
            icon: 'fas fa-road',
            title: 'شبكة طرق متطورة',
            description: 'طرق معبدة وشبكة مواصلات ممتازة'
        },
        {
            icon: 'fas fa-chart-line',
            title: 'استثمار مربح',
            description: 'قيمة عقارية متنامية وعائد استثماري مضمون'
        },
        {
            icon: 'fas fa-shield-alt',
            title: 'أمان قانوني',
            description: 'صكوك ملكية رسمية ومعتمدة'
        },
        {
            icon: 'fas fa-users',
            title: 'مجتمع متكامل',
            description: 'بيئة سكنية راقية ومجتمع متحضر'
        }
    ],

    // Payment Options
    payment: {
        methods: ['cash', 'installment'],
        installmentOptions: [
            { months: 12, name: '12 شهر' },
            { months: 24, name: '24 شهر' },
            { months: 36, name: '36 شهر' }
        ],
        downPaymentPercentage: {
            min: 20, // minimum 20%
            recommended: 30 // recommended 30%
        },
        currency: {
            code: 'YER',
            symbol: 'ريال',
            name: 'ريال يمني'
        }
    },

    // Map Configuration
    map: {
        center: {
            lat: 13.8500,
            lng: 43.2500
        },
        zoom: 15,
        markers: [
            {
                lat: 13.8500,
                lng: 43.2500,
                title: 'مخطط بوابة الخوخة',
                type: 'project'
            },
            {
                lat: 13.8600,
                lng: 43.2400,
                title: 'مركز مدينة الخوخة',
                type: 'city'
            }
        ]
    },

    // Analytics Configuration
    analytics: {
        googleAnalyticsId: 'GA_MEASUREMENT_ID', // Replace with actual GA ID
        facebookPixelId: 'FB_PIXEL_ID', // Replace with actual Facebook Pixel ID
        trackingEvents: [
            'page_view',
            'plot_inquiry',
            'contact_form_submit',
            'phone_click',
            'booking_attempt',
            'booking_completed'
        ]
    },

    // SEO Configuration
    seo: {
        siteName: 'مخطط بوابة الخوخة السكنية النموذجية',
        siteUrl: 'https://alkhokhah-gate.com', // Replace with actual domain
        ogImage: '/images/og-image.jpg', // Add actual OG image
        twitterCard: 'summary_large_image',
        structuredData: {
            '@context': 'https://schema.org',
            '@type': 'RealEstateAgent',
            'name': 'مخطط بوابة الخوخة السكنية النموذجية',
            'description': 'مخطط سكني نموذجي في أجمل مواقع اليمن',
            'address': {
                '@type': 'PostalAddress',
                'addressCountry': 'YE',
                'addressRegion': 'الحديدة',
                'addressLocality': 'الخوخة'
            }
        }
    },

    // API Endpoints (for future backend integration)
    api: {
        baseUrl: '/api/v1',
        endpoints: {
            plots: '/plots',
            bookings: '/bookings',
            inquiries: '/inquiries',
            contact: '/contact',
            newsletter: '/newsletter'
        }
    },

    // Form Validation Rules
    validation: {
        name: {
            minLength: 2,
            maxLength: 50,
            required: true
        },
        phone: {
            pattern: /^[0-9+\-\s()]+$/,
            minLength: 9,
            maxLength: 15,
            required: true
        },
        email: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            required: false
        },
        nationalId: {
            minLength: 10,
            maxLength: 12,
            required: true
        }
    },

    // Notification Messages
    messages: {
        success: {
            formSubmit: 'تم إرسال استفسارك بنجاح! سنتواصل معك قريباً',
            bookingComplete: 'تم تأكيد حجزك بنجاح! سنتواصل معك لإتمام الإجراءات',
            newsletterSubscribe: 'تم اشتراكك في النشرة الإخبارية بنجاح'
        },
        error: {
            formValidation: 'يرجى ملء جميع الحقول المطلوبة',
            phoneInvalid: 'يرجى إدخال رقم هاتف صحيح',
            emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح',
            serverError: 'حدث خطأ في الخادم، يرجى المحاولة مرة أخرى',
            networkError: 'تحقق من اتصالك بالإنترنت وحاول مرة أخرى'
        },
        info: {
            loading: 'جاري التحميل...',
            processing: 'جاري المعالجة...',
            pleaseWait: 'يرجى الانتظار...'
        }
    },

    // Animation Settings
    animations: {
        duration: {
            fast: 300,
            normal: 600,
            slow: 1000
        },
        easing: 'ease-in-out',
        observerOptions: {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    }
};

// Utility Functions
const Utils = {
    // Format price with currency
    formatPrice(price) {
        return `${price.toLocaleString()} ${CONFIG.payment.currency.symbol}`;
    },

    // Calculate total price for a plot
    calculatePlotPrice(plotType, customArea = null) {
        const type = CONFIG.plotTypes[plotType];
        if (!type) return 0;

        let area;
        if (plotType === 'commercial' && customArea) {
            area = customArea;
        } else if (plotType === 'commercial') {
            area = type.areaRange.min; // Use minimum area for commercial
        } else {
            area = type.area;
        }

        return area * type.pricePerMeter;
    },

    // Calculate installment details
    calculateInstallment(totalPrice, downPaymentPercent, months) {
        const downPayment = totalPrice * (downPaymentPercent / 100);
        const remainingAmount = totalPrice - downPayment;
        const monthlyPayment = remainingAmount / months;

        return {
            totalPrice,
            downPayment,
            remainingAmount,
            monthlyPayment,
            months
        };
    },

    // Validate form field
    validateField(fieldName, value) {
        const rules = CONFIG.validation[fieldName];
        if (!rules) return { valid: true };

        const errors = [];

        if (rules.required && (!value || value.trim() === '')) {
            errors.push('هذا الحقل مطلوب');
        }

        if (value && rules.minLength && value.length < rules.minLength) {
            errors.push(`يجب أن يكون الحد الأدنى ${rules.minLength} أحرف`);
        }

        if (value && rules.maxLength && value.length > rules.maxLength) {
            errors.push(`يجب أن يكون الحد الأقصى ${rules.maxLength} حرف`);
        }

        if (value && rules.pattern && !rules.pattern.test(value)) {
            errors.push('تنسيق غير صحيح');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    },

    // Get plot type by area
    getPlotTypeByArea(area) {
        if (area <= 160) return 'small';
        if (area <= 254) return 'medium';
        return 'commercial';
    },

    // Generate WhatsApp message
    generateWhatsAppMessage(data) {
        const { name, phone, plotType, message } = data;
        const plotInfo = CONFIG.plotTypes[plotType];
        
        return `🏘️ *استفسار من موقع بوابة الخوخة*

👤 *الاسم:* ${name}
📱 *الهاتف:* ${phone}
🏠 *نوع القطعة:* ${plotInfo ? plotInfo.name : plotType}
💬 *الرسالة:* ${message || 'لا توجد رسالة إضافية'}

---
تم الإرسال من موقع ${CONFIG.project.name}`;
    }
};

// Export configuration and utilities
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, Utils };
} else {
    window.CONFIG = CONFIG;
    window.Utils = Utils;
}
