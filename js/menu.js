document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.main-nav');
    const body = document.body;
    const navLinks = document.querySelectorAll('.nav-link');

    // Function to open/close menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        body.classList.toggle('menu-open'); // Prevent background scroll
        
        // Accessibility: Update aria-expanded state
        const isExpanded = hamburger.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Ensure all elements lose the 'active' and 'menu-open' classes
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('menu-open');
            
            // Accessibility: Ensure aria-expanded is false
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