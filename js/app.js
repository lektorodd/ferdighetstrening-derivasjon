/**
 * Main application entry point
 * @module app
 */

import { state, setProblemBank } from './state.js';
import { initTheme, toggleTheme } from './theme.js';
import { generateProblemBank } from './problems/index.js';
import { renderChart } from './charts.js';
import {
    navigateTo,
    startFocusMode,
    startMixMode,
    setMode,
    changeFocusRule,
    toggleFilter,
    applyFiltersAndDraw,
    setTheoryTopic,
    renderProblems,
    toggleHint,
    toggleSolution,
    rateProblem,
    toggleMarkedSolution,
    unmarkProblem,
    printMarkedProblems,
    clearProgress,
    setLanguage,
    updateLanguageUI
} from './ui.js';

/**
 * Initialize the application
 */
function init() {
    const savedLang = localStorage.getItem('mathTrainerLang');
    if (savedLang) state.language = savedLang;

    // Initialize theme
    initTheme();

    // Generate problems
    const bank = generateProblemBank();
    setProblemBank(bank);

    // Update UI
    updateLanguageUI();
    navigateTo('dashboard');
    renderChart();
}

// Expose functions to global scope for onclick handlers
window.app = {
    navigateTo,
    startFocusMode,
    startMixMode,
    setMode,
    changeFocusRule,
    toggleFilter,
    applyFiltersAndDraw,
    setTheoryTopic,
    renderProblems,
    toggleHint,
    toggleSolution,
    rateProblem,
    toggleMarkedSolution,
    unmarkProblem,
    printMarkedProblems,
    clearProgress,
    setLanguage,
    toggleTheme
};

// Also expose at window level for inline onclick handlers
window.navigateTo = navigateTo;
window.startFocusMode = startFocusMode;
window.startMixMode = startMixMode;
window.setMode = setMode;
window.changeFocusRule = changeFocusRule;
window.toggleFilter = toggleFilter;
window.applyFiltersAndDraw = applyFiltersAndDraw;
window.setTheoryTopic = setTheoryTopic;
window.toggleHint = toggleHint;
window.toggleSolution = toggleSolution;
window.rateProblem = rateProblem;
window.toggleMarkedSolution = toggleMarkedSolution;
window.unmarkProblem = unmarkProblem;
window.printMarkedProblems = printMarkedProblems;
window.clearProgress = clearProgress;
window.setLanguage = setLanguage;
window.toggleTheme = toggleTheme;

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
