// Scroll Reveal Animation - Fade in and slide up on scroll
class ScrollReveal {
    constructor(options = {}) {
        this.options = {
            threshold: options.threshold || 0.1,
            rootMargin: options.rootMargin || '0px 0px -100px 0px',
            duration: options.duration || '0.6s',
            delay: options.delay || '0s',
            ...options
        };

        this.revealElements = document.querySelectorAll('[data-reveal]');
        
        // Check if IntersectionObserver is supported
        if (!('IntersectionObserver' in window)) {
            console.warn('IntersectionObserver not supported, revealing all elements');
            this.revealElements.forEach(el => el.classList.add('revealed'));
            return;
        }
        
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: this.options.threshold,
            rootMargin: this.options.rootMargin
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.revealElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        this.revealElements.forEach((el) => {
            observer.observe(el);
        });
    }

    revealElement(element) {
        element.classList.add('revealed');
    }
}

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    // Use more forgiving settings for mobile devices
    const isMobile = window.innerWidth <= 768;
    
    new ScrollReveal({
        threshold: isMobile ? 0.05 : 0.1,
        rootMargin: isMobile ? '0px 0px -30px 0px' : '0px 0px -50px 0px'
    });
});
