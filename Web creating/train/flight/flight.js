document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    navLinkItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const returnField = document.querySelector('.return-field');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Handle return date visibility
            if (this.dataset.tab === 'one-way') {
                returnField.style.display = 'none';
                document.getElementById('return').removeAttribute('required');
            } else {
                returnField.style.display = 'block';
                document.getElementById('return').setAttribute('required', '');
            }
        });
    });
    
    // Swap locations
    const swapBtn = document.getElementById('swap-locations');
    swapBtn.addEventListener('click', function() {
        const fromInput = document.getElementById('from');
        const toInput = document.getElementById('to');
        const temp = fromInput.value;
        fromInput.value = toInput.value;
        toInput.value = temp;
        
        // Add animation
        this.style.transform = 'rotate(540deg)';
        setTimeout(() => {
            this.style.transform = 'rotate(0)';
        }, 500);
    });
    
    // Passenger counter
    const passengerTypes = document.querySelectorAll('.passenger-type');
    
    passengerTypes.forEach(type => {
        const minusBtn = type.querySelector('.minus');
        const plusBtn = type.querySelector('.plus');
        const countElement = type.querySelector('.count');
        
        minusBtn.addEventListener('click', function() {
            let count = parseInt(countElement.textContent);
            if (count > 0) {
                count--;
                countElement.textContent = count;
                animateCounter(countElement, -1);
            }
        });
        
        plusBtn.addEventListener('click', function() {
            let count = parseInt(countElement.textContent);
            count++;
            countElement.textContent = count;
            animateCounter(countElement, 1);
        });
    });
    
    function animateCounter(element, direction) {
         element.style.transform = `translateY(${direction * 10}px)`;
        element.style.opacity = '0';
        
        setTimeout(() => {
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        }, 200);
    }
    
    // Airport suggestions
    const airports = [
        { name: "John F. Kennedy International Airport", code: "JFK", city: "New York" },
        { name: "Los Angeles International Airport", code: "LAX", city: "Los Angeles" },
        { name: "Heathrow Airport", code: "LHR", city: "London" },
        { name: "Charles de Gaulle Airport", code: "CDG", city: "Paris" },
        { name: "Tokyo Haneda Airport", code: "HND", city: "Tokyo" },
        { name: "Sydney Airport", code: "SYD", city: "Sydney" },
        { name: "Dubai International Airport", code: "DXB", city: "Dubai" },
        { name: "Changi Airport", code: "SIN", city: "Singapore" },
        { name: "O'Hare International Airport", code: "ORD", city: "Chicago" },
        { name: "San Francisco International Airport", code: "SFO", city: "San Francisco" }
    ];
    
    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');
    const fromSuggestions = fromInput.nextElementSibling;
    const toSuggestions = toInput.nextElementSibling;
    
    function showSuggestions(input, suggestionsContainer) {
        const value = input.value.toLowerCase();
        if (value.length < 2) {
            suggestionsContainer.classList.remove('show');
            return;
        }
        
        const filtered = airports.filter(airport => 
            airport.name.toLowerCase().includes(value) || 
            airport.code.toLowerCase().includes(value) || 
            airport.city.toLowerCase().includes(value)
        );
        
        if (filtered.length === 0) {
            suggestionsContainer.classList.remove('show');
            return;
        }
        
        suggestionsContainer.innerHTML = '';
        filtered.forEach(airport => {
            const div = document.createElement('div');
            div.textContent = `${airport.city} (${airport.code}) - ${airport.name}`;
            div.addEventListener('click', function() {
                input.value = `${airport.city} (${airport.code})`;
                suggestionsContainer.classList.remove('show');
                
                // Add confirmation animation
                input.style.boxShadow = '0 0 0 2px rgba(108, 99, 255, 0.5)';
                setTimeout(() => {
                    input.style.boxShadow = 'none';
                }, 1000);
            });
            suggestionsContainer.appendChild(div);
        });
        suggestionsContainer.classList.add('show');
    }
    
    fromInput.addEventListener('input', function() {
        showSuggestions(this, fromSuggestions);
    });
    
    toInput.addEventListener('input', function() {
        showSuggestions(this, toSuggestions);
    });
    
    // Close suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!fromInput.contains(e.target) && e.target !== fromInput) {
            fromSuggestions.classList.remove('show');
        }
        if (!toInput.contains(e.target) && e.target !== toInput) {
            toSuggestions.classList.remove('show');
        }
    });
    
    // Date inputs - set min date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('departure').min = today;
    document.getElementById('return').min = today;
    
    // Destination slider
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.destination-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    let slideInterval;
    
    // Create dots
    function createDots() {
        dotsContainer.innerHTML = ''; // Clear existing dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    createDots();
    
    const dots = document.querySelectorAll('.slider-dot');
    
    function goToSlide(slideIndex) {
        sliderContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
        currentSlide = slideIndex;
        
        // Update active slide
        slides.forEach((slide, index) => {
            if (index === slideIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            if (index === slideIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    function startSlideInterval() {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            goToSlide(currentSlide);
        }, 5000);
    }
    
    prevBtn.addEventListener('click', function() {
        clearInterval(slideInterval);
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
        startSlideInterval();
    });
    
    nextBtn.addEventListener('click', function() {
        clearInterval(slideInterval);
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
        startSlideInterval();
    });
    
    // Initialize auto slide
    startSlideInterval();
    
    // Pause on hover
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        startSlideInterval();
    });
    
    // Form submission
    const bookingForm = document.querySelector('.booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Search Complete';
                
                // Show success animation
                const checkIcon = submitBtn.querySelector('i');
                checkIcon.style.animation = 'bounce 0.5s';
                
                setTimeout(() => {
                    checkIcon.style.animation = '';
                    submitBtn.innerHTML = originalContent;
                    submitBtn.disabled = false;
                }, 2000);
            }, 3000);
        });
    }
    
    // Scroll reveal animation
    if (typeof ScrollReveal !== 'undefined') {
        const scrollReveal = ScrollReveal({
            origin: 'bottom',
            distance: '60px',
            duration: 1000,
            delay: 200,
            reset: true
        });
        
        scrollReveal.reveal('.section-header', { delay: 300 });
        scrollReveal.reveal('.feature-card', { interval: 200 });
        scrollReveal.reveal('.testimonial-card', { interval: 200 });
        scrollReveal.reveal('.newsletter-content', { origin: 'left' });
        scrollReveal.reveal('.newsletter-image', { origin: 'right', delay: 400 });
    }
    
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
    
    // Parallax effect on hero scroll
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
             hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    }
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .testimonial-card, .section-header');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});