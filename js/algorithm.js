/**
 * Smart mix algorithm and problem weighting
 * @module algorithm
 */

import { state, problemBank, saveRecentlyShown } from './state.js';

/**
 * Gets statistics for a specific topic
 * @param {string} topic - 'chain', 'product', or 'quotient'
 * @returns {Object} Statistics object with mastered, practice, total, attempted
 */
export function getTopicStats(topic) {
    let mastered = 0;
    let practice = 0;
    let total = 0;

    problemBank.forEach(p => {
        if (p.topic === topic) {
            total++;
            const status = state.progress[p.id];
            if (status === 'mastered') mastered++;
            if (status === 'practice') practice++;
        }
    });

    return { mastered, practice, total, attempted: mastered + practice };
}

/**
 * Gets mastery level for a topic (0-1 scale)
 * @param {string} topic - The topic to check
 * @returns {number} Mastery level between 0 and 1
 */
export function getTopicMasteryLevel(topic) {
    const stats = getTopicStats(topic);
    if (stats.attempted === 0) return 0;
    return stats.mastered / stats.attempted;
}

/**
 * Identifies topics where user is struggling
 * @returns {Array} Array of struggling topic names
 */
export function getStrugglingTopics() {
    const topics = ['chain', 'product', 'quotient'];
    const struggling = [];

    topics.forEach(topic => {
        const stats = getTopicStats(topic);
        // A topic is "struggling" if:
        // - User has attempted at least 3 tasks AND
        // - More than 30% are marked as 'practice' OR mastery rate < 60%
        if (stats.attempted >= 3) {
            const practiceRate = stats.practice / stats.attempted;
            const masteryRate = stats.mastered / stats.attempted;
            if (practiceRate > 0.3 || masteryRate < 0.6) {
                struggling.push(topic);
            }
        }
    });

    return struggling;
}

/**
 * Checks if a problem is from a struggling topic
 * @param {Object} problem - The problem to check
 * @returns {boolean} True if recommended
 */
export function isRecommended(problem) {
    const strugglingTopics = getStrugglingTopics();
    return strugglingTopics.includes(problem.topic);
}

/**
 * Gets preferred difficulty level for a topic
 * @param {string} topic - The topic
 * @returns {number} Preferred difficulty level 1-3
 */
export function getPreferredDifficultyForTopic(topic) {
    const stats = getTopicStats(topic);
    if (stats.attempted < 3) return 1; // Start easy for new topics

    const masteryRate = stats.mastered / stats.attempted;

    // If mastery is high (>70%), prefer higher difficulty
    if (masteryRate > 0.7) return 3;
    // If mastery is medium (40-70%), prefer medium difficulty
    if (masteryRate > 0.4) return 2;
    // If struggling (<40%), prefer lower difficulty
    return 1;
}

/**
 * Calculates weight for a problem in smart mix mode
 * @param {Object} problem - The problem to weight
 * @returns {number} Weight value (higher = more likely to be selected)
 */
export function getProblemWeight(problem) {
    const status = state.progress[problem.id];
    let weight = 1;

    // Exclude mastered tasks from smart mix (they don't need practice)
    if (status === 'mastered') {
        return 0;
    }

    // BOOST tasks marked as "needs practice" - this is the point of smart mix!
    if (status === 'practice') {
        weight *= 5;
    }

    // Reduce weight for recently shown tasks (but don't eliminate them if they need practice)
    if (state.recentlyShown.includes(problem.id)) {
        weight *= 0.2;
    }

    // Boost weight for recommended tasks from struggling topics
    if (isRecommended(problem)) {
        weight *= 3; // Higher boost to make recommended tasks more prominent
    }

    // Progressive difficulty based on ceiling
    const ceiling = state.topicCeilings[problem.topic] || 1;

    if (problem.level < ceiling - 1) {
        // More than 1 level below ceiling: strong reduction (already mastered)
        weight *= 0.1;
    } else if (problem.level < ceiling) {
        // Right below ceiling: some reduction (repetition/consolidation)
        weight *= 0.4;
    } else if (problem.level === ceiling) {
        // At ceiling: normal weight with boost (current focus)
        weight *= 1.2;
    } else if (problem.level === ceiling + 1) {
        // One above ceiling: high weight (progression/challenge)
        weight *= 2.0;
    } else {
        // Far above ceiling: moderate weight (occasional challenge)
        weight *= 0.8;
    }

    return weight;
}

/**
 * Updates the active problem set for smart mix mode
 */
export function updateProblemSet() {
    if (state.mode === 'mix') {
        // Calculate weights for all problems
        let weighted = problemBank.map(p => ({ ...p, weight: getProblemWeight(p) }));

        // Filter out zero-weight problems
        weighted = weighted.filter(p => p.weight > 0);

        // Stable sort by weight (descending), then shuffle within weight groups
        weighted.sort((a, b) => b.weight - a.weight);

        // Add randomness by assigning random values within weight tiers
        weighted = weighted.map(p => ({ ...p, randomValue: Math.random() * p.weight }));
        weighted.sort((a, b) => b.randomValue - a.randomValue);

        // Select top 5 problems, ensuring no duplicates by question text
        let selected = [];
        let seenQuestions = new Set();
        let index = 0;

        while (selected.length < 5 && index < weighted.length) {
            const problem = weighted[index];
            // Only add if we haven't seen this exact question before
            if (!seenQuestions.has(problem.q)) {
                selected.push(problem);
                seenQuestions.add(problem.q);
            }
            index++;
        }

        // Sort selected by difficulty level (ascending)
        selected.sort((a, b) => a.level - b.level);

        // Update active problems
        state.activeProblems = selected;

        // Track recently shown tasks (keep last 20 tasks in history)
        const newIds = selected.map(p => p.id);
        state.recentlyShown = [...newIds, ...state.recentlyShown].slice(0, 20);
        saveRecentlyShown();
    }
}

/**
 * Gets mastery rate for a specific level within a topic
 * @param {string} topic - The topic
 * @param {number} level - The difficulty level
 * @returns {number} Mastery rate between 0 and 1
 */
export function getLevelMasteryRate(topic, level) {
    const key = `${topic}-${level}`;
    const data = state.levelProgress[key];
    if (!data || data.total === 0) return 0;
    return data.mastered / data.total;
}
