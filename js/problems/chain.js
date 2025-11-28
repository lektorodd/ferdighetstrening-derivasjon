/**
 * Chain rule problem generators
 * @module problems/chain
 */

import { fmt, fmtNum, fmtPow, formatFraction, par, randomInt } from '../utils.js';

/**
 * Main chain rule problem generator
 * @param {string} type - Type of chain problem: 'poly', 'root', 'exp', 'log'
 * @param {number} lvl - Difficulty level (1-5)
 * @param {number} a - First parameter
 * @param {number} b - Second parameter
 * @param {number} n - Third parameter
 * @param {function} add - Callback to add problem to collection
 */
export function generateChainProblem(type, lvl, a, b, n, add) {
    // Helper to create aligned environment steps for chain rule
    const makeChainSteps = (gu, u, gpu, up, substitution, final, options = {}) => {
        const { isNested = false, innerExplanation = '' } = options;

        if (isNested) {
            return `$$
\\begin{aligned}
&\\textbf{Steg 1: Identifiser ytre og indre funksjon} \\\\
&\\text{Ytre funksjon: } g(u) = ${gu} \\\\
&\\text{Indre funksjon: } u(x) = ${u} \\\\[0.5em]
&\\textbf{Steg 2: Merk at } u(x) \\textbf{ også er sammensatt!} \\\\
&${innerExplanation} \\\\[0.5em]
&\\textbf{Steg 3: Deriver med kjerneregelen (to ganger)} \\\\
&g'(u) = ${gpu} \\\\
&u'(x) = ${up} \\quad \\text{← kjerneregelen brukt her også!} \\\\[0.5em]
&\\textbf{Steg 4: Sett sammen} \\\\
&f'(x) = g'(u) \\cdot u'(x) \\\\
&= ${substitution} \\\\
&= ${final}
\\end{aligned}
$$`;
        }

        // Standard format for simple chain rule
        return `$$
\\begin{aligned}
g(u) &= ${gu} & u(x) &= ${u} \\\\
g'(u) &= ${gpu} & u'(x) &= ${up}
\\end{aligned}
$$
$$
\\begin{aligned}
f'(x) &= g'(u) \\cdot u'(x) \\\\
&= ${substitution} \\\\
&= ${final}
\\end{aligned}
$$`;
    };

    if (type === 'poly') {
        generateChainPoly(lvl, a, b, n, add, makeChainSteps, par, randomInt);
    }
    else if (type === 'root') {
        generateChainRoot(lvl, a, b, n, add, makeChainSteps, par, randomInt);
    }
    else if (type === 'exp') {
        generateChainExp(lvl, a, b, n, add, makeChainSteps, par, randomInt);
    }
    else if (type === 'log') {
        generateChainLog(lvl, a, b, n, add, makeChainSteps, par, randomInt);
    }
}

/**
 * Generate polynomial chain rule problems
 * @param {number} lvl - Difficulty level
 * @param {number} a - First parameter
 * @param {number} b - Second parameter
 * @param {number} n - Third parameter
 * @param {function} add - Callback to add problem
 * @param {function} makeChainSteps - Helper to format solution steps
 * @param {function} par - Parenthesis helper
 * @param {function} r - Random integer helper
 */
export function generateChainPoly(lvl, a, b, n, add, makeChainSteps, par, r) {
    const patterns = [];

    // Level 1: Simple linear inside power (ax + b)^n, small n
    if (lvl === 1) {
        patterns.push(() => {
            // (ax + b)^2
            const pow = 2;
            const u_val = `${fmt(a,'x')} ${fmtNum(b)}`;
            const gu = `u^${pow}`;
            const gpu = `${pow}u`;
            const up = `${a}`;
            const subst = `${pow}(${u_val}) \\cdot ${par(a)}`;
            const final = `${pow*a}(${u_val})`;
            return {
                q: `f(x) = (${u_val})^${pow}`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "Enkel potensregel med lineær kjerne."
            };
        });

        patterns.push(() => {
            // (x + a)^3
            const pow = 3;
            const u_val = `x ${fmtNum(a)}`;
            const gu = `u^${pow}`;
            const gpu = `${pow}u^2`;
            const up = `1`;
            const subst = `${pow}(${u_val})^2 \\cdot 1`;
            const final = `${pow}(${u_val})^2`;
            return {
                q: `f(x) = (${u_val})^${pow}`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "Kubisk potens av lineær kjerne."
            };
        });
    }

    // Level 2: Quadratic inside power (x^2 + a)^n
    else if (lvl === 2) {
        patterns.push(() => {
            // (x^2 + a)^2
            const pow = 2;
            const u_val = `x^2 ${fmtNum(a)}`;
            const gu = `u^${pow}`;
            const gpu = `${pow}u`;
            const up = `2x`;
            const subst = `${pow}(${u_val}) \\cdot 2x`;
            const final = `${pow*2}x(${u_val})`;
            return {
                q: `f(x) = (${u_val})^${pow}`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "Kvadratisk kjerne med potens."
            };
        });

        patterns.push(() => {
            // (ax^2 + b)^2
            const pow = 2;
            const u_val = `${fmt(a,'x^2')} ${fmtNum(b)}`;
            const gu = `u^${pow}`;
            const gpu = `${pow}u`;
            const up = `${2*a}x`;
            const subst = `${pow}(${u_val}) \\cdot ${2*a}x`;
            const final = `${pow*2*a}x(${u_val})`;
            return {
                q: `f(x) = (${u_val})^${pow}`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "Kvadratisk kjerne med koeffisient."
            };
        });
    }

    // Level 3: More complex inner function (ax^2 + bx + c)^n
    else if (lvl === 3) {
        patterns.push(() => {
            // (x^2 + ax + b)^2
            const pow = 2;
            const c = r(1, 3) * (Math.random() > 0.5 ? 1 : -1);
            const u_val = `x^2 ${fmtNum(a)}x ${fmtNum(c)}`;
            const gu = `u^${pow}`;
            const gpu = `${pow}u`;
            const up = `2x ${fmtNum(a)}`;
            const subst = `${pow}(${u_val}) \\cdot (${up})`;
            const final = `${pow}(2x ${fmtNum(a)})(${u_val})`;
            return {
                q: `f(x) = (${u_val})^${pow}`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "Trinom som kjerne - husk alle ledd i den deriverte."
            };
        });

        patterns.push(() => {
            // (x^2 + a)^3
            const pow = 3;
            const u_val = `x^2 ${fmtNum(a)}`;
            const gu = `u^${pow}`;
            const gpu = `${pow}u^2`;
            const up = `2x`;
            const subst = `${pow}(${u_val})^2 \\cdot 2x`;
            const final = `${pow*2}x(${u_val})^2`;
            return {
                q: `f(x) = (${u_val})^${pow}`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "Høyere potens av kvadratisk kjerne."
            };
        });
    }

    // Level 4: Nested powers ((x + a)^2)^n
    else if (lvl === 4) {
        patterns.push(() => {
            // ((x + a)^2)^2 = (x + a)^4 but show nested structure
            const inner = `x ${fmtNum(a)}`;
            const u_val = `(${inner})^2`;
            const gu = `u^2`;
            const gpu = `2u`;
            const up = `2(${inner}) \\cdot 1`;
            const subst = `2(${inner})^2 \\cdot 2(${inner})`;
            const final = `4(${inner})^3`;
            return {
                q: `f(x) = ((${inner})^2)^2`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "Dobbel kjerne - bruk kjerneregelen to ganger!"
            };
        });

        patterns.push(() => {
            // (x^3 + a)^2
            const pow = 2;
            const u_val = `x^3 ${fmtNum(a)}`;
            const gu = `u^${pow}`;
            const gpu = `${pow}u`;
            const up = `3x^2`;
            const subst = `${pow}(${u_val}) \\cdot 3x^2`;
            const final = `${pow*3}x^2(${u_val})`;
            return {
                q: `f(x) = (${u_val})^${pow}`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "Kubisk kjerne med potens."
            };
        });
    }

    // Level 5: Very complex - triple nested or high-degree polynomials
    else {
        patterns.push(() => {
            // (x^3 + ax + b)^2
            const pow = 2;
            const c = r(1, 3);
            const u_val = `x^3 ${fmtNum(a)}x ${fmtNum(c)}`;
            const gu = `u^${pow}`;
            const gpu = `${pow}u`;
            const up = `3x^2 ${fmtNum(a)}`;
            const subst = `${pow}(${u_val}) \\cdot (${up})`;
            const final = `${pow}(3x^2 ${fmtNum(a)})(${u_val})`;
            return {
                q: `f(x) = (${u_val})^${pow}`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "Komplekst polynom som kjerne - pass på alle ledd."
            };
        });

        patterns.push(() => {
            // ((x^2 + a)^2)^2 - triple nesting!
            const inner = `x^2 ${fmtNum(a)}`;
            const middle = `(${inner})^2`;
            const u_val = middle;
            const gu = `u^2`;
            const gpu = `2u`;
            const middleDeriv = `2(${inner}) \\cdot 2x`;
            const up = middleDeriv;
            const subst = `2${middle} \\cdot ${middleDeriv}`;
            const final = `8x(${inner})${middle}`;
            return {
                q: `f(x) = (${middle})^2`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "Trippel kjerne! Kjerneregelen må brukes flere ganger."
            };
        });
    }

    const pattern = patterns[r(0, patterns.length - 1)];
    const prob = pattern();
    add('chain', lvl, 'poly', prob.q, prob.a, prob.steps, prob.hint);
}

/**
 * Generate root chain rule problems
 * @param {number} lvl - Difficulty level
 * @param {number} a - First parameter
 * @param {number} b - Second parameter
 * @param {number} n - Third parameter
 * @param {function} add - Callback to add problem
 * @param {function} makeChainSteps - Helper to format solution steps
 * @param {function} par - Parenthesis helper
 * @param {function} r - Random integer helper
 */
export function generateChainRoot(lvl, a, b, n, add, makeChainSteps, par, r) {
    const patterns = [];

    // Level 1: Simple √(ax + b)
    if (lvl === 1) {
        patterns.push(() => {
            // √(x + a)
            const u_val = `x ${fmtNum(a)}`;
            const gu = `\\sqrt{u}`;
            const gpu = `\\frac{1}{2\\sqrt{u}}`;
            const up = `1`;
            const subst = `\\frac{1}{2\\sqrt{${u_val}}} \\cdot 1`;
            const final = `\\frac{1}{2\\sqrt{${u_val}}}`;
            return {
                q: `f(x) = \\sqrt{${u_val}}`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "Enkel kvadratrot med lineær kjerne."
            };
        });

        patterns.push(() => {
            // √(ax + b)
            const u_val = `${fmt(a,'x')} ${fmtNum(b)}`;
            const gu = `\\sqrt{u}`;
            const gpu = `\\frac{1}{2\\sqrt{u}}`;
            const up = `${a}`;
            const subst = `\\frac{1}{2\\sqrt{${u_val}}} \\cdot ${par(a)}`;
            const final = `\\frac{${a}}{2\\sqrt{${u_val}}}`;
            return {
                q: `f(x) = \\sqrt{${u_val}}`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "Kvadratrot med lineær kjerne og koeffisient."
            };
        });
    }

    // Level 2: √(x^2 + a)
    else if (lvl === 2) {
        patterns.push(() => {
            // √(x^2 + a)
            const u_val = `x^2 ${fmtNum(a)}`;
            const gu = `\\sqrt{u}`;
            const gpu = `\\frac{1}{2\\sqrt{u}}`;
            const up = `2x`;
            const subst = `\\frac{1}{2\\sqrt{${u_val}}} \\cdot 2x`;
            const final = `\\frac{x}{\\sqrt{${u_val}}}`;
            return {
                q: `f(x) = \\sqrt{${u_val}}`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "Kvadratrot av kvadratisk uttrykk."
            };
        });

        patterns.push(() => {
            // √(ax^2 + b)
            const u_val = `${fmt(a,'x^2')} ${fmtNum(b)}`;
            const gu = `\\sqrt{u}`;
            const gpu = `\\frac{1}{2\\sqrt{u}}`;
            const up = `${2*a}x`;
            const subst = `\\frac{1}{2\\sqrt{${u_val}}} \\cdot ${2*a}x`;
            const final = `\\frac{${a}x}{\\sqrt{${u_val}}}`;
            return {
                q: `f(x) = \\sqrt{${u_val}}`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "Kvadratrot med kvadratisk kjerne og koeffisient."
            };
        });
    }

    // Level 3: Cube root or fractional powers
    else if (lvl === 3) {
        patterns.push(() => {
            // ∛(ax + b) = (ax + b)^(1/3)
            const u_val = `${fmt(a,'x')} ${fmtNum(b)}`;
            const gu = `\\sqrt[3]{u}`;
            const gpu = `\\frac{1}{3\\sqrt[3]{u^2}}`;
            const up = `${a}`;
            const subst = `\\frac{1}{3\\sqrt[3]{(${u_val})^2}} \\cdot ${par(a)}`;
            const final = `\\frac{${a}}{3\\sqrt[3]{(${u_val})^2}}`;
            return {
                q: `f(x) = \\sqrt[3]{${u_val}}`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "Kubikkrot - husk formelen for (u^(1/3))'."
            };
        });

        patterns.push(() => {
            // √(x^2 + ax + b)
            const c = r(1, 3);
            const u_val = `x^2 ${fmtNum(a)}x ${fmtNum(c)}`;
            const gu = `\\sqrt{u}`;
            const gpu = `\\frac{1}{2\\sqrt{u}}`;
            const up = `2x ${fmtNum(a)}`;
            const subst = `\\frac{1}{2\\sqrt{${u_val}}} \\cdot (${up})`;
            const final = `\\frac{2x ${fmtNum(a)}}{2\\sqrt{${u_val}}}`;
            return {
                q: `f(x) = \\sqrt{${u_val}}`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "Trinom under rot - pass på alle ledd."
            };
        });
    }

    // Level 4: √(x^3 + a) or higher complexity
    else if (lvl === 4) {
        patterns.push(() => {
            // √(x^3 + a)
            const u_val = `x^3 ${fmtNum(a)}`;
            const gu = `\\sqrt{u}`;
            const gpu = `\\frac{1}{2\\sqrt{u}}`;
            const up = `3x^2`;
            const subst = `\\frac{1}{2\\sqrt{${u_val}}} \\cdot 3x^2`;
            const final = `\\frac{3x^2}{2\\sqrt{${u_val}}}`;
            return {
                q: `f(x) = \\sqrt{${u_val}}`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "Kubisk uttrykk under rot."
            };
        });

        patterns.push(() => {
            // ∛(x^2 + a)
            const u_val = `x^2 ${fmtNum(a)}`;
            const gu = `\\sqrt[3]{u}`;
            const gpu = `\\frac{1}{3\\sqrt[3]{u^2}}`;
            const up = `2x`;
            const subst = `\\frac{1}{3\\sqrt[3]{(${u_val})^2}} \\cdot 2x`;
            const final = `\\frac{2x}{3\\sqrt[3]{(${u_val})^2}}`;
            return {
                q: `f(x) = \\sqrt[3]{${u_val}}`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "Kubikkrot av kvadratisk uttrykk."
            };
        });
    }

    // Level 5: Nested roots or complex fractional powers
    else {
        patterns.push(() => {
            // √(√(x + a)) = (x + a)^(1/4)
            const inner = `x ${fmtNum(a)}`;
            const u_val = `\\sqrt{${inner}}`;
            const gu = `\\sqrt{u}`;
            const gpu = `\\frac{1}{2\\sqrt{u}}`;
            const up = `\\frac{1}{2\\sqrt{${inner}}}`;
            const subst = `\\frac{1}{2\\sqrt{\\sqrt{${inner}}}} \\cdot \\frac{1}{2\\sqrt{${inner}}}`;
            const final = `\\frac{1}{4\\sqrt{${inner}}\\sqrt{\\sqrt{${inner}}}}`;
            return {
                q: `f(x) = \\sqrt{\\sqrt{${inner}}}`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "Dobbel rot - bruk kjerneregelen to ganger!"
            };
        });

        patterns.push(() => {
            // ∛(x^3 + ax)
            const u_val = `x^3 ${fmtNum(a)}x`;
            const gu = `\\sqrt[3]{u}`;
            const gpu = `\\frac{1}{3\\sqrt[3]{u^2}}`;
            const up = `3x^2 ${fmtNum(a)}`;
            const subst = `\\frac{1}{3\\sqrt[3]{(${u_val})^2}} \\cdot (${up})`;
            const final = `\\frac{3x^2 ${fmtNum(a)}}{3\\sqrt[3]{(${u_val})^2}}`;
            return {
                q: `f(x) = \\sqrt[3]{${u_val}}`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "Kubikkrot av komplekst polynom."
            };
        });
    }

    const pattern = patterns[r(0, patterns.length - 1)];
    const prob = pattern();
    add('chain', lvl, 'root', prob.q, prob.a, prob.steps, prob.hint);
}

/**
 * Generate exponential chain rule problems
 * @param {number} lvl - Difficulty level
 * @param {number} a - First parameter
 * @param {number} b - Second parameter
 * @param {number} n - Third parameter
 * @param {function} add - Callback to add problem
 * @param {function} makeChainSteps - Helper to format solution steps
 * @param {function} par - Parenthesis helper
 * @param {function} r - Random integer helper
 */
export function generateChainExp(lvl, a, b, n, add, makeChainSteps, par, r) {
    const patterns = [];

    // Level 1: Simple e^(ax + b)
    if (lvl === 1) {
        patterns.push(() => {
            // e^x or e^(x + a)
            const u_val = `x ${fmtNum(a)}`;
            const gu = `e^u`;
            const gpu = `e^u`;
            const up = `1`;
            const subst = `e^{${u_val}} \\cdot 1`;
            const final = `e^{${u_val}}`;
            return {
                q: `f(x) = e^{${u_val}}`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "Enkel e-potens med lineær kjerne."
            };
        });

        patterns.push(() => {
            // e^(ax + b)
            const u_val = `${fmt(a,'x')} ${fmtNum(b)}`;
            const gu = `e^u`;
            const gpu = `e^u`;
            const up = `${a}`;
            const subst = `e^{${u_val}} \\cdot ${par(a)}`;
            const final = `${a}e^{${u_val}}`;
            return {
                q: `f(x) = e^{${u_val}}`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "e-potens med lineær kjerne og koeffisient."
            };
        });
    }

    // Level 2: e^(x^2 + a)
    else if (lvl === 2) {
        patterns.push(() => {
            // e^(x^2 + a)
            const u_val = `x^2 ${fmtNum(a)}`;
            const gu = `e^u`;
            const gpu = `e^u`;
            const up = `2x`;
            const subst = `e^{${u_val}} \\cdot 2x`;
            const final = `2xe^{${u_val}}`;
            return {
                q: `f(x) = e^{${u_val}}`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "e-potens med kvadratisk kjerne."
            };
        });

        patterns.push(() => {
            // e^(ax^2 + b)
            const u_val = `${fmt(a,'x^2')} ${fmtNum(b)}`;
            const gu = `e^u`;
            const gpu = `e^u`;
            const up = `${2*a}x`;
            const subst = `e^{${u_val}} \\cdot ${2*a}x`;
            const final = `${2*a}xe^{${u_val}}`;
            return {
                q: `f(x) = e^{${u_val}}`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "e-potens med kvadratisk kjerne og koeffisient."
            };
        });
    }

    // Level 3: e^(ax^2 + bx) or trinomial
    else if (lvl === 3) {
        patterns.push(() => {
            // e^(x^2 + ax)
            const u_val = `x^2 ${fmtNum(a)}x`;
            const gu = `e^u`;
            const gpu = `e^u`;
            const up = `2x ${fmtNum(a)}`;
            const subst = `e^{${u_val}} \\cdot (${up})`;
            const final = `(2x ${fmtNum(a)})e^{${u_val}}`;
            return {
                q: `f(x) = e^{${u_val}}`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "e-potens med trinom som kjerne."
            };
        });

        patterns.push(() => {
            // e^(x^2 + ax + b)
            const c = r(1, 3);
            const u_val = `x^2 ${fmtNum(a)}x ${fmtNum(c)}`;
            const gu = `e^u`;
            const gpu = `e^u`;
            const up = `2x ${fmtNum(a)}`;
            const subst = `e^{${u_val}} \\cdot (${up})`;
            const final = `(2x ${fmtNum(a)})e^{${u_val}}`;
            return {
                q: `f(x) = e^{${u_val}}`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "Komplett trinom i eksponenten."
            };
        });
    }

    // Level 4: e^((x + a)^2) or nested
    else if (lvl === 4) {
        patterns.push(() => {
            // e^((x + a)^2)
            const inner = `x ${fmtNum(a)}`;
            const u_val = `(${inner})^2`;
            const gu = `e^u`;
            const gpu = `e^u`;
            const up = `2(${inner}) \\cdot 1`;
            const subst = `e^{(${inner})^2} \\cdot 2(${inner})`;
            const final = `2(${inner})e^{(${inner})^2}`;
            return {
                q: `f(x) = e^{(${inner})^2}`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "Dobbel kjerne - kvadrat i eksponenten."
            };
        });

        patterns.push(() => {
            // e^(x^3 + a)
            const u_val = `x^3 ${fmtNum(a)}`;
            const gu = `e^u`;
            const gpu = `e^u`;
            const up = `3x^2`;
            const subst = `e^{${u_val}} \\cdot 3x^2`;
            const final = `3x^2e^{${u_val}}`;
            return {
                q: `f(x) = e^{${u_val}}`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "Kubisk uttrykk i eksponenten."
            };
        });
    }

    // Level 5: Very complex exponentials
    else {
        patterns.push(() => {
            // e^(x^3 + ax + b)
            const c = r(1, 3);
            const u_val = `x^3 ${fmtNum(a)}x ${fmtNum(c)}`;
            const gu = `e^u`;
            const gpu = `e^u`;
            const up = `3x^2 ${fmtNum(a)}`;
            const subst = `e^{${u_val}} \\cdot (${up})`;
            const final = `(3x^2 ${fmtNum(a)})e^{${u_val}}`;
            return {
                q: `f(x) = e^{${u_val}}`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "Komplekst polynom i eksponenten."
            };
        });

        patterns.push(() => {
            // e^(e^(x + a)) - double exponential!
            const inner = `x ${fmtNum(a)}`;
            const u_val = `e^{${inner}}`;
            const gu = `e^u`;
            const gpu = `e^u`;
            const up = `e^{${inner}} \\cdot 1`;
            const subst = `e^{e^{${inner}}} \\cdot e^{${inner}}`;
            const final = `e^{${inner}}e^{e^{${inner}}}`;
            return {
                q: `f(x) = e^{e^{${inner}}}`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final, {
                    isNested: true,
                    innerExplanation: `u(x) = e^{${inner}} \\text{ har kjernen } ${inner}`
                }),
                hint: "Dobbel eksponential - kjerneregelen brukes TO ganger!"
            };
        });
    }

    const pattern = patterns[r(0, patterns.length - 1)];
    const prob = pattern();
    add('chain', lvl, 'exp', prob.q, prob.a, prob.steps, prob.hint);
}

/**
 * Generate logarithmic chain rule problems
 * @param {number} lvl - Difficulty level
 * @param {number} a - First parameter
 * @param {number} b - Second parameter
 * @param {number} n - Third parameter
 * @param {function} add - Callback to add problem
 * @param {function} makeChainSteps - Helper to format solution steps
 * @param {function} par - Parenthesis helper
 * @param {function} r - Random integer helper
 */
export function generateChainLog(lvl, a, b, n, add, makeChainSteps, par, r) {
    const patterns = [];

    // Level 1: Simple ln(ax + b)
    if (lvl === 1) {
        patterns.push(() => {
            // ln(x + a)
            const u_val = `x ${fmtNum(a)}`;
            const gu = `\\ln u`;
            const gpu = `\\frac{1}{u}`;
            const up = `1`;
            const subst = `\\frac{1}{${u_val}} \\cdot 1`;
            const final = `\\frac{1}{${u_val}}`;
            return {
                q: `f(x) = \\ln(${u_val})`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "Enkel ln med lineær kjerne."
            };
        });

        patterns.push(() => {
            // ln(ax + b)
            const u_val = `${fmt(a,'x')} ${fmtNum(b)}`;
            const gu = `\\ln u`;
            const gpu = `\\frac{1}{u}`;
            const up = `${a}`;
            const subst = `\\frac{1}{${u_val}} \\cdot ${par(a)}`;
            const final = `\\frac{${a}}{${u_val}}`;
            return {
                q: `f(x) = \\ln(${u_val})`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "ln med lineær kjerne og koeffisient."
            };
        });
    }

    // Level 2: ln(x^2 + a)
    else if (lvl === 2) {
        patterns.push(() => {
            // ln(x^2 + a)
            const u_val = `x^2 ${fmtNum(a)}`;
            const gu = `\\ln u`;
            const gpu = `\\frac{1}{u}`;
            const up = `2x`;
            const subst = `\\frac{1}{${u_val}} \\cdot 2x`;
            const final = `\\frac{2x}{${u_val}}`;
            return {
                q: `f(x) = \\ln(${u_val})`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "ln med kvadratisk kjerne."
            };
        });

        patterns.push(() => {
            // ln(ax^2 + b)
            const u_val = `${fmt(a,'x^2')} ${fmtNum(b)}`;
            const gu = `\\ln u`;
            const gpu = `\\frac{1}{u}`;
            const up = `${2*a}x`;
            const subst = `\\frac{1}{${u_val}} \\cdot ${2*a}x`;
            const final = `\\frac{${2*a}x}{${u_val}}`;
            return {
                q: `f(x) = \\ln(${u_val})`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "ln med kvadratisk kjerne og koeffisient."
            };
        });
    }

    // Level 3: ln(ax^2 + bx + c) - trinomial
    else if (lvl === 3) {
        patterns.push(() => {
            // ln(x^2 + ax + b)
            const c = r(1, 3);
            const u_val = `x^2 ${fmtNum(a)}x ${fmtNum(c)}`;
            const gu = `\\ln u`;
            const gpu = `\\frac{1}{u}`;
            const up = `2x ${fmtNum(a)}`;
            const subst = `\\frac{1}{${u_val}} \\cdot (${up})`;
            const final = `\\frac{2x ${fmtNum(a)}}{${u_val}}`;
            return {
                q: `f(x) = \\ln(${u_val})`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "ln av trinom - pass på alle ledd i deriverte."
            };
        });

        patterns.push(() => {
            // ln(x^2 + ax)
            const u_val = `x^2 ${fmtNum(a)}x`;
            const gu = `\\ln u`;
            const gpu = `\\frac{1}{u}`;
            const up = `2x ${fmtNum(a)}`;
            const subst = `\\frac{1}{${u_val}} \\cdot (${up})`;
            const final = `\\frac{2x ${fmtNum(a)}}{${u_val}}`;
            return {
                q: `f(x) = \\ln(${u_val})`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "ln av kvadratisk polynom uten konstantledd."
            };
        });
    }

    // Level 4: ln((x + a)^2) or nested structures
    else if (lvl === 4) {
        patterns.push(() => {
            // ln((x + a)^2)
            const inner = `x ${fmtNum(a)}`;
            const u_val = `(${inner})^2`;
            const gu = `\\ln u`;
            const gpu = `\\frac{1}{u}`;
            const up = `2(${inner}) \\cdot 1`;
            const subst = `\\frac{1}{(${inner})^2} \\cdot 2(${inner})`;
            const final = `\\frac{2}{${inner}}`;
            return {
                q: `f(x) = \\ln((${inner})^2)`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "Dobbel kjerne - kvadrat inne i ln."
            };
        });

        patterns.push(() => {
            // ln(x^3 + a)
            const u_val = `x^3 ${fmtNum(a)}`;
            const gu = `\\ln u`;
            const gpu = `\\frac{1}{u}`;
            const up = `3x^2`;
            const subst = `\\frac{1}{${u_val}} \\cdot 3x^2`;
            const final = `\\frac{3x^2}{${u_val}}`;
            return {
                q: `f(x) = \\ln(${u_val})`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "ln med kubisk kjerne."
            };
        });
    }

    // Level 5: Very complex logarithms
    else {
        patterns.push(() => {
            // ln(x^3 + ax + b)
            const c = r(1, 3);
            const u_val = `x^3 ${fmtNum(a)}x ${fmtNum(c)}`;
            const gu = `\\ln u`;
            const gpu = `\\frac{1}{u}`;
            const up = `3x^2 ${fmtNum(a)}`;
            const subst = `\\frac{1}{${u_val}} \\cdot (${up})`;
            const final = `\\frac{3x^2 ${fmtNum(a)}}{${u_val}}`;
            return {
                q: `f(x) = \\ln(${u_val})`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final),
                hint: "Komplekst polynom inne i ln."
            };
        });

        patterns.push(() => {
            // ln(ln(x + a)) - double logarithm!
            const inner = `x ${fmtNum(a)}`;
            const u_val = `\\ln(${inner})`;
            const gu = `\\ln u`;
            const gpu = `\\frac{1}{u}`;
            const up = `\\frac{1}{${inner}}`;
            const subst = `\\frac{1}{\\ln(${inner})} \\cdot \\frac{1}{${inner}}`;
            const final = `\\frac{1}{(${inner})\\ln(${inner})}`;
            return {
                q: `f(x) = \\ln(\\ln(${inner}))`,
                a: `$$ f'(x) = ${final} $$`,
                steps: makeChainSteps(gu, u_val, gpu, up, subst, final, {
                    isNested: true,
                    innerExplanation: `u(x) = \\ln(${inner}) \\text{ har kjernen } ${inner}`
                }),
                hint: "Dobbel logaritme - kjerneregelen brukes TO ganger!"
            };
        });
    }

    const pattern = patterns[r(0, patterns.length - 1)];
    const prob = pattern();
    add('chain', lvl, 'log', prob.q, prob.a, prob.steps, prob.hint);
}
