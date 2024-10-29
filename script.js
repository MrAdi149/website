// Select page elements
const pages = document.querySelectorAll('.book-page');
const nextButton = document.querySelector('.next-page');
const prevButton = document.querySelector('.prev-page');

let currentPage = 0;

// Convert NodeList to Array for easier manipulation
const pagesArray = Array.from(pages);

// Set z-index for stacking order to handle the pages' depth
pagesArray.forEach((page, index) => {
    page.style.zIndex = pagesArray.length - index;
});

// Show the next page by adding a flipping class
function showNextPage() {
    if (currentPage < pagesArray.length) {
        const current = pagesArray[currentPage];
        if (current.classList.contains('page-left')) {
            current.classList.add('flipping-left');
        } else {
            current.classList.add('flipping-right');
        }
        currentPage++;
        updateButtons();
    }
}

// Show the previous page by removing the flipping class
function showPrevPage() {
    if (currentPage > 0) {
        currentPage--;
        const current = pagesArray[currentPage];
        current.classList.remove('flipping-left', 'flipping-right');
        updateButtons();
    }
}

// Update button states to disable/enable them at start/end
function updateButtons() {
    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === pagesArray.length;
}

// Event listeners for the next and previous buttons
nextButton.addEventListener('click', showNextPage);
prevButton.addEventListener('click', showPrevPage);

// Initialize the button states at the beginning
updateButtons();

// Add swipe functionality for mobile devices
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(event) {
    touchStartX = event.changedTouches[0].screenX;
}

function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        showNextPage(); // Swipe left to go to the next page
    }
    if (touchEndX > touchStartX + 50) {
        showPrevPage(); // Swipe right to go to the previous page
    }
}

// Add touch event listeners to the wrapper
document.querySelector('.wrapper').addEventListener('touchstart', handleTouchStart);
document.querySelector('.wrapper').addEventListener('touchend', handleTouchEnd);
