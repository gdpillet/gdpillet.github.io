document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.main-nav');
    const body = document.body;
    const navLinks = document.querySelectorAll('.nav-link');

    // Guard clause - exit if required elements don't exist
    if (!hamburger || !nav) {
        console.warn('Menu elements not found');
        return;
    }

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    body.appendChild(overlay);

    // Centralized menu state management
    const setMenuState = (isOpen) => {
        hamburger.classList.toggle('active', isOpen);
        nav.classList.toggle('active', isOpen);
        overlay.classList.toggle('active', isOpen);
        body.classList.toggle('menu-open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
    };

    // Function to open/close menu
    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.classList.contains('active');
        setMenuState(!isExpanded);
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            setMenuState(false);
        });
    });

    // Close menu when clicking on overlay
    overlay.addEventListener('click', () => {
        setMenuState(false);
    });
});
/* Scroll to Top Button */
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    if (!scrollToTopBtn) {
        console.warn('Scroll to top button not found');
        return;
    }

    let scrollTimeout;
    const handleScroll = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                scrollToTopBtn.style.display = "flex"; 
            } else {
                scrollToTopBtn.style.display = "none";
            }
        }, 100);
    };

    // Use addEventListener instead of onscroll
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Scroll to top function
    scrollToTopBtn.onclick = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Keyboard accessibility for scroll-to-top
    scrollToTopBtn.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
});