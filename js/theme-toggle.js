/* =====================================================
   DARK MODE THEME TOGGLE
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    const html = document.documentElement;
    
    const THEME_KEY = 'theme-preference';
    const DARK_THEME = 'dark';
    const LIGHT_THEME = 'light';
    
    /**
     * Get the user's theme preference from localStorage or system preference
     */
    const getThemePreference = () => {
        // Check localStorage first
        const stored = localStorage.getItem(THEME_KEY);
        if (stored) {
            return stored;
        }
        
        // Default to dark mode
        return DARK_THEME;
    };
    
    /**
     * Apply the theme to the HTML element
     */
    const applyTheme = (theme) => {
        if (theme === DARK_THEME) {
            html.setAttribute('data-theme', DARK_THEME);
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            html.setAttribute('data-theme', LIGHT_THEME);
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    };
    
    /**
     * Toggle between light and dark themes
     */
    const toggleTheme = () => {
        const currentTheme = html.getAttribute('data-theme') || LIGHT_THEME;
        const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
        
        applyTheme(newTheme);
        localStorage.setItem(THEME_KEY, newTheme);
        
        // Close mobile menu overlay if open
        const hamburger = document.querySelector('.hamburger');
        const mainNav = document.querySelector('.main-nav');
        const body = document.body;
        const overlay = document.querySelector('.menu-overlay');
        
        if (hamburger && mainNav) {
            const isMenuOpen = hamburger.getAttribute('aria-expanded') === 'true';
            if (isMenuOpen) {
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.classList.remove('active');
                mainNav.classList.remove('active');
                body.classList.remove('menu-open');
                if (overlay) {
                    overlay.classList.remove('active');
                }
            }
        }
    };
    
    /**
     * Listen for system theme preference changes
     */
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
        // Only auto-update if user hasn't manually set a preference
        if (!localStorage.getItem(THEME_KEY)) {
            applyTheme(e.matches ? DARK_THEME : LIGHT_THEME);
        }
    });
    
    // Initialize theme on page load
    const initialTheme = getThemePreference();
    applyTheme(initialTheme);
    
    // Add click listener to toggle button
    themeToggle.addEventListener('click', toggleTheme);
    
    // Add keyboard support (Space or Enter)
    themeToggle.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            toggleTheme();
        }
    });
});
