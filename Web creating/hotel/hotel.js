document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
    
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto slide change every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto slide on hover
    const heroSlider = document.querySelector('.hero-slider');
    
    heroSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    heroSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Room Carousel
    const roomCarousel = document.querySelector('.room-carousel');
    const roomPrevBtn = document.querySelector('.carousel-prev');
    const roomNextBtn = document.querySelector('.carousel-next');
    
    roomNextBtn.addEventListener('click', () => {
        roomCarousel.scrollBy({ left: 350, behavior: 'smooth' });
    });
    
    roomPrevBtn.addEventListener('click', () => {
        roomCarousel.scrollBy({ left: -350, behavior: 'smooth' });
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialPrevBtn = document.querySelector('.testimonial-prev');
    const testimonialNextBtn = document.querySelector('.testimonial-next');
    const testimonialDots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        testimonialDots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    function nextTestimonial() {
        let nextIndex = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }
    
    function prevTestimonial() {
        let prevIndex = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(prevIndex);
    }
    
    testimonialNextBtn.addEventListener('click', nextTestimonial);
    testimonialPrevBtn.addEventListener('click', prevTestimonial);
    
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Auto testimonial change every 5 seconds
    let testimonialInterval = setInterval(nextTestimonial, 5000);
    
    // Pause auto slide on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll to booking form
    document.querySelectorAll('.scroll-to-booking').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const bookingSection = document.querySelector('#booking');
            if (bookingSection) {
                window.scrollTo({
                    top: bookingSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Booking Form Submission
    const bookingForm = document.getElementById('bookingForm');
    const bookingModal = document.getElementById('bookingModal');
    const modalMessage = document.getElementById('modalMessage');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const closeModal = document.querySelector('.close-modal');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const destination = document.getElementById('destination').value;
            const checkin = document.getElementById('checkin').value;
            const checkout = document.getElementById('checkout').value;
            const guests = document.getElementById('guests').value;
            
            // In a real app, you would send this data to a server
            // For demo purposes, we'll just show a success message
            const successMessage = `Thank you for subscribing with ${email}! You'll receive our exclusive offers and updates soon.`;            
            modalMessage.textContent = successMessage;
            bookingModal.classList.add('active');
            
            // Reset form
            this.reset();
        });
    }
    
    // Close modal
    function closeBookingModal() {
        bookingModal.classList.remove('active');
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeBookingModal);
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', closeBookingModal);
    }
    
    // Close modal when clicking outside
    bookingModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeBookingModal();
        }
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;
            
            // In a real app, you would send this data to a server
            // For demo purposes, we'll just show a success message
                        const successMessage = `Thank you, ${name}! Your message has been sent successfully. We'll get back to you soon at ${email}.`;
            
            modalMessage.textContent = successMessage;
            bookingModal.classList.add('active');
            
            // Reset form
            this.reset();
        });
    }
    
    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // In a real app, you would send this data to a server
            const successMessage = `Thank you for subscribing with ${email}! You'll receive our exclusive offers and updates soon.`;
            
            modalMessage.textContent = successMessage;
            bookingModal.classList.add('active');
            
            // Reset form
            emailInput.value = '';
        });
    }
    
    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.destination-card, .amenity-card, .room-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animated elements
    document.querySelectorAll('.destination-card, .amenity-card, .room-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    // Set minimum date for check-in to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('checkin').min = today;
    
    // Update checkout min date when checkin changes
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    if (checkinInput && checkoutInput) {
        checkinInput.addEventListener('change', function() {
            checkoutInput.min = this.value;
            if (checkoutInput.value < this.value) {
                checkoutInput.value = this.value;
            }
        });
    }
});