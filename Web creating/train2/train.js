document.addEventListener('DOMContentLoaded', function() {
    // Loading screen animation
    setTimeout(function() {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 500);
    }, 2000);

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Tab switching in booking form
    const tabs = document.querySelectorAll('.tab');
    const returnDateGroup = document.querySelector('.return-date-group');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            if (this.dataset.tab === 'round-trip') {
                returnDateGroup.style.display = 'block';
            } else {
                returnDateGroup.style.display = 'none';
            }
        });
    });

    // Passenger counter
    const passengerInput = document.getElementById('passengers');
    const minusBtn = document.querySelector('.passenger-btn.minus');
    const plusBtn = document.querySelector('.passenger-btn.plus');
    
    minusBtn.addEventListener('click', function() {
        let value = parseInt(passengerInput.value);
        if (value > 1) {
            passengerInput.value = value - 1;
        }
    });
    
    plusBtn.addEventListener('click', function() {
        let value = parseInt(passengerInput.value);
        if (value < 10) {
            passengerInput.value = value + 1;
        }
    });

    // Modal functionality
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const closeModals = document.querySelectorAll('.close-modal');
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');
    
    loginBtn.addEventListener('click', function() {
        loginModal.classList.add('active');
    });
    
    signupBtn.addEventListener('click', function() {
        signupModal.classList.add('active');
    });
    
    closeModals.forEach(btn => {
        btn.addEventListener('click', function() {
            loginModal.classList.remove('active');
            signupModal.classList.remove('active');
        });
    });
    
    showSignup.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.classList.remove('active');
        signupModal.classList.add('active');
    });
    
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        signupModal.classList.remove('active');
        loginModal.classList.add('active');
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
        if (e.target === signupModal) {
            signupModal.classList.remove('active');
        }
    });

    // Form submissions
    const bookingForm = document.getElementById('booking-form');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Searching for trains... This would connect to backend in a real application.');
        // In a real app, you would fetch train data from backend here
    });
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Login functionality would connect to backend in a real application.');
        loginModal.classList.remove('active');
    });
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Signup functionality would connect to backend in a real application.');
        signupModal.classList.remove('active');
    });

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.train-card, .offer-card, .feature-card, .booking-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // Set minimum date for departure to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('departure').min = today;
    document.getElementById('return').min = today;
    
    // Update return date min when departure date changes
    document.getElementById('departure').addEventListener('change', function() {
        document.getElementById('return').min = this.value;
    });

    // Hero button scroll to booking section
    document.querySelector('.hero-btn').addEventListener('click', function() {
        document.getElementById('booking').scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});