<!-- 762d7fc3-9997-4138-967b-ca0f76ffd4f4 299bd4b4-f0ce-4a3f-ac5a-7bb6020455f2 -->
# Color Match Challenge - Implementation Plan

## Project Structure

```
WebTech-ColorGame/
  index.html          (Homepage)
  game.html           (Game Page)
  leaderboard.html    (Leaderboard Page)
  settings.html       (Settings Page)
  about.html          (About Page)
  assets/
    css/
      style.css       (Shared styles, nav, typography)
      game.css        (Game-specific styles)
    js/
      main.js         (Shared utilities, nav, storage)
      game.js         (Game logic, sliders, scoring)
      leaderboard.js  (Leaderboard display)
      settings.js     (Settings management)
    images/
      favicon.ico
  pm.docs/            (Existing)
```

---

## UI Layouts (ASCII Mockups)

### Navigation Bar (All Pages)

```
+------------------------------------------------------------------+
|  [LOGO]   Home  |  Game  |  Leaderboard  |  Settings  |  About   |
+------------------------------------------------------------------+
```

---

### Homepage (index.html)

```
+------------------------------------------------------------------+
|                         NAVIGATION BAR                            |
+------------------------------------------------------------------+
|                                                                   |
|                    COLOR MATCH CHALLENGE                          |
|                    =====================                          |
|                                                                   |
|              Match the target color using RGB sliders!            |
|                                                                   |
|                      +----------------+                           |
|                      |   START GAME   |                           |
|                      +----------------+                           |
|                                                                   |
|                  [Sample color boxes preview]                     |
|                                                                   |
+------------------------------------------------------------------+
```

---

### Game Page (game.html) - Desktop Layout

Based on `Game.png` wireframe:

```
+------------------------------------------------------------------+
|                         NAVIGATION BAR                            |
+------------------------------------------------------------------+
|                                                                   |
|   +------------------+          |     +------------------+        |
|   |                  |          |     |                  |        |
|   |   YOUR COLOR     |          |     |  TARGET COLOR    |        |
|   |   (from sliders) |          |     |  (randomized)    |        |
|   |                  |          |     |                  |        |
|   +------------------+          |     +------------------+        |
|                                 |           Randomized            |
|   R: [====O-----------] 128     |                                 |
|   G: [========O-------] 200     |                                 |
|   B: [==O-------------]  50     |                                 |
|                                                                   |
+------------------------------------------------------------------+
|                      +------------------+                         |
|                      |      SUBMIT      |                         |
|                      +------------------+                         |
+------------------------------------------------------------------+
```

Note: Submit button is centered at the bottom, spanning full width of the game area.

### Game Page - Mobile Layout

```
+------------------------+
|     NAVIGATION BAR     |
+------------------------+
|                        |
|  +------------------+  |
|  |  TARGET COLOR    |  |
|  |  (randomized)    |  |
|  +------------------+  |
|       Randomized       |
|                        |
|  +------------------+  |
|  |   YOUR COLOR     |  |
|  |  (from sliders)  |  |
|  +------------------+  |
|                        |
|  R: [====O--------]    |
|  G: [========O----]    |
|  B: [==O----------]    |
|                        |
|  +------------------+  |
|  |      SUBMIT      |  |
|  +------------------+  |
+------------------------+
```

---

### End Game Modal (Overlay on Game Page)

Based on `Accuracy.png` wireframe:

```
+------------------------------------------------------------------+
|                         NAVIGATION BAR                            |
+------------------------------------------------------------------+
|                                                                   |
|        +--------------------------------------------+             |
|        |                                            |             |
|        |            80% Accurate!                   |             |
|        |                                            |             |
|        |         Average 70% accuracy               |             |
|        |                                            |             |
|        |            +--------------+                |             |
|        |            |  Continue?   |                |             |
|        |            +--------------+                |             |
|        |                                            |             |
|        +--------------------------------------------+             |
|                                                                   |
+------------------------------------------------------------------+
```

---

### Leaderboard Page (leaderboard.html)

```
+------------------------------------------------------------------+
|                         NAVIGATION BAR                            |
+------------------------------------------------------------------+
|                                                                   |
|                        LEADERBOARD                                |
|                        ===========                                |
|                                                                   |
|   +------+----------------+----------+------------+               |
|   | Rank |    Username    |  Score   | Difficulty |               |
|   +------+----------------+----------+------------+               |
|   |  1   |    player1     |   95%    |    Hard    |               |
|   |  2   |    player2     |   88%    |   Medium   |               |
|   |  3   |    player3     |   82%    |    Easy    |               |
|   |  4   |    player4     |   75%    |    Hard    |               |
|   |  5   |    player5     |   70%    |   Medium   |               |
|   +------+----------------+----------+------------+               |
|                                                                   |
|              [Clear Leaderboard]  [Export Scores]                 |
|                                                                   |
+------------------------------------------------------------------+
```

---

### Settings Page (settings.html)

```
+------------------------------------------------------------------+
|                         NAVIGATION BAR                            |
+------------------------------------------------------------------+
|                                                                   |
|                         SETTINGS                                  |
|                         ========                                  |
|                                                                   |
|   Username: [__________________]                                  |
|                                                                   |
|   Difficulty:                                                     |
|   ( ) Easy   - Large tolerance (+-20 RGB)                         |
|   (x) Medium - Standard tolerance (+-15 RGB)                      |
|   ( ) Hard   - Strict tolerance (+-10 RGB)                        |
|                                                                   |
|   Color Filters (optional):                                       |
|   [ ] Exclude warm colors (reds, oranges, yellows)                |
|   [ ] Exclude cool colors (blues, greens, purples)                |
|   [ ] Grayscale only                                              |
|                                                                   |
|              +------------------+                                 |
|              |   SAVE SETTINGS  |                                 |
|              +------------------+                                 |
|                                                                   |
+------------------------------------------------------------------+
```

---

### About Page (about.html)

```
+------------------------------------------------------------------+
|                         NAVIGATION BAR                            |
+------------------------------------------------------------------+
|                                                                   |
|                    HOW TO PLAY                                    |
|                    ===========                                    |
|                                                                   |
|   1. A random target color will appear on the right               |
|   2. Use the RGB sliders to match the color                       |
|   3. Click Submit when you think you've matched it                |
|   4. Your accuracy score will be calculated                       |
|   5. Try to beat your average and climb the leaderboard!          |
|                                                                   |
|   SCORING:                                                        |
|   - 100% = Perfect match                                          |
|   - Score decreases based on color distance                       |
|                                                                   |
|   CREDITS:                                                        |
|   Built for OIM3690 Web Technologies                              |
|   Created by [Your Name]                                          |
|                                                                   |
+------------------------------------------------------------------+
```

---

## Core JavaScript Features

### 1. RGB Sliders (Issue #1)

- Three range inputs (0-255) for R, G, B
- Real-time color preview updates via `oninput` events
- CSS styling for colored slider tracks

### 2. Color Display (Issue #2)

- Two color boxes: user's mix vs randomized target
- Generate random RGB target on page load
- Responsive: side-by-side (desktop), stacked (mobile)

### 3. Scorecard (Issue #3)

- Calculate Euclidean distance: `sqrt((R1-R2)^2 + (G1-G2)^2 + (B1-B2)^2)`
- Convert to percentage: `score = max(0, 100 - (distance / 4.41))`
- Store in localStorage with username and timestamp

### 4. Login System (Issue #4)

- Check localStorage for username on page load
- If none, redirect to settings or show username modal
- Simple username-only (no password)

### 5. End Game Screen (Issue #5)

- Modal overlay showing current score
- Calculate and display average from all stored scores
- "Continue?" button resets sliders and generates new target

---

## Local Storage Schema

```javascript
localStorage = {
  "colorGame_user": "playerName",
  "colorGame_settings": {
    "difficulty": "medium",
    "colorFilters": []
  },
  "colorGame_scores": [
    { "username": "player", "score": 85, "date": "...", "difficulty": "medium" }
  ]
}
```

---

## Implementation Order

### Phase 1: Foundation

1. Create folder structure and all HTML files
2. Build navigation bar (shared across pages)
3. Create base CSS with responsive grid layout

### Phase 2: Game Core (Issues #1, #2)

4. Implement RGB sliders with real-time preview
5. Add color display boxes (user vs target)
6. Generate random target colors

### Phase 3: Scoring (Issues #3, #4, #5)

7. Add submit button and score calculation
8. Build login/username system
9. Create end game modal with continue option

### Phase 4: Additional Features

10. Implement difficulty modes
11. Add color filters in settings
12. Build leaderboard display

### Phase 5: Polish

13. Form validation
14. Favicon and meta tags
15. Responsive refinements

### To-dos

- [ ] Create folder structure (assets/css, assets/js, assets/images)
- [ ] Build 5 HTML pages with shared navigation bar
- [ ] Create base CSS with responsive grid layout and typography
- [ ] Implement RGB sliders with real-time color preview (Issue #1)
- [ ] Add color display boxes - user color vs target color (Issue #2)
- [ ] Generate random target colors on page load
- [ ] Add submit button and score calculation logic (Issue #3)
- [ ] Build username login system with localStorage (Issue #4)
- [ ] Create end game modal with accuracy and average (Issue #5)
- [ ] Implement difficulty modes (Easy/Medium/Hard)
- [ ] Add color filter options in settings page
- [ ] Build leaderboard page with stored scores display
- [ ] Add form validation, favicon, meta tags, and responsive fixes