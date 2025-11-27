/* ============================================
   Color Match Challenge - Settings Page
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    loadSettings();
    setupEventListeners();
});

function loadSettings() {
    const settings = Storage.getSettings();
    const user = Storage.getUser();
    
    // Load username
    const usernameInput = document.getElementById('username');
    if (usernameInput) {
        usernameInput.value = user || '';
    }
    
    // Load difficulty
    const difficultyRadios = document.querySelectorAll('input[name="difficulty"]');
    difficultyRadios.forEach(radio => {
        if (radio.value === settings.difficulty) {
            radio.checked = true;
        }
    });
    
    // Load color filters
    const filterCheckboxes = document.querySelectorAll('input[name="colorFilters"]');
    filterCheckboxes.forEach(checkbox => {
        if (settings.colorFilters && settings.colorFilters.includes(checkbox.value)) {
            checkbox.checked = true;
        }
    });
}

function setupEventListeners() {
    const saveBtn = document.getElementById('save-settings-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveSettings);
    }
}

function saveSettings() {
    // Get username
    const usernameInput = document.getElementById('username');
    const username = usernameInput ? usernameInput.value.trim() : '';
    
    // Validate username
    if (!username || username === '') {
        alert('Please enter a username.');
        if (usernameInput) usernameInput.focus();
        return;
    }
    
    // Validate username length
    if (username.length > 20) {
        alert('Username must be 20 characters or less.');
        if (usernameInput) usernameInput.focus();
        return;
    }
    
    // Validate username doesn't contain only whitespace
    if (username.replace(/\s/g, '').length === 0) {
        alert('Username cannot be only spaces.');
        if (usernameInput) usernameInput.focus();
        return;
    }
    
    // Get difficulty
    const difficultyRadio = document.querySelector('input[name="difficulty"]:checked');
    const difficulty = difficultyRadio ? difficultyRadio.value : 'medium';
    
    // Get color filters
    const filterCheckboxes = document.querySelectorAll('input[name="colorFilters"]:checked');
    const colorFilters = Array.from(filterCheckboxes).map(cb => cb.value);
    
    // Save settings
    Storage.setUser(username);
    Storage.setSettings({
        difficulty: difficulty,
        colorFilters: colorFilters
    });
    
    // Show success message
    alert('Settings saved successfully!');
    
    // Optionally redirect to game page
    // window.location.href = 'game.html';
}

