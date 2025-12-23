/**
 * Header Load Animations
 * Anima el logo, header-logo y elementos del menú en todas las páginas
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
            
            // Animar elementos del menú
            const navLinks = document.querySelectorAll('.nav-link');
            const themeToggle = document.querySelector('.theme-toggle');
            
            navLinks.forEach(link => link.classList.add('animate-in'));
            if (themeToggle) themeToggle.classList.add('animate-in');
        }, 100);
    }
})();
