/* ============================================
   Color Match Challenge - Game Logic
   ============================================ */

let targetColor = null;
let currentUserColor = { r: 128, g: 128, b: 128 };

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const user = checkUserLogin();
    if (!user) {
        return;
    }
    
    // Initialize game
    initializeGame();
    
    // Set up event listeners
    setupEventListeners();
});

function initializeGame() {
    // Get settings
    const settings = Storage.getSettings();
    
    // Generate target color with filters applied
    targetColor = generateRandomColor();
    targetColor = applyColorFilters(targetColor, settings.colorFilters);
    
    // Display target color
    updateColorDisplay('target-color-box', targetColor);
    
    // Initialize sliders
    const rSlider = document.getElementById('r-slider');
    const gSlider = document.getElementById('g-slider');
    const bSlider = document.getElementById('b-slider');
    
    if (rSlider && gSlider && bSlider) {
        rSlider.value = currentUserColor.r;
        gSlider.value = currentUserColor.g;
        bSlider.value = currentUserColor.b;
        
        updateSliderStyles();
        updateUserColor();
    }
}

function setupEventListeners() {
    // RGB Sliders
    const rSlider = document.getElementById('r-slider');
    const gSlider = document.getElementById('g-slider');
    const bSlider = document.getElementById('b-slider');
    
    if (rSlider) {
        rSlider.addEventListener('input', function() {
            currentUserColor.r = parseInt(this.value);
            updateSliderStyles();
            updateUserColor();
        });
    }
    
    if (gSlider) {
        gSlider.addEventListener('input', function() {
            currentUserColor.g = parseInt(this.value);
            updateSliderStyles();
            updateUserColor();
        });
    }
    
    if (bSlider) {
        bSlider.addEventListener('input', function() {
            currentUserColor.b = parseInt(this.value);
            updateSliderStyles();
            updateUserColor();
        });
    }
    
    // Submit button
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', handleSubmit);
    }
    
    // Modal button
    const continueBtn = document.getElementById('continue-btn');
    
    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            closeModal();
            resetGame();
        });
    }
}

function updateSliderStyles() {
    const rSlider = document.getElementById('r-slider');
    const gSlider = document.getElementById('g-slider');
    const bSlider = document.getElementById('b-slider');
    
    // Update red slider background (varying red, fixed green/blue)
    if (rSlider) {
        const g = currentUserColor.g;
        const b = currentUserColor.b;
        rSlider.style.background = `linear-gradient(to right, rgb(0, ${g}, ${b}), rgb(255, ${g}, ${b}))`;
    }
    
    // Update green slider background (varying green, fixed red/blue)
    if (gSlider) {
        const r = currentUserColor.r;
        const b = currentUserColor.b;
        gSlider.style.background = `linear-gradient(to right, rgb(${r}, 0, ${b}), rgb(${r}, 255, ${b}))`;
    }
    
    // Update blue slider background (varying blue, fixed red/green)
    if (bSlider) {
        const r = currentUserColor.r;
        const g = currentUserColor.g;
        bSlider.style.background = `linear-gradient(to right, rgb(${r}, ${g}, 0), rgb(${r}, ${g}, 255))`;
    }
}

function updateUserColor() {
    updateColorDisplay('user-color-box', currentUserColor);
    
    // Update slider value displays
    const rValue = document.getElementById('r-value');
    const gValue = document.getElementById('g-value');
    const bValue = document.getElementById('b-value');
    
    if (rValue) rValue.textContent = currentUserColor.r;
    if (gValue) gValue.textContent = currentUserColor.g;
    if (bValue) bValue.textContent = currentUserColor.b;
}

function updateColorDisplay(elementId, color) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.backgroundColor = rgbToString(color.r, color.g, color.b);
    }
}


function handleSubmit() {
    if (!targetColor) {
        alert('Error: Target color not initialized. Please refresh the page.');
        return;
    }
    
    // Calculate score
    const settings = Storage.getSettings();
    const score = calculateScore(currentUserColor, targetColor, settings.difficulty);
    
    // Save score
    const user = Storage.getUser();
    Storage.addScore({
        username: user,
        score: score,
        date: new Date().toISOString(),
        difficulty: settings.difficulty
    });
    
    // Show modal with results
    showEndGameModal(score);
}

function showEndGameModal(score) {
    const modal = document.getElementById('end-game-modal');
    const scoreDisplay = document.getElementById('score-display');
    const averageDisplay = document.getElementById('average-display');
    
    if (!modal || !scoreDisplay || !averageDisplay) {
        return;
    }
    
    // Calculate average score
    const scores = Storage.getScores();
    const average = scores.length > 0
        ? scores.reduce((sum, s) => sum + s.score, 0) / scores.length
        : score;
    
    // Update modal content
    scoreDisplay.textContent = `${score.toFixed(1)}%`;
    averageDisplay.textContent = `Average: ${average.toFixed(1)}% accuracy`;
    
    // Show modal
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('end-game-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function resetGame() {
    // Reset user color to middle values
    currentUserColor = { r: 128, g: 128, b: 128 };
    
    // Reset sliders
    const rSlider = document.getElementById('r-slider');
    const gSlider = document.getElementById('g-slider');
    const bSlider = document.getElementById('b-slider');
    
    if (rSlider) rSlider.value = 128;
    if (gSlider) gSlider.value = 128;
    if (bSlider) bSlider.value = 128;
    
    // Generate new target color
    const settings = Storage.getSettings();
    targetColor = generateRandomColor();
    targetColor = applyColorFilters(targetColor, settings.colorFilters);
    
    // Update displays
    updateColorDisplay('target-color-box', targetColor);
    updateSliderStyles();
    updateUserColor();
}

