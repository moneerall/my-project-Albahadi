// تفعيل القائمة المنسدلة للجوال
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }
    
    // إغلاق القائمة عند النقر على رابط
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });
    
    // تفعيل نموذج حجز الموعد
    const appointmentBtn = document.getElementById('appointmentBtn');
    const consultationBtn = document.getElementById('consultationBtn');
    const appointmentModal = document.getElementById('appointmentModal');
    const closeModal = document.querySelector('.close-modal');
    
    function openAppointmentModal() {
        appointmentModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function closeAppointmentModal() {
        appointmentModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    if (appointmentBtn) {
        appointmentBtn.addEventListener('click', openAppointmentModal);
    }
    
    if (consultationBtn) {
        consultationBtn.addEventListener('click', function() {
            document.getElementById('appointment-service').value = 'استشارة';
            openAppointmentModal();
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', closeAppointmentModal);
    }
    
    // إغلاق النموذج عند النقر خارج المحتوى
    window.addEventListener('click', function(event) {
        if (event.target === appointmentModal) {
            closeAppointmentModal();
        }
    });
    
    // معالجة نموذج حجز الموعد
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // هنا يمكن إضافة كود إرسال البيانات إلى الخادم
            const name = document.getElementById('appointment-name').value;
            const service = document.getElementById('appointment-service').value;
            
            alert(`شكراً ${name}، تم استلام طلب حجز موعد لخدمة ${service} بنجاح. سوف نتصل بك قريباً لتأكيد الموعد.`);
            
            // إعادة تعيين النموذج وإغلاقه
            appointmentForm.reset();
            closeAppointmentModal();
        });
    }
    
    // تفعيل شريط آراء العملاء
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        testimonials[index].classList.add('active');
        currentTestimonial = index;
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            let newIndex = currentTestimonial - 1;
            if (newIndex < 0) {
                newIndex = testimonials.length - 1;
            }
            showTestimonial(newIndex);
        });
        
        nextBtn.addEventListener('click', function() {
            let newIndex = currentTestimonial + 1;
            if (newIndex >= testimonials.length) {
                newIndex = 0;
            }
            showTestimonial(newIndex);
        });
        
        // تبديل تلقائي للآراء كل 5 ثواني
        setInterval(function() {
            let newIndex = currentTestimonial + 1;
            if (newIndex >= testimonials.length) {
                newIndex = 0;
            }
            showTestimonial(newIndex);
        }, 5000);
    }
    
    // إضافة تأثير التمرير السلس للروابط الداخلية
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // إضافة تأثير التمرير للعناصر عند ظهورها
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    const animateElements = document.querySelectorAll('.service-card, .feature-item, .team-member, .blog-card');
    animateElements.forEach(element => {
        observer.observe(element);
    });
});