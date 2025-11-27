/* ============================================
   Color Match Challenge - Shared JavaScript
   ============================================ */

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// LocalStorage utilities
const Storage = {
    // User management
    getUser: function() {
        return localStorage.getItem('colorGame_user') || '';
    },
    
    setUser: function(username) {
        localStorage.setItem('colorGame_user', username);
    },
    
    // Settings management
    getSettings: function() {
        const settings = localStorage.getItem('colorGame_settings');
        return settings ? JSON.parse(settings) : {
            difficulty: 'medium',
            colorFilters: []
        };
    },
    
    setSettings: function(settings) {
        localStorage.setItem('colorGame_settings', JSON.stringify(settings));
    },
    
    // Scores management
    getScores: function() {
        const scores = localStorage.getItem('colorGame_scores');
        return scores ? JSON.parse(scores) : [];
    },
    
    addScore: function(score) {
        const scores = this.getScores();
        scores.push({
            username: score.username,
            score: score.score,
            date: score.date || new Date().toISOString(),
            difficulty: score.difficulty || 'medium'
        });
        // Sort by score descending
        scores.sort((a, b) => b.score - a.score);
        localStorage.setItem('colorGame_scores', JSON.stringify(scores));
    },
    
    clearScores: function() {
        localStorage.removeItem('colorGame_scores');
    }
};

// Check if user is logged in, redirect to settings if not
function checkUserLogin() {
    const user = Storage.getUser();
    if (!user || user.trim() === '') {
        // Only redirect if we're on a page that requires login
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        if (currentPage === 'game.html' || currentPage === 'leaderboard.html') {
            window.location.href = 'settings.html';
        }
    }
    return user;
}

// Utility function to generate random RGB color
function generateRandomColor() {
    return {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
    };
}

// Utility function to apply color filters
function applyColorFilters(color, filters) {
    if (!filters || filters.length === 0) {
        return color;
    }
    
    let filteredColor = { ...color };
    
    filters.forEach(filter => {
        if (filter === 'excludeWarm') {
            // Exclude warm colors (reds, oranges, yellows)
            // Keep generating until we get a non-warm color
            while (filteredColor.r > filteredColor.b && filteredColor.r > filteredColor.g) {
                filteredColor = generateRandomColor();
            }
        } else if (filter === 'excludeCool') {
            // Exclude cool colors (blues, greens, purples)
            // Keep generating until we get a non-cool color
            while (filteredColor.b > filteredColor.r || filteredColor.g > filteredColor.r) {
                filteredColor = generateRandomColor();
            }
        } else if (filter === 'grayscale') {
            // Convert to grayscale
            const gray = Math.round(0.299 * filteredColor.r + 0.587 * filteredColor.g + 0.114 * filteredColor.b);
            filteredColor = { r: gray, g: gray, b: gray };
        }
    });
    
    return filteredColor;
}

// Format RGB color as string
function rgbToString(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`;
}

// Calculate color distance (Euclidean distance in RGB space)
function calculateColorDistance(color1, color2) {
    const dr = color1.r - color2.r;
    const dg = color1.g - color2.g;
    const db = color1.b - color2.b;
    return Math.sqrt(dr * dr + dg * dg + db * db);
}

// Calculate score percentage based on distance
function calculateScore(userColor, targetColor, difficulty = 'medium') {
    const distance = calculateColorDistance(userColor, targetColor);
    
    // Maximum possible distance in RGB space is sqrt(255^2 + 255^2 + 255^2) ≈ 441.67
    // We'll use 442 as the max distance for calculation
    const maxDistance = 442;
    
    // Score decreases linearly with distance
    // Perfect match (distance = 0) = 100%
    // Maximum distance = 0%
    const rawScore = Math.max(0, 100 - (distance / maxDistance) * 100);
    
    // Round to 2 decimal places
    return Math.round(rawScore * 100) / 100;
}

// Get difficulty tolerance (for future use)
function getDifficultyTolerance(difficulty) {
    const tolerances = {
        easy: 20,
        medium: 15,
        hard: 10
    };
    return tolerances[difficulty] || 15;
}

