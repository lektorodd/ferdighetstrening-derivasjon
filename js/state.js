/**
 * Application state management
 * @module state
 */

import { safeGetLocalStorage } from './utils.js';

/**
 * Central application state object
 */
export const state = {
    currentView: 'dashboard',
    language: 'no',
    activeTopic: 'chain',
    mode: 'focus',
    theme: localStorage.getItem('mathTrainerTheme') || 'light',
    progress: safeGetLocalStorage('mathTrainerProgress', {}),
    hints: safeGetLocalStorage('mathTrainerHints', []),
    recentlyShown: safeGetLocalStorage('mathTrainerRecentlyShown', []),
    activeProblems: [],
    filters: {
        levels: [1, 2, 3, 4, 5],
        types: ['poly', 'root', 'exp', 'log']
    },
    topicCeilings: safeGetLocalStorage('mathTrainerCeilings', {
        chain: 1,
        product: 1,
        quotient: 1
    }),
    levelProgress: safeGetLocalStorage('mathTrainerLevelProgress', {})
};

/**
 * Global problem bank reference
 * @type {Array}
 */
export let problemBank = [];

/**
 * Sets the problem bank
 * @param {Array} bank - The generated problem bank
 */
export function setProblemBank(bank) {
    problemBank = bank;
}

/**
 * Saves progress to localStorage
 */
export function saveProgress() {
    localStorage.setItem('mathTrainerProgress', JSON.stringify(state.progress));
}

/**
 * Saves hints to localStorage
 */
export function saveHints() {
    localStorage.setItem('mathTrainerHints', JSON.stringify(state.hints));
}

/**
 * Saves recently shown to localStorage
 */
export function saveRecentlyShown() {
    localStorage.setItem('mathTrainerRecentlyShown', JSON.stringify(state.recentlyShown));
}

/**
 * Saves ceiling progress to localStorage
 */
export function saveCeilings() {
    localStorage.setItem('mathTrainerCeilings', JSON.stringify(state.topicCeilings));
}

/**
 * Saves level progress to localStorage
 */
export function saveLevelProgress() {
    localStorage.setItem('mathTrainerLevelProgress', JSON.stringify(state.levelProgress));
}

/**
 * Clears all progress data
 */
export function clearAllProgress() {
    state.progress = {};
    state.hints = [];
    state.recentlyShown = [];
    state.activeProblems = [];
    state.topicCeilings = {
        chain: 1,
        product: 1,
        quotient: 1
    };
    state.levelProgress = {};

    localStorage.removeItem('mathTrainerProgress');
    localStorage.removeItem('mathTrainerHints');
    localStorage.removeItem('mathTrainerRecentlyShown');
    localStorage.removeItem('mathTrainerCeilings');
    localStorage.removeItem('mathTrainerLevelProgress');
}
