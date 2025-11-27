/* ============================================
   Color Match Challenge - Leaderboard Page
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    loadLeaderboard();
    setupEventListeners();
});

function loadLeaderboard() {
    const scores = Storage.getScores();
    const tbody = document.getElementById('leaderboard-body');
    
    if (!tbody) {
        return;
    }
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    if (scores.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="4" style="text-align: center; padding: 2rem;">No scores yet. Play the game to see your scores here!</td>';
        tbody.appendChild(row);
        return;
    }
    
    // Display top 50 scores
    const displayScores = scores.slice(0, 50);
    
    displayScores.forEach((score, index) => {
        const row = document.createElement('tr');
        
        const rank = index + 1;
        const username = score.username || 'Anonymous';
        const scoreValue = score.score.toFixed(1) + '%';
        const difficulty = score.difficulty ? score.difficulty.charAt(0).toUpperCase() + score.difficulty.slice(1) : 'Medium';
        const date = score.date ? new Date(score.date).toLocaleDateString() : 'N/A';
        
        row.innerHTML = `
            <td>${rank}</td>
            <td>${escapeHtml(username)}</td>
            <td>${scoreValue}</td>
            <td>${difficulty}</td>
        `;
        
        tbody.appendChild(row);
    });
}

function setupEventListeners() {
    const clearBtn = document.getElementById('clear-leaderboard-btn');
    const exportBtn = document.getElementById('export-scores-btn');
    
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to clear all scores? This action cannot be undone.')) {
                Storage.clearScores();
                loadLeaderboard();
                alert('Leaderboard cleared.');
            }
        });
    }
    
    if (exportBtn) {
        exportBtn.addEventListener('click', exportScores);
    }
}

function exportScores() {
    const scores = Storage.getScores();
    
    if (scores.length === 0) {
        alert('No scores to export.');
        return;
    }
    
    // Convert to CSV
    let csv = 'Rank,Username,Score,Difficulty,Date\n';
    scores.forEach((score, index) => {
        const rank = index + 1;
        const username = score.username || 'Anonymous';
        const scoreValue = score.score.toFixed(1);
        const difficulty = score.difficulty || 'medium';
        const date = score.date || '';
        csv += `${rank},"${username}",${scoreValue},${difficulty},"${date}"\n`;
    });
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `color-game-scores-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

