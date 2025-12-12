// Project Carousel functionality
class ProjectCarousel {
    constructor(elementId, suffixOverride = null) {
        this.element = document.getElementById(elementId);
        if (!this.element) return;

        this.elementId = elementId;
        this.suffix = suffixOverride || (elementId === 'nick-carousel' ? '-project' : `-${elementId}`);

        this.inner = this.element.querySelector('.carousel-inner-project');
        this.items = this.element.querySelectorAll('.carousel-item-project');
        this.prevBtn = this.element.querySelector('.carousel-nav-prev-project');
        this.nextBtn = this.element.querySelector('.carousel-nav-next-project');
        
        // Get indicators with suffix support
        this.currentIndicator = document.getElementById(`carouselCurrent${this.suffix}`);
        this.totalIndicator = document.getElementById(`carouselTotal${this.suffix}`);

        this.currentIndex = 0;
        this.itemWidth = 0;

        this.init();
    }

    init() {
        if (this.items.length === 0) return;

        this.totalIndicator.textContent = this.items.length;
        this.updateItemWidth();
        this.attachEventListeners();
        window.addEventListener('resize', () => this.updateItemWidth());
    }

    updateItemWidth() {
        const container = this.element.querySelector('.carousel-container-project');
        this.itemWidth = container.offsetWidth;
    }

    attachEventListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.updateCarousel();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.updateCarousel();
    }

    updateCarousel() {
        const offset = -this.currentIndex * this.itemWidth;
        this.inner.style.transform = `translateX(${offset}px)`;
        this.currentIndicator.textContent = this.currentIndex + 1;
    }
}

// Initialize carousels when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ProjectCarousel('nick-carousel', '-project');
    new ProjectCarousel('clearstar-carousel', '-clearstar');
});
