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
    new ScrollReveal({
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
});
