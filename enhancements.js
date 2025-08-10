// Enhanced Features for Al-Khokhah Gate Website
// This file contains additional functionality that can be integrated

// 1. Advanced Plot Calculator
class PlotCalculator {
    constructor() {
        this.prices = {
            small: 50000,    // Price per square meter for small plots
            medium: 45000,   // Price per square meter for medium plots
            commercial: 80000 // Price per square meter for commercial plots
        };
        
        this.areas = {
            small: 160,
            medium: 254,
            commercial: { min: 300, max: 1600 }
        };
    }
    
    calculatePrice(plotType, area = null) {
        if (plotType === 'commercial' && area) {
            return area * this.prices.commercial;
        }
        
        const plotArea = this.areas[plotType];
        const pricePerMeter = this.prices[plotType];
        
        return plotArea * pricePerMeter;
    }
    
    calculateInstallments(totalPrice, downPayment = 0.2, months = 24) {
        const downAmount = totalPrice * downPayment;
        const remainingAmount = totalPrice - downAmount;
        const monthlyPayment = remainingAmount / months;
        
        return {
            totalPrice,
            downPayment: downAmount,
            monthlyPayment,
            totalMonths: months
        };
    }
}

// 2. Interactive Map Integration
class InteractiveMap {
    constructor(containerId) {
        this.containerId = containerId;
        this.markers = [];
    }
    
    initializeMap() {
        // This would integrate with Google Maps or OpenStreetMap
        const mapContainer = document.getElementById(this.containerId);
        
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div class="interactive-map">
                    <div class="map-controls">
                        <button onclick="this.showSatelliteView()">عرض القمر الصناعي</button>
                        <button onclick="this.showStreetView()">عرض الشارع</button>
                        <button onclick="this.showPlotBoundaries()">حدود القطع</button>
                    </div>
                    <div class="map-canvas" id="mapCanvas"></div>
                    <div class="map-legend">
                        <div class="legend-item">
                            <span class="legend-color residential"></span>
                            <span>قطع سكنية</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-color commercial"></span>
                            <span>قطع تجارية</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-color available"></span>
                            <span>متاحة</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-color reserved"></span>
                            <span>محجوزة</span>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    
    addMarker(lat, lng, title, type) {
        this.markers.push({ lat, lng, title, type });
    }
    
    showPlotDetails(plotId) {
        // Show detailed information about a specific plot
        const plotInfo = this.getPlotInfo(plotId);
        this.showPlotModal(plotInfo);
    }
    
    getPlotInfo(plotId) {
        // This would fetch plot information from a database
        return {
            id: plotId,
            area: 254,
            type: 'residential',
            price: 11430000,
            status: 'available',
            features: ['زاوية', 'على شارع رئيسي', 'قريب من الخدمات']
        };
    }
    
    showPlotModal(plotInfo) {
        const modal = document.createElement('div');
        modal.className = 'plot-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>تفاصيل القطعة رقم ${plotInfo.id}</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="plot-details">
                        <p><strong>المساحة:</strong> ${plotInfo.area} متر مربع</p>
                        <p><strong>النوع:</strong> ${plotInfo.type === 'residential' ? 'سكنية' : 'تجارية'}</p>
                        <p><strong>السعر:</strong> ${plotInfo.price.toLocaleString()} ريال</p>
                        <p><strong>الحالة:</strong> ${plotInfo.status === 'available' ? 'متاحة' : 'محجوزة'}</p>
                        <div class="plot-features">
                            <h4>المميزات:</h4>
                            <ul>
                                ${plotInfo.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button class="reserve-btn">احجز الآن</button>
                        <button class="inquiry-btn">استفسار</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        modal.querySelector('.close-modal').onclick = () => modal.remove();
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };
    }
}

// 3. Advanced Search and Filter System
class PlotSearchFilter {
    constructor() {
        this.filters = {
            type: 'all',
            minArea: 0,
            maxArea: 2000,
            minPrice: 0,
            maxPrice: 200000000,
            features: []
        };
    }
    
    createFilterInterface() {
        return `
            <div class="search-filters">
                <div class="filter-section">
                    <h4>نوع القطعة</h4>
                    <select id="plotTypeFilter">
                        <option value="all">جميع الأنواع</option>
                        <option value="residential">سكنية</option>
                        <option value="commercial">تجارية</option>
                    </select>
                </div>
                
                <div class="filter-section">
                    <h4>المساحة (متر مربع)</h4>
                    <div class="range-inputs">
                        <input type="number" id="minArea" placeholder="من" min="100">
                        <input type="number" id="maxArea" placeholder="إلى" max="2000">
                    </div>
                </div>
                
                <div class="filter-section">
                    <h4>السعر (ريال يمني)</h4>
                    <div class="range-inputs">
                        <input type="number" id="minPrice" placeholder="من" min="0">
                        <input type="number" id="maxPrice" placeholder="إلى">
                    </div>
                </div>
                
                <div class="filter-section">
                    <h4>المميزات</h4>
                    <div class="checkbox-group">
                        <label><input type="checkbox" value="corner"> قطعة زاوية</label>
                        <label><input type="checkbox" value="main-street"> على شارع رئيسي</label>
                        <label><input type="checkbox" value="near-services"> قريب من الخدمات</label>
                        <label><input type="checkbox" value="sea-view"> إطلالة بحرية</label>
                    </div>
                </div>
                
                <div class="filter-actions">
                    <button id="applyFilters" class="apply-btn">تطبيق الفلاتر</button>
                    <button id="resetFilters" class="reset-btn">إعادة تعيين</button>
                </div>
            </div>
        `;
    }
    
    applyFilters(plots) {
        return plots.filter(plot => {
            // Apply type filter
            if (this.filters.type !== 'all' && plot.type !== this.filters.type) {
                return false;
            }
            
            // Apply area filter
            if (plot.area < this.filters.minArea || plot.area > this.filters.maxArea) {
                return false;
            }
            
            // Apply price filter
            if (plot.price < this.filters.minPrice || plot.price > this.filters.maxPrice) {
                return false;
            }
            
            // Apply features filter
            if (this.filters.features.length > 0) {
                const hasRequiredFeatures = this.filters.features.every(feature => 
                    plot.features.includes(feature)
                );
                if (!hasRequiredFeatures) return false;
            }
            
            return true;
        });
    }
}

// 4. Virtual Tour Integration
class VirtualTour {
    constructor() {
        this.scenes = [];
        this.currentScene = 0;
    }
    
    addScene(imageUrl, title, description, hotspots = []) {
        this.scenes.push({
            imageUrl,
            title,
            description,
            hotspots
        });
    }
    
    createTourInterface() {
        return `
            <div class="virtual-tour">
                <div class="tour-viewer">
                    <div class="panorama-container" id="panoramaContainer">
                        <!-- 360° panorama will be loaded here -->
                    </div>
                    <div class="tour-controls">
                        <button id="prevScene">المشهد السابق</button>
                        <span id="sceneInfo">1 من ${this.scenes.length}</span>
                        <button id="nextScene">المشهد التالي</button>
                    </div>
                </div>
                <div class="tour-navigation">
                    <h4>مشاهد الجولة</h4>
                    <div class="scene-thumbnails">
                        ${this.scenes.map((scene, index) => `
                            <div class="scene-thumb ${index === 0 ? 'active' : ''}" data-scene="${index}">
                                <img src="${scene.imageUrl}" alt="${scene.title}">
                                <span>${scene.title}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    loadScene(sceneIndex) {
        if (sceneIndex >= 0 && sceneIndex < this.scenes.length) {
            this.currentScene = sceneIndex;
            const scene = this.scenes[sceneIndex];
            
            // Load panorama image
            this.loadPanorama(scene.imageUrl);
            
            // Update scene info
            document.getElementById('sceneInfo').textContent = `${sceneIndex + 1} من ${this.scenes.length}`;
            
            // Update active thumbnail
            document.querySelectorAll('.scene-thumb').forEach((thumb, index) => {
                thumb.classList.toggle('active', index === sceneIndex);
            });
        }
    }
    
    loadPanorama(imageUrl) {
        // This would integrate with a 360° viewer library like Photo Sphere Viewer
        const container = document.getElementById('panoramaContainer');
        container.innerHTML = `
            <div class="panorama-placeholder">
                <i class="fas fa-360-degrees"></i>
                <h3>جولة افتراضية 360°</h3>
                <p>اكتشف المخطط من جميع الزوايا</p>
                <img src="${imageUrl}" alt="Panorama View" style="width: 100%; height: 300px; object-fit: cover; border-radius: 10px;">
            </div>
        `;
    }
}

// 5. Booking and Reservation System
class BookingSystem {
    constructor() {
        this.reservations = [];
    }
    
    createBookingForm(plotId) {
        return `
            <div class="booking-form">
                <h3>حجز القطعة رقم ${plotId}</h3>
                <form id="bookingForm">
                    <div class="form-section">
                        <h4>بيانات العميل</h4>
                        <div class="form-row">
                            <input type="text" name="firstName" placeholder="الاسم الأول" required>
                            <input type="text" name="lastName" placeholder="اسم العائلة" required>
                        </div>
                        <div class="form-row">
                            <input type="tel" name="phone" placeholder="رقم الهاتف" required>
                            <input type="email" name="email" placeholder="البريد الإلكتروني">
                        </div>
                        <input type="text" name="nationalId" placeholder="رقم الهوية الوطنية" required>
                    </div>
                    
                    <div class="form-section">
                        <h4>تفاصيل الدفع</h4>
                        <div class="payment-options">
                            <label>
                                <input type="radio" name="paymentType" value="cash" checked>
                                دفع كامل
                            </label>
                            <label>
                                <input type="radio" name="paymentType" value="installment">
                                دفع بالأقساط
                            </label>
                        </div>
                        <div id="installmentOptions" style="display: none;">
                            <select name="installmentPeriod">
                                <option value="12">12 شهر</option>
                                <option value="24">24 شهر</option>
                                <option value="36">36 شهر</option>
                            </select>
                            <input type="number" name="downPayment" placeholder="الدفعة المقدمة" min="0">
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h4>ملاحظات إضافية</h4>
                        <textarea name="notes" placeholder="أي ملاحظات أو طلبات خاصة"></textarea>
                    </div>
                    
                    <div class="booking-summary">
                        <h4>ملخص الحجز</h4>
                        <div class="summary-item">
                            <span>رقم القطعة:</span>
                            <span>${plotId}</span>
                        </div>
                        <div class="summary-item">
                            <span>المساحة:</span>
                            <span id="plotArea">254 متر مربع</span>
                        </div>
                        <div class="summary-item">
                            <span>السعر الإجمالي:</span>
                            <span id="totalPrice">11,430,000 ريال</span>
                        </div>
                    </div>
                    
                    <div class="form-actions">
                        <button type="submit" class="confirm-booking">تأكيد الحجز</button>
                        <button type="button" class="cancel-booking">إلغاء</button>
                    </div>
                </form>
            </div>
        `;
    }
    
    processBooking(formData) {
        // This would integrate with a backend system
        const booking = {
            id: Date.now(),
            plotId: formData.plotId,
            customer: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone,
                email: formData.email,
                nationalId: formData.nationalId
            },
            payment: {
                type: formData.paymentType,
                totalAmount: formData.totalAmount,
                downPayment: formData.downPayment || formData.totalAmount,
                installmentPeriod: formData.installmentPeriod || 0
            },
            status: 'pending',
            createdAt: new Date(),
            notes: formData.notes
        };
        
        this.reservations.push(booking);
        return booking;
    }
    
    generateContract(bookingId) {
        const booking = this.reservations.find(b => b.id === bookingId);
        if (!booking) return null;
        
        return `
            <div class="contract-document">
                <div class="contract-header">
                    <h2>عقد بيع قطعة أرض</h2>
                    <p>مخطط بوابة الخوخة السكنية النموذجية</p>
                </div>
                
                <div class="contract-parties">
                    <div class="party">
                        <h4>الطرف الأول (البائع):</h4>
                        <p>مخطط بوابة الخوخة السكنية النموذجية</p>
                    </div>
                    <div class="party">
                        <h4>الطرف الثاني (المشتري):</h4>
                        <p>${booking.customer.firstName} ${booking.customer.lastName}</p>
                        <p>رقم الهوية: ${booking.customer.nationalId}</p>
                        <p>الهاتف: ${booking.customer.phone}</p>
                    </div>
                </div>
                
                <div class="contract-terms">
                    <h4>بنود العقد:</h4>
                    <ol>
                        <li>رقم القطعة: ${booking.plotId}</li>
                        <li>المساحة: ${booking.plotArea} متر مربع</li>
                        <li>السعر الإجمالي: ${booking.payment.totalAmount.toLocaleString()} ريال يمني</li>
                        <li>الدفعة المقدمة: ${booking.payment.downPayment.toLocaleString()} ريال يمني</li>
                        ${booking.payment.type === 'installment' ? 
                            `<li>المبلغ المتبقي: ${(booking.payment.totalAmount - booking.payment.downPayment).toLocaleString()} ريال يمني</li>
                             <li>فترة التقسيط: ${booking.payment.installmentPeriod} شهر</li>` : ''
                        }
                    </ol>
                </div>
                
                <div class="contract-signatures">
                    <div class="signature">
                        <p>توقيع البائع</p>
                        <div class="signature-line"></div>
                    </div>
                    <div class="signature">
                        <p>توقيع المشتري</p>
                        <div class="signature-line"></div>
                    </div>
                </div>
                
                <div class="contract-date">
                    <p>التاريخ: ${new Date().toLocaleDateString('ar-YE')}</p>
                </div>
            </div>
        `;
    }
}

// 6. Analytics and Reporting
class AnalyticsSystem {
    constructor() {
        this.events = [];
    }
    
    trackEvent(eventType, data) {
        this.events.push({
            type: eventType,
            data: data,
            timestamp: new Date(),
            userAgent: navigator.userAgent,
            url: window.location.href
        });
        
        // Send to analytics service
        this.sendToAnalytics(eventType, data);
    }
    
    sendToAnalytics(eventType, data) {
        // Integration with Google Analytics or other analytics services
        if (typeof gtag !== 'undefined') {
            gtag('event', eventType, data);
        }
    }
    
    generateReport() {
        const report = {
            totalVisits: this.events.filter(e => e.type === 'page_view').length,
            plotInquiries: this.events.filter(e => e.type === 'plot_inquiry').length,
            bookingAttempts: this.events.filter(e => e.type === 'booking_attempt').length,
            completedBookings: this.events.filter(e => e.type === 'booking_completed').length,
            popularPlotTypes: this.getMostPopularPlotTypes(),
            conversionRate: this.calculateConversionRate()
        };
        
        return report;
    }
    
    getMostPopularPlotTypes() {
        const plotTypeEvents = this.events.filter(e => e.type === 'plot_view');
        const typeCounts = {};
        
        plotTypeEvents.forEach(event => {
            const type = event.data.plotType;
            typeCounts[type] = (typeCounts[type] || 0) + 1;
        });
        
        return Object.entries(typeCounts)
            .sort(([,a], [,b]) => b - a)
            .map(([type, count]) => ({ type, count }));
    }
    
    calculateConversionRate() {
        const totalVisits = this.events.filter(e => e.type === 'page_view').length;
        const completedBookings = this.events.filter(e => e.type === 'booking_completed').length;
        
        return totalVisits > 0 ? (completedBookings / totalVisits) * 100 : 0;
    }
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize calculator
    window.plotCalculator = new PlotCalculator();
    
    // Initialize analytics
    window.analytics = new AnalyticsSystem();
    window.analytics.trackEvent('page_view', { page: 'home' });
    
    // Add enhanced functionality to existing buttons
    document.querySelectorAll('.plot-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const plotCard = this.closest('.plot-card');
            const plotType = plotCard.classList.contains('commercial') ? 'commercial' : 
                            plotCard.querySelector('.area').textContent.includes('160') ? 'small' : 'medium';
            
            window.analytics.trackEvent('plot_inquiry', { plotType });
        });
    });
});

// Export classes for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PlotCalculator,
        InteractiveMap,
        PlotSearchFilter,
        VirtualTour,
        BookingSystem,
        AnalyticsSystem
    };
}
