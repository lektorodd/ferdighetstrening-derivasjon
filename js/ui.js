/**
 * UI rendering and interaction functions
 * @module ui
 */

import { state, problemBank, saveProgress, saveHints, saveCeilings, saveLevelProgress, clearAllProgress } from './state.js';
import { i18n } from './i18n.js';
import { theoryData } from './theory.js';
import { isRecommended, updateProblemSet, getLevelMasteryRate } from './algorithm.js';
import { updateChartData } from './charts.js';

/**
 * Navigates to a specific view
 * @param {string} viewId - The view identifier
 */
export function navigateTo(viewId) {
    state.currentView = viewId;

    // Hide all views
    document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
    // Show target view
    document.getElementById(`view-${viewId}`).classList.remove('hidden');

    // Update Nav State
    document.querySelectorAll('.nav-item').forEach(el => {
        if (el.id === `nav-${viewId}`) {
            el.classList.add('bg-blue-50', 'dark:bg-blue-900/30', 'text-blue-700', 'dark:text-blue-400');
            el.classList.remove('text-stone-600', 'dark:text-slate-400', 'hover:bg-stone-100', 'dark:hover:bg-slate-700');
        } else {
            el.classList.remove('bg-blue-50', 'dark:bg-blue-900/30', 'text-blue-700', 'dark:text-blue-400');
            el.classList.add('text-stone-600', 'dark:text-slate-400', 'hover:bg-stone-100', 'dark:hover:bg-slate-700');
        }
    });

    // Update mobile nav state as well
    updateMobileNavState(viewId);

    // View Specific Logic
    if (viewId === 'theory') {
        // Ensure we have a valid theory topic selected
        if (!state.activeTopic) {
            state.activeTopic = 'chain';
        }
        renderTheory();
    }

    if (viewId === 'practice') {
        if (state.activeProblems.length === 0) {
            state.mode = 'focus';
            renderModeUI();
        }
        renderProblems();
    }

    if (viewId === 'stats') updateChartData();

    if (viewId === 'marked') renderMarkedProblems();

    // Re-render math
    if (window.MathJax) MathJax.typeset();
}

/**
 * Starts focus training mode
 */
export function startFocusMode() {
    state.mode = 'focus';
    if (!state.activeTopic) state.activeTopic = 'chain';
    state.activeProblems = [];
    navigateTo('practice');
    renderModeUI();
    updateFilterCount();
}

/**
 * Starts smart mix training mode
 */
export function startMixMode() {
    state.mode = 'mix';
    updateProblemSet();
    navigateTo('practice');
    renderModeUI();
}

/**
 * Sets the current training mode
 * @param {string} mode - 'focus' or 'mix'
 */
export function setMode(mode) {
    state.mode = mode;
    state.activeProblems = [];
    if (mode === 'mix') updateProblemSet();
    renderModeUI();
    renderProblems();
    if (mode === 'focus') {
        const sel = document.getElementById('focus-rule-select');
        if (sel) sel.value = state.activeTopic;
        updateFilterCount();
    }
}

/**
 * Changes the focus rule/topic
 * @param {string} topic - The topic to focus on
 */
export function changeFocusRule(topic) {
    state.activeTopic = topic;
    state.activeProblems = [];
    renderProblems();
    updateFilterCount();
}

/**
 * Toggles a filter value
 * @param {string} category - 'level' or 'type'
 * @param {*} value - The value to toggle
 */
export function toggleFilter(category, value) {
    const list = state.filters[category + 's'];
    const index = list.indexOf(value);
    if (index === -1) list.push(value);
    else list.splice(index, 1);
    updateFilterCount();
}

/**
 * Updates the filter count display
 */
export function updateFilterCount() {
    const matches = problemBank.filter(p =>
        p.topic === state.activeTopic &&
        state.filters.levels.includes(p.level) &&
        state.filters.types.includes(p.type)
    );
    document.getElementById('filter-count').textContent = matches.length;
}

/**
 * Applies filters and draws new problems
 */
export function applyFiltersAndDraw() {
    let candidates = problemBank.filter(p =>
        p.topic === state.activeTopic &&
        state.filters.levels.includes(p.level) &&
        state.filters.types.includes(p.type)
    );

    if (candidates.length === 0) {
        alert(i18n[state.language].no_problems_found);
        return;
    }

    // Remove duplicates based on question text
    const seenQuestions = new Set();
    candidates = candidates.filter(p => {
        if (seenQuestions.has(p.q)) {
            return false;
        }
        seenQuestions.add(p.q);
        return true;
    });

    candidates.sort(() => 0.5 - Math.random());
    state.activeProblems = candidates.slice(0, 5);
    state.activeProblems.sort((a, b) => a.level - b.level);

    renderProblems();
}

/**
 * Renders the mode UI (focus vs mix buttons)
 */
export function renderModeUI() {
    const focusBtn = document.getElementById('mode-focus-btn');
    const mixBtn = document.getElementById('mode-mix-btn');
    const focusPanel = document.getElementById('focus-filter-panel');
    const titleEl = document.getElementById('practice-title');
    const ruleSel = document.getElementById('focus-rule-select');

    if (state.mode === 'focus') {
        focusBtn.className = "px-3 py-1 text-xs font-bold rounded transition-all bg-blue-600 dark:bg-blue-500 text-white shadow-sm";
        mixBtn.className = "px-3 py-1 text-xs font-bold rounded transition-all text-stone-500 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-700";
        focusPanel.classList.remove('hidden');
        if (ruleSel) ruleSel.value = state.activeTopic;
        titleEl.textContent = i18n[state.language].dash_focus_header;
    } else {
        mixBtn.className = "px-3 py-1 text-xs font-bold rounded transition-all bg-purple-600 dark:bg-purple-500 text-white shadow-sm";
        focusBtn.className = "px-3 py-1 text-xs font-bold rounded transition-all text-stone-500 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-700";
        focusPanel.classList.add('hidden');
        titleEl.textContent = i18n[state.language].mode_mix_title;
    }
}

/**
 * Sets the active theory topic
 * @param {string} topic - The topic to display
 */
export function setTheoryTopic(topic) {
    state.activeTopic = topic;
    renderTheory();
    updateTheoryTabs();
}

/**
 * Updates theory tab styling
 */
export function updateTheoryTabs() {
    // Update active tab styling
    document.querySelectorAll('.theory-tab').forEach(tab => {
        tab.classList.remove('bg-blue-600', 'dark:bg-blue-500', 'text-white', 'shadow-sm');
        tab.classList.add('text-stone-600', 'dark:text-slate-300', 'hover:bg-stone-50', 'dark:hover:bg-slate-700');
    });

    const activeTab = document.getElementById(`theory-tab-${state.activeTopic}`);
    if (activeTab) {
        activeTab.classList.remove('text-stone-600', 'dark:text-slate-300', 'hover:bg-stone-50', 'dark:hover:bg-slate-700');
        activeTab.classList.add('bg-blue-600', 'dark:bg-blue-500', 'text-white', 'shadow-sm');
    }
}

/**
 * Renders the theory content
 */
export function renderTheory() {
    // Use state.activeTopic as the source of truth
    let topic = state.activeTopic || 'chain';

    // Ensure we have a valid topic context
    if (!theoryData[topic]) topic = 'chain';

    const content = theoryData[topic][state.language];
    const container = document.getElementById('theory-content');

    container.innerHTML = `
        <h3 class="text-xl font-bold text-stone-800 dark:text-slate-200 mb-4">${content.title}</h3>
        <p class="text-stone-600 dark:text-slate-400 mb-6 leading-relaxed">${content.intro}</p>

        <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-6 rounded-lg mb-6 text-center overflow-x-auto">
            <span class="text-xs font-bold text-blue-400 dark:text-blue-300 uppercase tracking-wider mb-2 block">${i18n[state.language].theory_formula}</span>
            <div class="text-lg text-stone-800 dark:text-slate-200 font-serif whitespace-nowrap">${content.formula}</div>
        </div>

        <p class="text-stone-500 dark:text-slate-400 italic text-center mb-8 border-l-4 border-stone-200 dark:border-slate-600 pl-4">${content.ruleText}</p>

        ${content.whenToUse || ''}

        ${content.detailedExample || ''}
    `;

    updateTheoryTabs();
    if (window.MathJax) MathJax.typeset();
}

/**
 * Renders the problem cards
 */
export function renderProblems() {
    const container = document.getElementById('problems-container');
    const texts = i18n[state.language];
    container.innerHTML = '';

    const list = state.activeProblems;

    if (list.length === 0) {
        if (state.mode === 'focus') {
            container.innerHTML = `<div class="text-center text-stone-400 dark:text-slate-500 py-12"><i class="fa-solid fa-filter mb-2 text-2xl"></i><p>${texts.btn_draw_focus}...</p></div>`;
        }
        return;
    }

    list.forEach(prob => {
        const status = state.progress[prob.id];
        let borderClass = "border-stone-200 dark:border-slate-700";
        let icon = "";

        if (status === 'mastered') { borderClass = "border-emerald-500 border-l-4"; icon = '<i class="fa-solid fa-check text-emerald-500"></i>'; }
        else if (status === 'practice') { borderClass = "border-amber-500 border-l-4"; }

        let typeBadge = "";
        if (prob.type === 'poly') typeBadge = "Polynom";
        if (prob.type === 'root') typeBadge = "Rot";
        if (prob.type === 'exp') typeBadge = "Eksponential";
        if (prob.type === 'log') typeBadge = "Logaritme";

        let labelsHTML = '';
        if (state.mode === 'mix') {
             // Check if this task is recommended (from a struggling topic)
             const recommended = isRecommended(prob);
             if (recommended) {
                 labelsHTML = `<span class="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-1 rounded font-bold"><i class="fa-solid fa-star mr-1"></i>${texts.label_recommended}</span>`;
             } else {
                 labelsHTML = `<span class="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 px-2 py-1 rounded">${texts.label_mix}</span>`;
             }
        } else {
            labelsHTML = `
                <span class="bg-stone-100 dark:bg-slate-700 text-stone-500 dark:text-slate-400 px-2 py-1 rounded">Nivå ${prob.level}</span>
                <span class="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-2 py-1 rounded">${typeBadge}</span>
            `;
        }

        const div = document.createElement('div');
        div.className = `bg-white dark:bg-slate-800 rounded-lg border shadow-sm p-6 ${borderClass}`;
        div.innerHTML = `
            <div class="flex justify-between mb-4">
                <div class="flex gap-2 text-[10px] font-bold uppercase tracking-wide">
                    ${labelsHTML}
                </div>
                ${icon}
            </div>
            <div class="text-xl font-serif text-center mb-6 text-stone-800 dark:text-slate-200">$$${prob.q}$$</div>
            <div class="flex justify-center gap-3">
                <button onclick="window.app.toggleHint(${prob.id})" id="btn-hint-${prob.id}" class="text-stone-500 dark:text-slate-400 text-sm hover:text-amber-600 dark:hover:text-amber-400 border border-stone-200 dark:border-slate-600 px-3 py-1.5 rounded bg-white dark:bg-slate-700"><i class="fa-regular fa-lightbulb mr-1"></i> ${texts.btn_hint}</button>
                <button onclick="window.app.toggleSolution(${prob.id})" id="btn-sol-${prob.id}" class="text-white text-sm font-bold bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 px-3 py-1.5 rounded shadow-sm"><i class="fa-regular fa-eye mr-1"></i> ${texts.btn_solution}</button>
            </div>
            <div id="hint-${prob.id}" class="hidden mt-4 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 p-3 rounded text-sm border border-amber-100 dark:border-amber-800 flex gap-2">
                <i class="fa-solid fa-info-circle mt-0.5"></i> <div><span class="font-bold block text-xs uppercase mb-1">${texts.hint_title}</span>${prob.hint}</div>
            </div>
            <div id="sol-${prob.id}" class="hidden mt-6 pt-6 border-t border-stone-100 dark:border-slate-700 bg-stone-50/30 dark:bg-slate-900/30 -mx-6 px-6">
                <div class="text-center text-lg font-serif text-stone-800 dark:text-slate-200 mb-2">${prob.a}</div>
                <div class="text-sm text-stone-500 dark:text-slate-400 text-center mb-4">${prob.steps}</div>
                <div class="flex justify-center gap-2 pb-2">
                    <button onclick="window.app.rateProblem(${prob.id}, 'practice')" class="px-3 py-1 text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-900/50 rounded">${texts.btn_practice}</button>
                    <button onclick="window.app.rateProblem(${prob.id}, 'mastered')" class="px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/30 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 rounded">${texts.btn_mastered}</button>
                </div>
            </div>
        `;
        container.appendChild(div);
    });

    const footer = document.createElement('div');
    footer.className = "mt-12 text-center border-t border-stone-200 dark:border-slate-700 pt-8";
    const btnText = state.mode === 'mix' ? texts.btn_new_mix : texts.btn_new_focus;
    const descText = state.mode === 'mix' ? texts.mix_end_text : texts.focus_end_text;
    const action = state.mode === 'mix' ? 'window.app.startMixMode()' : 'window.app.applyFiltersAndDraw()';

    footer.innerHTML = `
        <p class="text-stone-500 dark:text-slate-400 mb-4 text-sm">${descText}</p>
        <button onclick="${action}" class="bg-stone-800 dark:bg-slate-700 text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-black dark:hover:bg-slate-600 transition-transform hover:scale-105">
            <i class="fa-solid fa-rotate mr-2"></i> ${btnText}
        </button>
    `;
    container.appendChild(footer);

    if (window.MathJax) MathJax.typeset();
}

/**
 * Toggles hint visibility for a problem
 * @param {number} id - The problem ID
 */
export function toggleHint(id) {
    const el = document.getElementById(`hint-${id}`);
    if (el.classList.contains('hidden')) {
        el.classList.remove('hidden');
        if (!state.hints.includes(id)) {
            state.hints.push(id);
            saveHints();
        }
    } else {
        el.classList.add('hidden');
    }
}

/**
 * Toggles solution visibility for a problem
 * @param {number} id - The problem ID
 */
export function toggleSolution(id) {
    const el = document.getElementById(`sol-${id}`);
    el.classList.toggle('hidden');
    if (!el.classList.contains('hidden') && window.MathJax) MathJax.typeset();
}

/**
 * Updates the marked problems badge count in the sidebar
 */
export function updateMarkedBadge() {
    const markedCount = Object.values(state.progress).filter(status => status === 'practice').length;
    const badge = document.getElementById('marked-count-badge');

    if (markedCount > 0) {
        badge.textContent = markedCount;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }

    // Also update mobile badge
    updateMobileMarkedBadge();
}

/**
 * Rates a problem as mastered or needs practice
 * @param {number} id - The problem ID
 * @param {string} status - 'mastered' or 'practice'
 */
export function rateProblem(id, status) {
    state.progress[id] = status;
    saveProgress();
    updateMarkedBadge();

    const problem = problemBank.find(p => p.id === id);
    if (!problem) {
        renderProblems();
        return;
    }

    // Update level statistics
    const key = `${problem.topic}-${problem.level}`;
    if (!state.levelProgress[key]) {
        state.levelProgress[key] = { mastered: 0, total: 0 };
    }
    state.levelProgress[key].total++;
    if (status === 'mastered') {
        state.levelProgress[key].mastered++;
    }
    saveLevelProgress();

    // Update ceiling if level is mastered
    if (status === 'mastered') {
        const masteryRate = getLevelMasteryRate(problem.topic, problem.level);
        const currentCeiling = state.topicCeilings[problem.topic];

        // Requirements to increase ceiling:
        // - At least 3 problems attempted on this level
        // - At least 70% mastery rate
        // - Level is >= current ceiling
        if (state.levelProgress[key].total >= 3 &&
            masteryRate >= 0.7 &&
            problem.level >= currentCeiling) {

            state.topicCeilings[problem.topic] = Math.min(problem.level + 1, 5);
            saveCeilings();
        }
    }

    renderProblems();
}

/**
 * Renders the marked problems view
 */
export function renderMarkedProblems() {
    const container = document.getElementById('marked-problems-container');
    const texts = i18n[state.language];

    // Find all problems marked as 'practice'
    const markedIds = Object.entries(state.progress)
        .filter(([id, status]) => status === 'practice')
        .map(([id]) => parseInt(id));

    const markedProblems = problemBank.filter(p => markedIds.includes(p.id));

    // Update badge in nav
    updateMarkedBadge();

    // Empty state
    if (markedProblems.length === 0) {
        container.innerHTML = `
            <div class="text-center py-16">
                <i class="fa-solid fa-circle-check text-5xl text-emerald-400 mb-4"></i>
                <h3 class="text-lg font-semibold text-stone-700 dark:text-slate-200 mb-2">${texts.marked_empty_title}</h3>
                <p class="text-stone-500 dark:text-slate-400">${texts.marked_empty_desc}</p>
            </div>
        `;
        return;
    }

    // Group by rule
    const grouped = {
        chain: markedProblems.filter(p => p.topic === 'chain'),
        product: markedProblems.filter(p => p.topic === 'product'),
        quotient: markedProblems.filter(p => p.topic === 'quotient')
    };

    let html = '';

    for (const [topic, problems] of Object.entries(grouped)) {
        if (problems.length === 0) continue;

        const topicName = texts[`topic_${topic}`];

        html += `
            <div class="bg-white dark:bg-slate-800 rounded-xl border border-stone-200 dark:border-slate-700 shadow-sm overflow-hidden">
                <div class="bg-amber-50 dark:bg-amber-900/20 px-4 py-3 border-b border-amber-100 dark:border-amber-800">
                    <h3 class="font-bold text-amber-800 dark:text-amber-200">
                        <i class="fa-solid fa-bookmark mr-2"></i>${topicName}
                        <span class="text-amber-600 dark:text-amber-400 font-normal">(${problems.length})</span>
                    </h3>
                </div>
                <div class="divide-y divide-stone-100 dark:divide-slate-700">
        `;

        problems.forEach(prob => {
            html += `
                <div class="p-4 hover:bg-stone-50 dark:hover:bg-slate-700/50 transition-colors">
                    <div class="flex justify-between items-start gap-4">
                        <div class="flex-1">
                            <div class="flex gap-2 text-xs mb-2">
                                <span class="bg-stone-100 dark:bg-slate-700 text-stone-500 dark:text-slate-400 px-2 py-0.5 rounded">Nivå ${prob.level}</span>
                            </div>
                            <div class="text-lg font-serif text-stone-800 dark:text-slate-200">$${prob.q}$</div>
                        </div>
                        <div class="flex gap-2">
                            <button onclick="window.app.toggleMarkedSolution(${prob.id})"
                                    class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                                <i class="fa-regular fa-eye mr-1"></i>${texts.btn_solution}
                            </button>
                            <button onclick="window.app.unmarkProblem(${prob.id})"
                                    class="text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300">
                                <i class="fa-solid fa-check mr-1"></i>${texts.btn_mastered}
                            </button>
                        </div>
                    </div>
                    <div id="marked-sol-${prob.id}" class="hidden mt-4 pt-4 border-t border-stone-100 dark:border-slate-700">
                        <div class="text-center text-lg font-serif text-stone-800 dark:text-slate-200 mb-2">${prob.a}</div>
                        <details class="text-sm text-stone-500 dark:text-slate-400">
                            <summary class="cursor-pointer hover:text-stone-700 dark:hover:text-slate-300">Vis utregning</summary>
                            <div class="mt-2 pl-4 border-l-2 border-stone-200 dark:border-slate-600">${prob.steps}</div>
                        </details>
                    </div>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;
    }

    container.innerHTML = html;
    if (window.MathJax) MathJax.typeset();
}

/**
 * Toggles solution visibility in marked problems view
 * @param {number} id - The problem ID
 */
export function toggleMarkedSolution(id) {
    const el = document.getElementById(`marked-sol-${id}`);
    el.classList.toggle('hidden');
    if (!el.classList.contains('hidden') && window.MathJax) {
        MathJax.typeset();
    }
}

/**
 * Marks a problem as mastered from the marked view
 * @param {number} id - The problem ID
 */
export function unmarkProblem(id) {
    state.progress[id] = 'mastered';
    saveProgress();
    renderMarkedProblems();
}

/**
 * Prints the marked problems
 */
export function printMarkedProblems() {
    window.print();
}

/**
 * Clears all user progress
 */
export function clearProgress() {
    const texts = i18n[state.language];
    if (confirm(texts.clear_confirm)) {
        clearAllProgress();

        // Update all views
        updateChartData();
        renderProblems();

        // Show success message
        alert(i18n[state.language].progress_cleared);
    }
}

/**
 * Sets the current language
 * @param {string} lang - Language code ('no', 'en', 'es', 'uk')
 */
export function setLanguage(lang) {
    state.language = lang;
    localStorage.setItem('mathTrainerLang', lang);
    updateLanguageUI();
    updateCurrentLanguageFlag();
    updateLanguageDropdownState();
    navigateTo(state.currentView);
}

/**
 * Updates all UI elements with current language
 */
export function updateLanguageUI() {
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (i18n[state.language][key]) {
            el.textContent = i18n[state.language][key];
        }
    });

    const selTopic = document.getElementById('theory-topic-select');
    if (selTopic) {
        Array.from(selTopic.options).forEach(opt => {
            const key = opt.getAttribute('data-key');
            if (i18n[state.language][key]) opt.textContent = i18n[state.language][key];
        });
    }

    const selRule = document.getElementById('focus-rule-select');
    if (selRule) {
        Array.from(selRule.options).forEach(opt => {
            const key = opt.getAttribute('data-key');
            if (i18n[state.language][key]) opt.textContent = i18n[state.language][key];
        });
    }

    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.id === `btn-${state.language}`) {
            btn.className = "lang-btn px-3 py-1 text-sm font-medium rounded-md transition-all bg-white dark:bg-slate-600 shadow-sm ring-1 ring-black/10 dark:ring-white/10";
        } else {
            btn.className = "lang-btn px-3 py-1 text-sm font-medium rounded-md transition-all text-stone-400 dark:text-slate-400 hover:bg-stone-200 dark:hover:bg-slate-600";
        }
    });

    // Update mobile language display
    updateCurrentLanguageFlag();
    updateLanguageDropdownState();
}

// ========================================
// MOBILE NAVIGATION FUNCTIONS
// ========================================

/**
 * Toggles the mobile navigation drawer
 */
export function toggleMobileNav() {
    const drawer = document.getElementById('mobile-nav-drawer');
    const panel = document.getElementById('mobile-nav-panel');
    const body = document.body;
    const toggle = document.getElementById('mobile-nav-toggle');

    if (!drawer || !panel) return;

    const isOpen = !drawer.classList.contains('hidden');

    if (isOpen) {
        // Close drawer
        drawer.classList.remove('mobile-nav-open');
        setTimeout(() => {
            drawer.classList.add('hidden');
            body.classList.remove('mobile-nav-open');
        }, 300); // Wait for animation
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
    } else {
        // Open drawer
        drawer.classList.remove('hidden');
        // Force reflow to enable transition
        drawer.offsetHeight;
        drawer.classList.add('mobile-nav-open');
        body.classList.add('mobile-nav-open');
        if (toggle) toggle.setAttribute('aria-expanded', 'true');
    }
}

/**
 * Navigates to a view and closes mobile drawer
 * @param {string} viewId - The view identifier
 */
export function navigateToFromMobile(viewId) {
    toggleMobileNav();
    navigateTo(viewId);
    updateMobileNavState(viewId);
}

/**
 * Updates mobile navigation active state
 * @param {string} viewId - The currently active view
 */
export function updateMobileNavState(viewId) {
    document.querySelectorAll('.mobile-nav-item').forEach(el => {
        const targetView = el.id.replace('mobile-nav-', '');
        if (targetView === viewId) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
}

/**
 * Updates mobile marked badge count
 */
export function updateMobileMarkedBadge() {
    const markedCount = Object.values(state.progress).filter(status => status === 'practice').length;

    // Update mobile drawer badge
    const drawerBadge = document.getElementById('mobile-marked-count-badge');
    if (drawerBadge) {
        if (markedCount > 0) {
            drawerBadge.textContent = markedCount;
            drawerBadge.classList.remove('hidden');
        } else {
            drawerBadge.classList.add('hidden');
        }
    }

    // Update hamburger menu badge
    const hamburgerBadge = document.getElementById('hamburger-badge');
    if (hamburgerBadge) {
        if (markedCount > 0) {
            hamburgerBadge.textContent = markedCount;
            hamburgerBadge.classList.remove('hidden');
        } else {
            hamburgerBadge.classList.add('hidden');
        }
    }
}

// ========================================
// LANGUAGE DROPDOWN FUNCTIONS
// ========================================

/**
 * Language flag map
 */
const LANGUAGE_FLAGS = {
    'no': '🇳🇴',
    'en': '🇬🇧',
    'es': '🇪🇸',
    'uk': '🇺🇦'
};

/**
 * Toggles the language dropdown menu
 */
export function toggleLanguageDropdown() {
    const dropdown = document.getElementById('lang-dropdown');
    const button = document.getElementById('current-lang-btn');

    if (!dropdown || !button) return;

    const isOpen = dropdown.classList.contains('lang-dropdown-show');

    if (isOpen) {
        dropdown.classList.remove('lang-dropdown-show');
        dropdown.classList.add('hidden');
        button.setAttribute('aria-expanded', 'false');
        document.removeEventListener('click', closeLanguageDropdownOutside);
    } else {
        dropdown.classList.remove('hidden');
        dropdown.classList.add('lang-dropdown-show');
        button.setAttribute('aria-expanded', 'true');

        // Close on outside click (delayed to avoid immediate trigger)
        setTimeout(() => {
            document.addEventListener('click', closeLanguageDropdownOutside);
        }, 10);
    }
}

/**
 * Closes language dropdown when clicking outside
 * @param {Event} event - Click event
 */
function closeLanguageDropdownOutside(event) {
    const dropdown = document.getElementById('lang-dropdown');
    const button = document.getElementById('current-lang-btn');

    if (!dropdown || !button) return;

    if (!dropdown.contains(event.target) && !button.contains(event.target)) {
        toggleLanguageDropdown();
    }
}

/**
 * Selects a language from the dropdown menu
 * @param {string} lang - Language code
 */
export function selectLanguageFromDropdown(lang) {
    // Close dropdown
    const dropdown = document.getElementById('lang-dropdown');
    const button = document.getElementById('current-lang-btn');
    if (dropdown && button) {
        dropdown.classList.remove('lang-dropdown-show');
        dropdown.classList.add('hidden');
        button.setAttribute('aria-expanded', 'false');
        document.removeEventListener('click', closeLanguageDropdownOutside);
    }

    // Update language
    setLanguage(lang);
    updateCurrentLanguageFlag();
    updateLanguageDropdownState();
}

/**
 * Updates the current language flag in mobile view
 */
export function updateCurrentLanguageFlag() {
    const flagEl = document.getElementById('current-lang-flag');
    if (flagEl) {
        flagEl.textContent = LANGUAGE_FLAGS[state.language] || '🇳🇴';
    }
}

/**
 * Updates the active state in language dropdown
 */
export function updateLanguageDropdownState() {
    document.querySelectorAll('.lang-dropdown-item').forEach(item => {
        const onclick = item.getAttribute('onclick');
        const lang = onclick?.match(/'(\w+)'/)?.[1];

        if (lang === state.language) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// ========================================
// KEYBOARD NAVIGATION
// ========================================

/**
 * Handles keyboard navigation
 * @param {KeyboardEvent} event - Keyboard event
 */
export function handleKeyboardNav(event) {
    if (event.key === 'Escape') {
        // Close mobile nav if open
        const drawer = document.getElementById('mobile-nav-drawer');
        if (drawer && !drawer.classList.contains('hidden')) {
            toggleMobileNav();
        }

        // Close language dropdown if open
        const langDropdown = document.getElementById('lang-dropdown');
        if (langDropdown && langDropdown.classList.contains('lang-dropdown-show')) {
            toggleLanguageDropdown();
        }
    }
}
