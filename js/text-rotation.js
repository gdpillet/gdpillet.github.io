// Smooth text rotation animation for hero title
(function() {
    const rotatingText = document.querySelector('.rotating-text');
    if (!rotatingText) return;

    const textItems = rotatingText.querySelectorAll('.text-item');
    let currentIndex = 0;
    const rotationInterval = 2000; // 2 seconds

    function rotateText() {
        // Remove active class from current item
        textItems[currentIndex].classList.remove('active');
        
        // Move to next item
        currentIndex = (currentIndex + 1) % textItems.length;
        
        // Add active class to new item
        textItems[currentIndex].classList.add('active');
    }

    // Start the rotation
    setInterval(rotateText, rotationInterval);
})();
