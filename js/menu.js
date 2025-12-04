document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.main-nav');
    const body = document.body;
    const navLinks = document.querySelectorAll('.nav-link');

    // Función para abrir/cerrar menú
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        body.classList.toggle('menu-open'); // Prevenir scroll de fondo
        
        // Accesibilidad: Actualizar el estado de aria-expanded
        const isExpanded = hamburger.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Asegúrate de que todos los elementos pierdan la clase 'active' y 'menu-open'
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('menu-open');
            
            // Accesibilidad: Asegurar que aria-expanded sea false
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
});
/* Scroll to Top Button */
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    // 1. Show/Hide button based on scroll position
    window.onscroll = function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            // Show the button when scrolled down
            scrollToTopBtn.style.display = "flex"; 
        } else {
            // Hide the button when at the top
            scrollToTopBtn.style.display = "none";
        }
    };

    // 2. Scroll to top function
    scrollToTopBtn.onclick = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // 3. Keyboard accessibility for scroll-to-top
    scrollToTopBtn.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
    
    // (Existing menu logic goes here if menu.js already has content)
});