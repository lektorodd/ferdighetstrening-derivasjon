/**
 * Theme management (light/dark mode)
 * @module theme
 */

import { state } from './state.js';

/**
 * Initializes theme from localStorage
 */
export function initTheme() {
    const savedTheme = localStorage.getItem('mathTrainerTheme') || 'light';
    state.theme = savedTheme;
    applyTheme(savedTheme);
}

/**
 * Toggles between light and dark theme
 */
export function toggleTheme() {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    state.theme = newTheme;
    localStorage.setItem('mathTrainerTheme', newTheme);
    applyTheme(newTheme);
}

/**
 * Applies the specified theme
 * @param {string} theme - 'light' or 'dark'
 */
export function applyTheme(theme) {
    const html = document.documentElement;
    const lightIcons = document.querySelectorAll('.dark-hidden');
    const darkIcons = document.querySelectorAll('.light-hidden');

    if (theme === 'dark') {
        html.classList.add('dark');
        lightIcons.forEach(icon => icon.style.display = 'none');
        darkIcons.forEach(icon => icon.style.display = 'inline');
    } else {
        html.classList.remove('dark');
        lightIcons.forEach(icon => icon.style.display = 'inline');
        darkIcons.forEach(icon => icon.style.display = 'none');
    }
}
