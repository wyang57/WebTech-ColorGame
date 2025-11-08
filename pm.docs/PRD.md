# Color Game - PRD

## Project Title
Color Match Challenge

## One-Sentence Goal
Provide an interactive game where users match colors from an API-generated target color using buttons, with adjustable difficulty and filters.

## Core Features
- Random target color fetched from a color API.
- Buttons with color options for the user to select, with tolerance for approximate matches (±10 or ±20 in RGB values).
- Difficulty modes: Easy, Medium, Hard (changes tolerance or number of color options).
- Color filters: allow users to exclude or specify certain colors in the game.
- Highscore leaderboard with username submission and score tracking.
- Optional login info for leaderboard submission.

## Intended Pages
- **Homepage**: Game overview and start button.
- **Game Page**: Main game interface with color matching buttons.
- **Leaderboard Page**: Displays highscores and user info.
- **Settings Page**: Choose difficulty and color filters.
- **About Page**: Instructions and credits.

## Design/Interaction Notes
- Responsive layout using Flexbox/Grid.
- Easy to hard modes adjust color matching tolerance and number of color buttons.
- Users can submit scores after entering username.
- Color filters influence which shades appear in the game.
 TESTING