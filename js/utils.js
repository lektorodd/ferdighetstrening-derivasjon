/**
 * Utility functions for Ferdighetstrening Derivasjon
 * @module utils
 */

/**
 * Safely retrieves and parses a value from localStorage
 * @param {string} key - The localStorage key
 * @param {*} defaultValue - Default value if key doesn't exist or parsing fails
 * @returns {*} The parsed value or default
 */
export function safeGetLocalStorage(key, defaultValue) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        console.warn(`Failed to parse localStorage key "${key}":`, e);
        return defaultValue;
    }
}

/**
 * Formats a coefficient with variable name for LaTeX
 * @param {number} coeff - The coefficient
 * @param {string} varName - The variable name (e.g., 'x', 'x^2')
 * @param {boolean} [isFirst=true] - Whether this is the first term
 * @returns {string} Formatted LaTeX string
 */
export function fmt(coeff, varName, isFirst = true) {
    if (coeff === 0) return "";
    let str = "";
    if (!isFirst && coeff > 0) str += "+";
    if (coeff === 1) str += varName;
    else if (coeff === -1) str += "-" + varName;
    else str += coeff + varName;
    return str;
}

/**
 * Formats a number with sign for LaTeX
 * @param {number} num - The number to format
 * @param {boolean} [isFirst=false] - Whether this is the first term
 * @returns {string} Formatted string with appropriate sign
 */
export function fmtNum(num, isFirst = false) {
    if (num === 0) return "";
    if (num > 0 && !isFirst) return "+" + num;
    return "" + num;
}

/**
 * Formats an exponent for LaTeX
 * @param {number} n - The exponent
 * @returns {string} Empty string if n=1, otherwise "^n"
 */
export function fmtPow(n) {
    return n === 1 ? "" : `^${n}`;
}

/**
 * Formats a fraction with smart simplification
 * @param {string|number} num - Numerator
 * @param {string} denom - Denominator
 * @param {number} [coeff=1] - Coefficient to multiply in
 * @returns {string} LaTeX-formatted fraction
 */
export function formatFraction(num, denom, coeff = 1) {
    // If numerator is 1 and we have a coefficient, multiply in
    if ((num === 1 || num === '1') && coeff !== 1) {
        return `\\frac{${coeff}}{${denom}}`;
    }

    // If both numerator and coefficient are numbers, multiply them
    if (typeof num === 'number' && typeof coeff === 'number' && coeff !== 1) {
        return `\\frac{${num * coeff}}{${denom}}`;
    }

    // Otherwise, show multiplication explicitly if coeff != 1
    if (coeff !== 1) {
        return `\\frac{${coeff} \\cdot ${num}}{${denom}}`;
    }

    return `\\frac{${num}}{${denom}}`;
}

/**
 * Wraps a value in parentheses if negative
 * @param {number} val - The value to check
 * @returns {string} The value, wrapped in parentheses if negative
 */
export function par(val) {
    return val < 0 ? `(${val})` : String(val);
}

/**
 * Generates a random integer between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random integer
 */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
