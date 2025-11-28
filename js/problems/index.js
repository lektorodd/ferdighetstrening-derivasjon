/**
 * Problem generators index
 * Re-exports all problem generation functions
 * @module problems
 */

import { randomInt } from '../utils.js';

// Import all generators
import { generateProductProblem } from './product.js';
import { generateQuotientProblem } from './quotient.js';
import { generateChainProblem } from './chain.js';

// Re-export for convenience
export { generateProductProblem } from './product.js';
export { generateQuotientProblem } from './quotient.js';
export { generateChainProblem } from './chain.js';

/**
 * Generates a single problem based on rule, level, and type
 * @param {string} rule - 'chain', 'product', or 'quotient'
 * @param {number} lvl - Difficulty level 1-5
 * @param {string} type - 'poly', 'root', 'exp', or 'log'
 * @param {Function} add - Callback to add the problem to the bank
 */
export function generateSingleProblem(rule, lvl, type, add) {
    const a = randomInt(-5, 5) || 2;
    const b = randomInt(-4, 4) || 1;
    const n = randomInt(2, 4);

    if (rule === 'chain') {
        generateChainProblem(type, lvl, a, b, n, add);
    } else if (rule === 'product') {
        generateProductProblem(type, lvl, a, b, n, add);
    } else if (rule === 'quotient') {
        generateQuotientProblem(type, lvl, a, b, n, add);
    }
}

/**
 * Generates the complete problem bank
 * @returns {Array} Array of problem objects
 */
export function generateProblemBank() {
    let id = 1000;
    const types = ['poly', 'root', 'exp', 'log'];
    const rules = ['chain', 'product', 'quotient'];
    const levels = [1, 2, 3, 4, 5];

    const bank = [];
    const seenQuestions = new Set();  // Track unique questions

    const add = (topic, level, type, q, a, steps, hint) => {
        // Check for duplicates before adding
        const key = `${topic}-${level}-${type}-${q}`;
        if (seenQuestions.has(key)) {
            return; // Skip duplicate
        }
        seenQuestions.add(key);
        bank.push({ id: id++, topic, level, type, q, a, steps, hint });
    };

    rules.forEach(rule => {
        levels.forEach(lvl => {
            types.forEach(type => {
                for (let i = 0; i < 20; i++) {
                    generateSingleProblem(rule, lvl, type, add);
                }
            });
        });
    });

    return bank;
}
