/**
 * Header Load Animations
 * Anima el logo y header-logo en todas las páginas
 */

(function() {
    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeaderAnimations);
    } else {
        initHeaderAnimations();
    }

    function initHeaderAnimations() {
        // Pequeño delay para asegurar que los estilos iniciales se apliquen
        setTimeout(() => {
            // Animar header-logo y logo simultáneamente
            const headerLogo = document.querySelector('.header-logo');
            const logo = document.querySelector('.logo');
            
            if (headerLogo) headerLogo.classList.add('animate-in');
            if (logo) logo.classList.add('animate-in');
        }, 100);
    }
})();
