/**
 * Pixelate Reveal Animation
 * Reveals CTA section with a pixelated dissolve effect
 * Pixel size matches starfield star sizes (0.5 - 3px)
 */

(function() {
    'use strict';

    function initPixelateReveal() {
        const ctaSection = document.querySelector('.cta-section[data-reveal-from="left"]');
        if (!ctaSection) return;

        // Create canvas for pixelate effect
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.borderRadius = 'var(--radius-xl)';
        canvas.style.zIndex = '10';
        
        // Make section position relative to contain canvas
        ctaSection.style.position = 'relative';
        ctaSection.style.overflow = 'hidden';
        
        // Initially hide the content
        ctaSection.style.opacity = '0';
        
        // Insert canvas
        ctaSection.insertBefore(canvas, ctaSection.firstChild);
        
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        function resizeCanvas() {
            canvas.width = ctaSection.offsetWidth;
            canvas.height = ctaSection.offsetHeight;
        }
        resizeCanvas();
        
        // Pixel size consistent with starfield (0.5 - 3px, we'll use 2.5px as average)
        const pixelSize = 2.5;
        const cols = Math.ceil(canvas.width / pixelSize);
        const rows = Math.ceil(canvas.height / pixelSize);
        const totalPixels = cols * rows;
        
        // Create array of all pixel positions
        const pixels = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                pixels.push({ x, y, revealed: false });
            }
        }
        
        // Shuffle pixels for random reveal
        for (let i = pixels.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pixels[i], pixels[j]] = [pixels[j], pixels[i]];
        }
        
        // Get background color from gradient
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        const bgColor = '#4169E1'; // Royal blue from gradient
        
        // Fill canvas with background color initially
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        let revealedCount = 0;
        const duration = 1000; // 1 second
        const pixelsPerFrame = Math.ceil(totalPixels / (duration / 16)); // ~60fps
        
        // Observer to trigger animation when section is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && revealedCount === 0) {
                    // Show content immediately but keep canvas overlay
                    ctaSection.style.opacity = '1';
                    animate();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(ctaSection);
        
        function animate() {
            if (revealedCount >= totalPixels) {
                // Animation complete, remove canvas
                canvas.remove();
                ctaSection.classList.add('revealed');
                return;
            }
            
            // Reveal batch of pixels
            const endIndex = Math.min(revealedCount + pixelsPerFrame, totalPixels);
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = endIndex; i < totalPixels; i++) {
                const pixel = pixels[i];
                ctx.fillStyle = bgColor;
                ctx.fillRect(
                    pixel.x * pixelSize,
                    pixel.y * pixelSize,
                    pixelSize,
                    pixelSize
                );
            }
            
            revealedCount = endIndex;
            requestAnimationFrame(animate);
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPixelateReveal);
    } else {
        initPixelateReveal();
    }
})();
