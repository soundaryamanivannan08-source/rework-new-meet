document.addEventListener('DOMContentLoaded', () => {
    // Add the animation class to elements
    const animatedElements = document.querySelectorAll('.feature-card, .price-card, .hero2-text');
    
    animatedElements.forEach(el => el.classList.add('fade-in-up'));

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing after animation triggers
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
    const backgroundSlides = document.querySelectorAll(".slide-bg");
    const textSlides = document.querySelectorAll(".hero-text-slide");
    const indicatorDots = document.querySelectorAll(".slide-indicators .dot");
    
    let currentSlideIndex = 0;
    const slideDuration = 5000; // Time window step (5000ms = 5 seconds)
    let autoSlideTimer;

    function transitionToSlide(targetIndex) {
        // Remove active state from current items
        backgroundSlides[currentSlideIndex].classList.remove("active");
        textSlides[currentSlideIndex].classList.remove("active");
        indicatorDots[currentSlideIndex].classList.remove("active");

        // Update tracking cursor position
        currentSlideIndex = (targetIndex + backgroundSlides.length) % backgroundSlides.length;

        // Apply active state to target slide units
        backgroundSlides[currentSlideIndex].classList.add("active");
        textSlides[currentSlideIndex].classList.add("active");
        indicatorDots[currentSlideIndex].classList.add("active");
    }

    function initAutoRotation() {
        clearInterval(autoSlideTimer);
        autoSlideTimer = setInterval(() => {
            transitionToSlide(currentSlideIndex + 1);
        }, slideDuration);
    }

    // Bind manual control triggers to the indicator dots
    indicatorDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            transitionToSlide(index);
            initAutoRotation(); // Reset timer sequence safely upon user action
        });
    });

    // Fire the rotation engine
    initAutoRotation();
});