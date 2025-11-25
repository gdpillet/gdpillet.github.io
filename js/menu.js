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