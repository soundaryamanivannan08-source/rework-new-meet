function loadSharedComponents() {
    const navbar = `
        <header class="navbar">
            <div class="container nav-content">
               <a href="index.html" class="logo">
                    <img src="assests/logo.yellow.webp" alt="Logo">
                </a>
                <nav>
                    <ul class="nav-links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="blog.html">Blog</a></li>
                        <li><a href="contact.html">Contact</a></li>
                        <li><a href="login.html" class="btn-login">Login</a></li>
                        <li><a href="register.html" class="btn-login" style="background-color: var(--secondary); color: white; border-color: var(--secondary); margin-left: 0.5rem;">Register</a></li>
                    </ul>
                </nav>
                <div class="menu-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </header>
    `;

    const footer = `
        <footer class="footer">
            <div class="container footer-content">
                <div class="footer-col" style="flex: 1.5;">
                    <a href="index.html" class="logo">
                        <img src="assests/logo.yellow.webp" alt="Logo">
                    </a>
                    <p style="margin-top: 1.5rem; color: #cbd5f5;">Your premium source for design, lifestyle, and culture. Delivering insights, inspiration, and editorial excellence since 2026.</p>
                </div>
                <div class="footer-col">
                    <h3 style="margin-bottom: 1.5rem; color: #fff;">Quick Links</h3>
                    <ul style="list-style: none;">
                        <li style="margin-bottom: 0.8rem;"><a href="index.html" style="color: #cbd5f5;">Home</a></li>
                        <li style="margin-bottom: 0.8rem;"><a href="about.html" style="color: #cbd5f5;">About</a></li>
                        <li style="margin-bottom: 0.8rem;"><a href="services.html" style="color: #cbd5f5;">Services</a></li>
                        <li style="margin-bottom: 0.8rem;"><a href="contact.html" style="color: #cbd5f5;">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h3 style="margin-bottom: 1.5rem; color: #fff;">Connect</h3>
                    <div style="display: flex; gap: 15px;">
                        <a href="404.html" style="color: #cbd5f5; font-size: 1.2rem;"><i class="fab fa-facebook-f"></i></a>
                        <a href="404.html" style="color: #cbd5f5; font-size: 1.2rem;"><i class="fab fa-instagram"></i></a>
                        <a href="404.html" style="color: #cbd5f5; font-size: 1.2rem;"><i class="fab fa-twitter"></i></a>
                        <a href="404.html" style="color: #cbd5f5; font-size: 1.2rem;"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom" style="text-align: center; margin-top: 4rem; border-top: 1px solid #1e293b; padding-top: 1.5rem; color: #94a3b8; font-size: 0.85rem;">
                <p>&copy; 2026 LUXEMAG. All rights reserved.</p>
            </div>
        </footer>
    `;

    // Insert navbar
    const headerEl = document.getElementById('navbar-placeholder');
    if (headerEl) headerEl.innerHTML = navbar;

    // Insert footer
    const footerEl = document.getElementById('footer-placeholder');
    if (footerEl) footerEl.innerHTML = footer;

    // Setup active link
    let currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });
    }

    function setupDashboardSidebarToggle() {
        const dashboardHeader = document.querySelector('.dashboard-header');
        const sidebar = document.querySelector('.sidebar');
        if (!dashboardHeader || !sidebar) return;

        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'sidebar-toggle';
        toggle.textContent = '☰';

        const logo = dashboardHeader.querySelector('.logo');
        dashboardHeader.insertBefore(toggle, logo);

        toggle.addEventListener('click', (event) => {
            event.stopPropagation();
            sidebar.classList.toggle('active');
            toggle.classList.toggle('open');
        });

        document.addEventListener('click', (event) => {
            if (!sidebar.classList.contains('active')) return;
            if (!sidebar.contains(event.target) && !toggle.contains(event.target)) {
                sidebar.classList.remove('active');
                toggle.classList.remove('open');
            }
        });
    }

    function moveDashboardProfileInsideContent() {
        const dashboardHeader = document.querySelector('.dashboard-header');
        const userProfile = dashboardHeader ? dashboardHeader.querySelector('.user-profile') : null;
        const dashboardContent = document.querySelector('.dashboard-content');
        if (!userProfile || !dashboardContent) return;

        const actionsWrapper = document.createElement('div');
        actionsWrapper.className = 'dashboard-page-actions';
        actionsWrapper.appendChild(userProfile);

        dashboardContent.prepend(actionsWrapper);
    }

    // Dashboard sidebar toggle
    setupDashboardSidebarToggle();
    moveDashboardProfileInsideContent();

    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 50) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load
}

// Form Validation Utils
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function processFormValidation(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            if (input.hasAttribute('required')) {
                const group = input.closest('.form-group');
                const errMsg = group.querySelector('.error-msg');

                if (!input.value.trim()) {
                    group.classList.add('error');
                    if (errMsg) errMsg.textContent = 'This field is required';
                    isValid = false;
                } else if (input.type === 'email' && !validateEmail(input.value)) {
                    group.classList.add('error');
                    if (errMsg) errMsg.textContent = 'Invalid email address';
                    isValid = false;
                } else if (input.type === 'password' && input.value.length < 6) {
                    group.classList.add('error');
                    if (errMsg) errMsg.textContent = 'Password must be at least 6 characters';
                    isValid = false;
                } else {
                    group.classList.remove('error');
                }
            }
        });

        if (isValid) {
            // Simulated login routing
            if (formId === 'login-form') {
                const role = document.getElementById('role').value;
                if (role === 'admin') {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'user.html';
                }
            } else {
                alert('Form submitted successfully!');
                form.reset();
            }
        }
    });

    // Clear errors on typing
    form.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('input', () => {
            input.closest('.form-group').classList.remove('error');
        });
    });
}

function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const suffix = counter.getAttribute('data-suffix') || '';
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 16ms per frame (approx 60fps)

                let current = 0;
                const animateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current) + suffix;
                        requestAnimationFrame(animateCounter);
                    } else {
                        counter.innerText = target + suffix;
                    }
                };

                animateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadSharedComponents();

    // Init form validation if forms exist
    processFormValidation('login-form');
    processFormValidation('register-form');
    processFormValidation('contact-form');

    // Init counters for animated counting sections
    initCounters();
});

