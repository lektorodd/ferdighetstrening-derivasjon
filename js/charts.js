/**
 * Chart.js integration for statistics display
 * @module charts
 */

import { state, problemBank } from './state.js';
import { i18n } from './i18n.js';

let chart1, chart2, chart3;

/**
 * Initializes all charts with empty data
 */
export function renderChart() {
    const ctx1 = document.getElementById('masteryChart').getContext('2d');
    chart1 = new Chart(ctx1, { type: 'doughnut', data: { datasets: [{ data: [1], backgroundColor: ['#eee'] }] } });
    const ctx2 = document.getElementById('topicChart').getContext('2d');
    chart2 = new Chart(ctx2, { type: 'bar', data: { datasets: [{ data: [] }] } });
    const ctx3 = document.getElementById('levelChart').getContext('2d');
    chart3 = new Chart(ctx3, { type: 'bar', data: { datasets: [{ data: [] }] } });
}

/**
 * Updates all charts with current progress data
 */
export function updateChartData() {
    let mastered = 0;
    let practice = 0;
    const attemptedIds = [];

    Object.entries(state.progress).forEach(([id, val]) => {
        if (val === 'mastered') mastered++;
        if (val === 'practice') practice++;
        if (val === 'mastered' || val === 'practice') attemptedIds.push(parseInt(id));
    });

    const texts = i18n[state.language];

    // Only show attempted tasks (mastered + practice), not the full 1200 task bank
    chart1.data.labels = [texts.chart_mastered, texts.chart_practice];
    chart1.data.datasets[0].data = [mastered, practice];
    chart1.data.datasets[0].backgroundColor = ['#10b981', '#f59e0b'];
    chart1.update();

    const topics = ['chain', 'product', 'quotient'];
    const topicMastery = [0, 0, 0];
    const topicPractice = [0, 0, 0];

    const levelMastery = [0, 0, 0, 0, 0];
    const levelPractice = [0, 0, 0, 0, 0];

    problemBank.forEach(p => {
        const status = state.progress[p.id];
        const idx = topics.indexOf(p.topic);
        if (idx !== -1 && (status === 'mastered' || status === 'practice')) {
            if (status === 'mastered') topicMastery[idx]++;
            if (status === 'practice') topicPractice[idx]++;
        }
        if (p.level >= 1 && p.level <= 5 && (status === 'mastered' || status === 'practice')) {
            if (status === 'mastered') levelMastery[p.level - 1]++;
            if (status === 'practice') levelPractice[p.level - 1]++;
        }
    });

    chart2.data.labels = [texts.topic_chain, texts.topic_product, texts.topic_quotient];
    chart2.data.datasets[0].label = texts.chart_mastered;
    chart2.data.datasets[0].backgroundColor = '#10b981';
    chart2.data.datasets[0].data = topicMastery;
    if (chart2.data.datasets.length < 2) {
        chart2.data.datasets.push({ label: texts.chart_practice, backgroundColor: '#f59e0b', data: topicPractice });
    } else {
        chart2.data.datasets[1].label = texts.chart_practice;
        chart2.data.datasets[1].data = topicPractice;
    }
    chart2.update();

    chart3.data.labels = ['Lvl 1', 'Lvl 2', 'Lvl 3', 'Lvl 4', 'Lvl 5'];
    chart3.data.datasets[0].label = texts.chart_mastered;
    chart3.data.datasets[0].backgroundColor = '#10b981';
    chart3.data.datasets[0].data = levelMastery;
    if (chart3.data.datasets.length < 2) {
        chart3.data.datasets.push({ label: texts.chart_practice, backgroundColor: '#f59e0b', data: levelPractice });
    } else {
        chart3.data.datasets[1].label = texts.chart_practice;
        chart3.data.datasets[1].data = levelPractice;
    }
    chart3.update();

    const totalAttempted = mastered + practice;
    const relevantHints = state.hints.filter(hid => attemptedIds.includes(parseInt(hid))).length;
    const hintRate = totalAttempted > 0 ? Math.round((relevantHints / totalAttempted) * 100) : 0;
    const masteryRate = totalAttempted > 0 ? Math.round((mastered / totalAttempted) * 100) : 0;

    document.getElementById('stat-total-display').textContent = totalAttempted;
    document.getElementById('stat-mastery-display').textContent = masteryRate + '%';
    document.getElementById('stat-hint-display').textContent = hintRate + '%';
}
