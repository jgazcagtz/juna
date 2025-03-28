document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.textContent = '☰';
                }
            }
        });
    });
    
    // Animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementPosition < windowHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Run once on load
    animateOnScroll();
    
    // Then on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Testimonial carousel
    const testimonialsContainer = document.getElementById('testimonialsContainer');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    let currentTestimonial = 0;
    const testimonialCount = document.querySelectorAll('.testimonial-card').length;
    
    function showTestimonial(index) {
        testimonialsContainer.style.transform = `translateX(-${index * 100}%)`;
        
        // Update dots
        testimonialDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentTestimonial = index;
    }
    
    // Dot navigation
    testimonialDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showTestimonial(index);
        });
    });
    
    // Auto-rotate testimonials
    let testimonialInterval = setInterval(() => {
        const nextIndex = (currentTestimonial + 1) % testimonialCount;
        showTestimonial(nextIndex);
    }, 5000);
    
    // Pause on hover
    testimonialsContainer.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialsContainer.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            const nextIndex = (currentTestimonial + 1) % testimonialCount;
            showTestimonial(nextIndex);
        }, 5000);
    });
    
    // Registration sections toggle
    const quieroConducirBtn = document.getElementById('quieroConducirBtn');
    const tengoAutoBtn = document.getElementById('tengoAutoBtn');
    const finalConducirBtn = document.getElementById('finalConducirBtn');
    const finalAutoBtn = document.getElementById('finalAutoBtn');
    const backFromDriver = document.getElementById('backFromDriver');
    const backFromOwner = document.getElementById('backFromOwner');
    const driverSection = document.getElementById('registro-conductoras');
    const ownerSection = document.getElementById('registro-propietarios');
    
    function showDriverSection() {
        driverSection.classList.add('active');
        ownerSection.classList.remove('active');
        window.scrollTo({
            top: driverSection.offsetTop - 80,
            behavior: 'smooth'
        });
    }
    
    function showOwnerSection() {
        ownerSection.classList.add('active');
        driverSection.classList.remove('active');
        window.scrollTo({
            top: ownerSection.offsetTop - 80,
            behavior: 'smooth'
        });
    }
    
    function hideAllSections() {
        driverSection.classList.remove('active');
        ownerSection.classList.remove('active');
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    if (quieroConducirBtn) quieroConducirBtn.addEventListener('click', showDriverSection);
    if (tengoAutoBtn) tengoAutoBtn.addEventListener('click', showOwnerSection);
    if (finalConducirBtn) finalConducirBtn.addEventListener('click', showDriverSection);
    if (finalAutoBtn) finalAutoBtn.addEventListener('click', showOwnerSection);
    if (backFromDriver) backFromDriver.addEventListener('click', hideAllSections);
    if (backFromOwner) backFromOwner.addEventListener('click', hideAllSections);
    
    // Form submissions to WhatsApp
    const driverForm = document.getElementById('driverForm');
    const ownerForm = document.getElementById('ownerForm');
    const whatsappNumber = '525536662894';

    function sendToWhatsApp(formData, formType) {
        let message = `*Nuevo registro JUNA - ${formType}*\n\n`;
        
        for (const [key, value] of Object.entries(formData)) {
            const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            message += `*${label}:* ${value}\n`;
        }
        
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    }

    if (driverForm) {
        driverForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: this.driverName.value,
                email: this.driverEmail.value,
                phone: this.driverPhone.value,
                city: this.driverCity.options[this.driverCity.selectedIndex].text,
                experience: this.driverExperience.value + ' años'
            };
            
            sendToWhatsApp(formData, 'Conductora');
            this.reset();
            hideAllSections();
        });
    }

    if (ownerForm) {
        ownerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: this.ownerName.value,
                email: this.ownerEmail.value,
                phone: this.ownerPhone.value,
                city: this.ownerCity.options[this.ownerCity.selectedIndex].text,
                carModel: this.carModel.value,
                carYear: this.carYear.value
            };
            
            sendToWhatsApp(formData, 'Propietario');
            this.reset();
            hideAllSections();
        });
    }
});
