// Get elements
const card = document.getElementById('birthdayCard');
const cascadeContainer = document.getElementById('watermelonCascade');

let isOpened = false;
let cascadeInterval = null;

// Card click event
card.addEventListener('click', function() {
    if (!isOpened) {
        openCard();
        isOpened = true;
    }
});

// Open card function
function openCard() {
    card.classList.add('opened');
    
    // Start watermelon cascade after a short delay
    setTimeout(() => {
        startWatermelonCascade();
    }, 500);
}

// Create falling watermelon
function createFallingWatermelon() {
    const watermelon = document.createElement('div');
    watermelon.classList.add('falling-watermelon');
    watermelon.textContent = '🍉';
    
    // Random horizontal position
    const randomX = Math.random() * window.innerWidth;
    watermelon.style.left = randomX + 'px';
    
    // Random fall duration (between 2 and 4 seconds)
    const duration = 2 + Math.random() * 2;
    watermelon.style.animationDuration = duration + 's';
    
    // Random delay for more natural effect
    const delay = Math.random() * 0.5;
    watermelon.style.animationDelay = delay + 's';
    
    cascadeContainer.appendChild(watermelon);
    
    // Remove watermelon after animation completes
    setTimeout(() => {
        watermelon.remove();
    }, (duration + delay) * 1000);
}

// Start watermelon cascade
function startWatermelonCascade() {
    // Create initial burst of watermelons
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createFallingWatermelon();
        }, i * 100);
    }
    
    // Continue creating watermelons for 5 seconds
    let count = 0;
    cascadeInterval = setInterval(() => {
        createFallingWatermelon();
        count++;
        
        // Stop after 5 seconds (approximately 25 watermelons)
        if (count > 25) {
            clearInterval(cascadeInterval);
        }
    }, 200);
}

// Touch support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

card.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

card.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    
    // Prevent default behavior if not scrolling
    if (Math.abs(touchEndY - touchStartY) < 10 && !isOpened) {
        openCard();
        isOpened = true;
    }
}, { passive: true });

// Add a subtle hover effect on desktop
if (window.matchMedia("(min-width: 769px)").matches) {
    card.addEventListener('mouseenter', function() {
        if (!isOpened) {
            card.style.transform = 'scale(1.02)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (!isOpened) {
            card.style.transform = 'scale(1)';
        }
    });
}
