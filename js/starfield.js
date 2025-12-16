/**
 * Simple Starfield Animation
 * White points moving outward with size changes to simulate forward movement
 */

class Starfield {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.numStars = 150;
        this.isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.init());
        
        // Listen for theme changes
        const observer = new MutationObserver(() => {
            this.isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    }

    init() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        
        this.stars = [];
        for (let i = 0; i < this.numStars; i++) {
            this.stars.push(this.createStar());
        }
    }

    createStar() {
        const angle = Math.random() * Math.PI * 2;
        const maxDistance = Math.max(this.canvas.width, this.canvas.height) * 0.7;
        const distance = Math.random() * maxDistance;
        
        return {
            x: this.centerX + Math.cos(angle) * distance,
            y: this.centerY + Math.sin(angle) * distance,
            speed: 0.05 + Math.random() * 0.15,
            angle: angle,
            distance: distance
        };
    }

    updateStar(star) {
        star.distance += star.speed;
        
        star.x = this.centerX + Math.cos(star.angle) * star.distance;
        star.y = this.centerY + Math.sin(star.angle) * star.distance;
        
        const maxDistance = Math.max(this.canvas.width, this.canvas.height) * 0.7;
        if (star.distance > maxDistance) {
            const angle = Math.random() * Math.PI * 2;
            star.angle = angle;
            star.distance = Math.random() * 20;
            star.x = this.centerX + Math.cos(angle) * star.distance;
            star.y = this.centerY + Math.sin(angle) * star.distance;
            star.speed = 0.05 + Math.random() * 0.15;
        }
    }

    drawStar(star) {
        const maxDistance = Math.max(this.canvas.width, this.canvas.height) * 0.7;
        const progress = star.distance / maxDistance;
        
        const size = 0.5 + progress * 2.5;
        const opacity = Math.sin(progress * Math.PI) * (this.isDarkMode ? 0.8 : 0.4);
        
        // Use white for dark mode, dark gray for light mode
        const color = this.isDarkMode ? '255, 255, 255' : '60, 60, 80';
        
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(${color}, ${opacity})`;
        this.ctx.fill();
    }

    animate() {
        // Adjust background fade based on theme
        const bgOpacity = this.isDarkMode ? 0.1 : 0.15;
        const bgColor = this.isDarkMode ? '0, 0, 0' : '241, 245, 249';
        this.ctx.fillStyle = `rgba(${bgColor}, ${bgOpacity})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.stars.forEach(star => {
            this.updateStar(star);
            this.drawStar(star);
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new Starfield('starfield');
    });
} else {
    new Starfield('starfield');
}
