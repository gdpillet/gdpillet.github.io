/**
 * Hero Load Animations
 * Activa las animaciones de entrada cuando la página carga
 */

(function() {
    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroAnimations);
    } else {
        initHeroAnimations();
    }

    function initHeroAnimations() {
        // Pequeño delay para asegurar que los estilos iniciales se apliquen
        setTimeout(() => {
            // Primera ola: header-logo y hero-inner (simultáneos)
            const headerLogo = document.querySelector('.header-logo');
            const heroInner = document.querySelector('.hero-inner');
            
            if (headerLogo) headerLogo.classList.add('animate-in');
            if (heroInner) heroInner.classList.add('animate-in');
            
            // Segunda ola: logo y hero-subhead (con delay automático por CSS - 0.2s)
            const logo = document.querySelector('.logo');
            const heroSubhead = document.querySelector('.hero-subhead');
            
            if (logo) logo.classList.add('animate-in');
            if (heroSubhead) heroSubhead.classList.add('animate-in');
            
            // Tercera ola: hero-buttons (con delay automático por CSS - 0.4s)
            const heroButtons = document.querySelector('.hero-buttons');
            
            if (heroButtons) heroButtons.classList.add('animate-in');
            
            // Cuarta ola: chat-bubble (con delay automático por CSS - 0.6s)
            const chatBubble = document.querySelector('.chat-bubble');
            
            if (chatBubble) chatBubble.classList.add('animate-in');
        }, 100);
    }
})();
