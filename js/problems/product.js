/**
 * Product rule problem generators
 * @module problems/product
 */

import { fmt, fmtNum, fmtPow, formatFraction, par, randomInt } from '../utils.js';

/**
 * Main function to generate product rule problems
 * @param {string} type - Type of product problem ('poly', 'root', 'exp', 'log')
 * @param {number} lvl - Difficulty level (1-5)
 * @param {number} a - Parameter a
 * @param {number} b - Parameter b
 * @param {number} n - Parameter n
 * @param {Function} add - Callback to add problem to the system
 */
export function generateProductProblem(type, lvl, a, b, n, add) {
    // Helper to create aligned environment steps
    const makeAlignedSteps = (u, v, up, vp, steps) => {
        return `$$
\\begin{aligned}
u &= ${u} & v &= ${v} \\\\
u' &= ${up} & v' &= ${vp}
\\end{aligned}
$$
$$
\\begin{aligned}
${steps}
\\end{aligned}
$$`;
    };

    if (type === 'poly') {
        generateProductPoly(lvl, a, b, n, add, makeAlignedSteps, par, randomInt);
    }
    else if (type === 'root') {
        generateProductRoot(lvl, a, b, n, add, makeAlignedSteps, par, randomInt);
    }
    else if (type === 'exp') {
        generateProductExp(lvl, a, b, n, add, makeAlignedSteps, par, randomInt);
    }
    else if (type === 'log') {
        generateProductLog(lvl, a, b, n, add, makeAlignedSteps, par, randomInt);
    }
}

/**
 * Generate polynomial product rule problems
 */
export function generateProductPoly(lvl, a, b, n, add, makeAlignedSteps, par, r) {
    const patterns = [];

    // Level 1: Easy basics
    if (lvl === 1) {
        patterns.push(() => {
            // x · (x + a) - simple linear times linear
            const v = `x ${fmtNum(a)}`;
            const raw = `1 \\cdot (${v}) + x \\cdot 1`;
            const simp = `2x ${fmtNum(a)}`;
            const ans = `f'(x) = ${simp}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw} \\\\
&= ${simp}`;
            return {
                q: `f(x) = x(${v})`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`x`, v, `1`, `1`, steps),
                hint: "To lineære faktorer - enkel produktregel."
            };
        });

        patterns.push(() => {
            // (x + a)(x + b) - binomial product
            const c = r(1, 3) * (Math.random() > 0.5 ? 1 : -1);
            const u = `x ${fmtNum(a)}`;
            const v = `x ${fmtNum(c)}`;
            const raw = `1 \\cdot (${v}) + (${u}) \\cdot 1`;
            const simp = `2x ${fmtNum(a + c)}`;
            const ans = `f'(x) = ${simp}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw} \\\\
&= ${simp}`;
            return {
                q: `f(x) = (${u})(${v})`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(u, v, `1`, `1`, steps),
                hint: "Produktet av to binomer."
            };
        });
    }

    // Level 2: Quadratic terms
    else if (lvl === 2) {
        patterns.push(() => {
            // x² · (ax + b) - quadratic times linear
            const v = `${fmt(a,'x')} ${fmtNum(b)}`;
            const raw = `2x(${v}) + x^2 \\cdot ${a}`;
            const expanded = `${2*a}x^2 ${fmtNum(2*b, true)}x + ${a}x^2`;
            const simp = `${3*a}x^2 ${fmtNum(2*b, true)}x`;
            const factored = `x(${3*a}x ${fmtNum(2*b)})`;
            const ans = `f'(x) = ${factored}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw} \\\\
&= ${simp} \\\\
&= ${factored}`;
            return {
                q: `f(x) = x^2(${v})`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`x^2`, v, `2x`, `${a}`, steps),
                hint: "Kvadratisk ganger lineær - faktoriser resultatet."
            };
        });

        patterns.push(() => {
            // x · (x² + a) - linear times quadratic
            const v = `x^2 ${fmtNum(a)}`;
            const raw = `1 \\cdot (${v}) + x \\cdot 2x`;
            const simp = `3x^2 ${fmtNum(a)}`;
            const ans = `f'(x) = ${simp}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw} \\\\
&= ${simp}`;
            return {
                q: `f(x) = x(${v})`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`x`, v, `1`, `2x`, steps),
                hint: "Lineær ganger kvadratisk."
            };
        });
    }

    // Level 3: Chain rule integration
    else if (lvl === 3) {
        patterns.push(() => {
            // x · (ax + b)² - linear times squared binomial
            const inner = `${fmt(a,'x')} ${fmtNum(b)}`;
            const v = `(${inner})^2`;
            const vp = `2(${inner}) \\cdot ${a}`;
            const raw = `1 \\cdot ${v} + x \\cdot ${vp}`;
            const ans = `f'(x) = ${v} + x \\cdot ${vp}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw}`;
            return {
                q: `f(x) = x(${inner})^2`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`x`, v, `1`, vp, steps),
                hint: "Bruk kjerneregelen på den kvadrerte faktoren."
            };
        });

        patterns.push(() => {
            // x² · (x² + a) - quadratic times quadratic
            const v = `x^2 ${fmtNum(a)}`;
            const raw = `2x(${v}) + x^2 \\cdot 2x`;
            const expanded = `2x^3 ${fmtNum(2*a, true)}x + 2x^3`;
            const simp = `4x^3 ${fmtNum(2*a, true)}x`;
            const factored = `2x(2x^2 ${fmtNum(a)})`;
            const ans = `f'(x) = ${factored}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw} \\\\
&= ${simp} \\\\
&= ${factored}`;
            return {
                q: `f(x) = x^2(${v})`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`x^2`, v, `2x`, `2x`, steps),
                hint: "To kvadratiske faktorer."
            };
        });
    }

    // Level 4: Advanced - complex polynomials
    else if (lvl === 4) {
        patterns.push(() => {
            // (x² + a) · (x² + b) - quadratic times quadratic
            const c = r(1, 3) * (Math.random() > 0.5 ? 1 : -1);
            const u = `x^2 ${fmtNum(a)}`;
            const v = `x^2 ${fmtNum(c)}`;
            const raw = `2x(${v}) + (${u}) \\cdot 2x`;
            const expanded = `2x^3 ${fmtNum(2*c, true)}x + 2x^3 ${fmtNum(2*a, true)}x`;
            const simp = `4x^3 ${fmtNum(2*(a + c), true)}x`;
            const factored = `2x(2x^2 ${fmtNum(a + c)})`;
            const ans = `f'(x) = ${factored}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw} \\\\
&= ${simp} \\\\
&= ${factored}`;
            return {
                q: `f(x) = (${u})(${v})`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(u, v, `2x`, `2x`, steps),
                hint: "Produktet av to kvadratiske uttrykk."
            };
        });

        patterns.push(() => {
            // x³ · (x² + a) - cubic times quadratic
            const v = `x^2 ${fmtNum(a)}`;
            const raw = `3x^2(${v}) + x^3 \\cdot 2x`;
            const expanded = `3x^4 ${fmtNum(3*a, true)}x^2 + 2x^4`;
            const simp = `5x^4 ${fmtNum(3*a, true)}x^2`;
            const factored = `x^2(5x^2 ${fmtNum(3*a)})`;
            const ans = `f'(x) = ${factored}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw} \\\\
&= ${simp} \\\\
&= ${factored}`;
            return {
                q: `f(x) = x^3(${v})`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`x^3`, v, `3x^2`, `2x`, steps),
                hint: "Kubisk ganger kvadratisk - høyere grads polynom."
            };
        });
    }

    // Level 5: Expert - very challenging
    else {
        patterns.push(() => {
            // (x² + a)² · (x + b) - squared quadratic times linear
            const c = r(1, 2);
            const inner = `x^2 ${fmtNum(a)}`;
            const u = `(${inner})^2`;
            const up = `2(${inner}) \\cdot 2x`;
            const v = `x ${fmtNum(c)}`;
            const raw = `${up}(${v}) + ${u} \\cdot 1`;
            const ans = `f'(x) = ${up}(${v}) + ${u}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw}`;
            return {
                q: `f(x) = (${inner})^2(${v})`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(u, v, up, `1`, steps),
                hint: "Kvadrert kvadratisk uttrykk - dobbel kjerneregel."
            };
        });

        patterns.push(() => {
            // (x² + a) · (x² + b) · (x + c) - triple product!
            const c = r(1, 2);
            const d = r(1, 2) * (Math.random() > 0.5 ? 1 : -1);
            const u1 = `x^2 ${fmtNum(a)}`;
            const u2 = `x^2 ${fmtNum(c)}`;
            const u3 = `x ${fmtNum(d)}`;
            const ans = `f'(x) = 2x(${u2})(${u3}) + (${u1}) \\cdot 2x(${u3}) + (${u1})(${u2}) \\cdot 1`;
            const steps = `f'(x) &= u'vw + uv'w + uvw' \\\\
&= ${ans}`;
            return {
                q: `f(x) = (${u1})(${u2})(${u3})`,
                a: `$$ ${ans} $$`,
                steps: `$$
\\begin{aligned}
u &= ${u1} & v &= ${u2} & w &= ${u3} \\\\
u' &= 2x & v' &= 2x & w' &= 1
\\end{aligned}
$$
$$
\\begin{aligned}
${steps}
\\end{aligned}
$$`,
                hint: "Trippel-produkt! Bruk formelen: (uvw)' = u'vw + uv'w + uvw'"
            };
        });
    }

    const pattern = patterns[r(0, patterns.length - 1)];
    const prob = pattern();
    add('product', lvl, 'poly', prob.q, prob.a, prob.steps, prob.hint);
}

/**
 * Generate root (square root) product rule problems
 */
export function generateProductRoot(lvl, a, b, n, add, makeAlignedSteps, par, r) {
    const patterns = [];

    // Level 1: Easy basics
    if (lvl === 1) {
        patterns.push(() => {
            // x · √x - simple product
            const raw = `1 \\cdot \\sqrt{x} + x \\cdot \\frac{1}{2\\sqrt{x}}`;
            const combined = `\\frac{2\\sqrt{x} + x}{2\\sqrt{x}}`;
            const simp = `\\frac{3x}{2\\sqrt{x}}`;
            const final = `\\frac{3\\sqrt{x}}{2}`;
            const ans = `f'(x) = ${final}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw} \\\\
&= ${combined} \\\\
&= ${simp} \\\\
&= ${final}`;
            return {
                q: `f(x) = x\\sqrt{x}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`x`, `\\sqrt{x}`, `1`, `\\frac{1}{2\\sqrt{x}}`, steps),
                hint: "x ganger kvadratrot x - kan også skrives som x^{3/2}."
            };
        });

        patterns.push(() => {
            // (x + a) · √x - linear times root
            const u = `x ${fmtNum(a)}`;
            const raw = `1 \\cdot \\sqrt{x} + (${u}) \\cdot \\frac{1}{2\\sqrt{x}}`;
            const combined = `\\frac{2x + (${u})}{2\\sqrt{x}}`;
            const simp = `\\frac{3x ${fmtNum(a)}}{2\\sqrt{x}}`;
            const ans = `f'(x) = ${simp}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw} \\\\
&= ${combined} \\\\
&= ${simp}`;
            return {
                q: `f(x) = (${u})\\sqrt{x}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(u, `\\sqrt{x}`, `1`, `\\frac{1}{2\\sqrt{x}}`, steps),
                hint: "Lineært uttrykk ganger kvadratrot - fellesnevner."
            };
        });
    }

    // Level 2: More complex
    else if (lvl === 2) {
        patterns.push(() => {
            // x² · √x - quadratic times root
            const raw = `2x \\cdot \\sqrt{x} + x^2 \\cdot \\frac{1}{2\\sqrt{x}}`;
            const combined = `\\frac{4x\\sqrt{x} + x^2}{2\\sqrt{x}}`;
            const simp = `\\frac{4x^{3/2} + x^2}{2\\sqrt{x}}`;
            const ans = `f'(x) = \\frac{5x^2}{2\\sqrt{x}}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw} \\\\
&= ${combined}`;
            return {
                q: `f(x) = x^2\\sqrt{x}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`x^2`, `\\sqrt{x}`, `2x`, `\\frac{1}{2\\sqrt{x}}`, steps),
                hint: "x² ganger √x = x^{5/2}."
            };
        });

        patterns.push(() => {
            // x · √(ax + b) - linear times root with chain
            const inner = `${fmt(a,'x')} ${fmtNum(b)}`;
            const v = `\\sqrt{${inner}}`;
            const vp = `\\frac{${a}}{2\\sqrt{${inner}}}`;
            const raw = `1 \\cdot ${v} + x \\cdot ${vp}`;
            const simplified = `${v} + \\frac{${a}x}{2\\sqrt{${inner}}}`;
            const ans = `f'(x) = ${simplified}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw} \\\\
&= ${simplified}`;
            return {
                q: `f(x) = x\\sqrt{${inner}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`x`, v, `1`, vp, steps),
                hint: "Kjerneregel på kvadratroten."
            };
        });
    }

    // Level 3: Chain rules
    else if (lvl === 3) {
        patterns.push(() => {
            // x · √(ax + b) with more complex chain
            const inner = `${fmt(a,'x')} ${fmtNum(b)}`;
            const v = `\\sqrt{${inner}}`;
            const vp = `\\frac{${a}}{2\\sqrt{${inner}}}`;
            const raw = `1 \\cdot ${v} + x \\cdot ${vp}`;
            const ans = `f'(x) = ${v} + \\frac{${a}x}{2\\sqrt{${inner}}}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw} \\\\
&= ${ans}`;
            return {
                q: `f(x) = x\\sqrt{${inner}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`x`, v, `1`, vp, steps),
                hint: "Kombiner produktregel og kjerneregel."
            };
        });

        patterns.push(() => {
            // (ax + b) · √(cx + d) - both need chain rule
            const c = r(1, 2);
            const d = r(1, 3) * (Math.random() > 0.5 ? 1 : -1);
            const u = `${fmt(a,'x')} ${fmtNum(b)}`;
            const v = `\\sqrt{${fmt(c,'x')} ${fmtNum(d)}}`;
            const vp = `\\frac{${c}}{2\\sqrt{${fmt(c,'x')} ${fmtNum(d)}}}`;
            const raw = `${a} \\cdot ${v} + (${u}) \\cdot ${vp}`;
            const ans = `f'(x) = ${raw}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw}`;
            return {
                q: `f(x) = (${u})${v}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(u, v, `${a}`, vp, steps),
                hint: "Begge faktorer krever kjerneregel."
            };
        });
    }

    // Level 4: Advanced
    else if (lvl === 4) {
        patterns.push(() => {
            // (x² + a) · √(bx + c) - quadratic times root with chain
            const c = r(1, 2);
            const d = r(1, 3);
            const u = `x^2 ${fmtNum(a)}`;
            const v = `\\sqrt{${fmt(c,'x')} ${fmtNum(d)}}`;
            const vp = `\\frac{${c}}{2\\sqrt{${fmt(c,'x')} ${fmtNum(d)}}}`;
            const raw = `2x \\cdot ${v} + (${u}) \\cdot ${vp}`;
            const ans = `f'(x) = ${raw}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw}`;
            return {
                q: `f(x) = (${u})${v}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(u, v, `2x`, vp, steps),
                hint: "Kvadratisk uttrykk ganger rot med kjerneregel."
            };
        });

        patterns.push(() => {
            // √(ax + b) · √(cx + d) - product of two roots
            const c = r(1, 2);
            const d = r(1, 3) * (Math.random() > 0.5 ? 1 : -1);
            const u = `\\sqrt{${fmt(a,'x')} ${fmtNum(b)}}`;
            const v = `\\sqrt{${fmt(c,'x')} ${fmtNum(d)}}`;
            const up = `\\frac{${a}}{2\\sqrt{${fmt(a,'x')} ${fmtNum(b)}}}`;
            const vp = `\\frac{${c}}{2\\sqrt{${fmt(c,'x')} ${fmtNum(d)}}}`;
            const raw = `${up} \\cdot ${v} + ${u} \\cdot ${vp}`;
            const ans = `f'(x) = ${raw}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw}`;
            return {
                q: `f(x) = ${u} \\cdot ${v}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(u, v, up, vp, steps),
                hint: "To røtter med kjerneregel på begge."
            };
        });
    }

    // Level 5: Expert
    else {
        patterns.push(() => {
            // (x² + a) · √(x³ + bx + c) - quadratic times cubic root
            const c = r(1, 2);
            const d = r(1, 3);
            const u = `x^2 ${fmtNum(a)}`;
            const v = `\\sqrt{x^3 ${fmtNum(c, true)}x ${fmtNum(d)}}`;
            const vp = `\\frac{3x^2 ${fmtNum(c)}}{2\\sqrt{x^3 ${fmtNum(c, true)}x ${fmtNum(d)}}}`;
            const raw = `2x \\cdot ${v} + (${u}) \\cdot ${vp}`;
            const ans = `f'(x) = ${raw}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw}`;
            return {
                q: `f(x) = (${u})${v}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(u, v, `2x`, vp, steps),
                hint: "Avansert - rot av kubisk polynom."
            };
        });

        patterns.push(() => {
            // √(ax² + b) · √(cx² + d) - product of quadratic roots
            const c = r(1, 2);
            const d = r(1, 3);
            const u = `\\sqrt{${fmt(a,'x^2')} ${fmtNum(b)}}`;
            const v = `\\sqrt{${fmt(c,'x^2')} ${fmtNum(d)}}`;
            const up = `\\frac{${2*a}x}{2\\sqrt{${fmt(a,'x^2')} ${fmtNum(b)}}}`;
            const vp = `\\frac{${2*c}x}{2\\sqrt{${fmt(c,'x^2')} ${fmtNum(d)}}}`;
            const raw = `${up} \\cdot ${v} + ${u} \\cdot ${vp}`;
            const ans = `f'(x) = ${raw}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw}`;
            return {
                q: `f(x) = ${u} \\cdot ${v}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(u, v, up, vp, steps),
                hint: "To kvadratiske røtter - kompleks kjerneregel."
            };
        });
    }

    const pattern = patterns[r(0, patterns.length - 1)];
    const prob = pattern();
    add('product', lvl, 'root', prob.q, prob.a, prob.steps, prob.hint);
}

/**
 * Generate exponential product rule problems
 */
export function generateProductExp(lvl, a, b, n, add, makeAlignedSteps, par, r) {
    const patterns = [];

    // Level 1: Easy basics
    if (lvl === 1) {
        patterns.push(() => {
            // x · e^x - simple product
            const raw = `1 \\cdot e^x + x \\cdot e^x`;
            const factored = `e^x(1 + x)`;
            const ans = `f'(x) = ${factored}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw} \\\\
&= ${factored}`;
            return {
                q: `f(x) = xe^x`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`x`, `e^x`, `1`, `e^x`, steps),
                hint: "Klassisk eksempel - faktoriser med e^x."
            };
        });

        patterns.push(() => {
            // (x + a) · e^x - linear times exponential
            const u = `x ${fmtNum(a)}`;
            const raw = `1 \\cdot e^x + (${u}) \\cdot e^x`;
            const factored = `e^x(1 + ${u})`;
            const simp = `e^x(x ${fmtNum(a + 1)})`;
            const ans = `f'(x) = ${simp}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw} \\\\
&= ${factored} \\\\
&= ${simp}`;
            return {
                q: `f(x) = (${u})e^x`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(u, `e^x`, `1`, `e^x`, steps),
                hint: "Lineært uttrykk ganger e^x."
            };
        });
    }

    // Level 2: Chain rules
    else if (lvl === 2) {
        patterns.push(() => {
            // x² · e^x - quadratic times exponential
            const raw = `2x \\cdot e^x + x^2 \\cdot e^x`;
            const factored = `e^x(2x + x^2)`;
            const simp = `xe^x(2 + x)`;
            const ans = `f'(x) = ${simp}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw} \\\\
&= ${factored} \\\\
&= ${simp}`;
            return {
                q: `f(x) = x^2e^x`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`x^2`, `e^x`, `2x`, `e^x`, steps),
                hint: "x² ganger e^x - faktoriser."
            };
        });

        patterns.push(() => {
            // x · e^(ax) - linear times exponential with chain
            const raw = `1 \\cdot e^{${a}x} + x \\cdot ${a}e^{${a}x}`;
            const factored = `e^{${a}x}(1 + ${a}x)`;
            const ans = `f'(x) = ${factored}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw} \\\\
&= ${factored}`;
            return {
                q: `f(x) = xe^{${a}x}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`x`, `e^{${a}x}`, `1`, `${a}e^{${a}x}`, steps),
                hint: "Kjerneregel på eksponenten."
            };
        });
    }

    // Level 3: More complex
    else if (lvl === 3) {
        patterns.push(() => {
            // x² · e^(ax) - quadratic times exponential with chain
            const raw = `2x \\cdot e^{${a}x} + x^2 \\cdot ${a}e^{${a}x}`;
            const factored = `xe^{${a}x}(2 + ${a}x)`;
            const ans = `f'(x) = ${factored}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw} \\\\
&= ${factored}`;
            return {
                q: `f(x) = x^2e^{${a}x}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`x^2`, `e^{${a}x}`, `2x`, `${a}e^{${a}x}`, steps),
                hint: "Kvadratisk ganger eksponential med kjerneregel."
            };
        });

        patterns.push(() => {
            // (ax + b) · e^(cx) - both need chain rule
            const c = r(1, 2);
            const u = `${fmt(a,'x')} ${fmtNum(b)}`;
            const v = `e^{${c}x}`;
            const raw = `${a} \\cdot ${v} + (${u}) \\cdot ${c}${v}`;
            const factored = `${v}(${a} + ${c}(${u}))`;
            const ans = `f'(x) = ${factored}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw} \\\\
&= ${factored}`;
            return {
                q: `f(x) = (${u})${v}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(u, v, `${a}`, `${c}${v}`, steps),
                hint: "Kjerneregel på begge faktorer."
            };
        });
    }

    // Level 4: Advanced
    else if (lvl === 4) {
        patterns.push(() => {
            // (x² + a) · e^(bx) - quadratic times exponential with chain
            const c = r(1, 2);
            const u = `x^2 ${fmtNum(a)}`;
            const v = `e^{${c}x}`;
            const raw = `2x \\cdot ${v} + (${u}) \\cdot ${c}${v}`;
            const factored = `${v}(2x + ${c}(${u}))`;
            const ans = `f'(x) = ${factored}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw} \\\\
&= ${factored}`;
            return {
                q: `f(x) = (${u})${v}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(u, v, `2x`, `${c}${v}`, steps),
                hint: "Kvadratisk uttrykk ganger eksponential."
            };
        });

        patterns.push(() => {
            // x · e^(ax²) - VERY challenging: exponential of quadratic
            const inner = `${a}x^2`;
            const v = `e^{${inner}}`;
            const vp = `${2*a}x \\cdot e^{${inner}}`;
            const raw = `1 \\cdot ${v} + x \\cdot ${vp}`;
            const factored = `${v}(1 + ${2*a}x^2)`;
            const ans = `f'(x) = ${factored}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw} \\\\
&= ${factored}`;
            return {
                q: `f(x) = xe^{${inner}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`x`, v, `1`, vp, steps),
                hint: "Vanskelig! Eksponent er kvadratisk."
            };
        });
    }

    // Level 5: Expert
    else {
        patterns.push(() => {
            // e^(ax) · e^(bx) · x - triple product with exponentials
            const c = r(1, 2);
            const u = `e^{${a}x}`;
            const v = `e^{${c}x}`;
            const w = `x`;
            const ans = `f'(x) = ${a}${u} \\cdot ${v} \\cdot ${w} + ${u} \\cdot ${c}${v} \\cdot ${w} + ${u} \\cdot ${v} \\cdot 1`;
            const steps = `f'(x) &= u'vw + uv'w + uvw' \\\\
&= ${ans}`;
            return {
                q: `f(x) = ${u} \\cdot ${v} \\cdot ${w}`,
                a: `$$ ${ans} $$`,
                steps: `$$
\\begin{aligned}
u &= ${u} & v &= ${v} & w &= ${w} \\\\
u' &= ${a}${u} & v' &= ${c}${v} & w' &= 1
\\end{aligned}
$$
$$
\\begin{aligned}
${steps}
\\end{aligned}
$$`,
                hint: "Trippel-produkt! Bruk formelen: (uvw)' = u'vw + uv'w + uvw'"
            };
        });

        patterns.push(() => {
            // (x² + a) · (x + b) · e^(cx) - triple product
            const c = r(1, 2);
            const d = r(1, 2) * (Math.random() > 0.5 ? 1 : -1);
            const u = `x^2 ${fmtNum(a)}`;
            const v = `x ${fmtNum(d)}`;
            const w = `e^{${c}x}`;
            const ans = `f'(x) = 2x(${v})(${w}) + (${u}) \\cdot 1 \\cdot ${w} + (${u})(${v}) \\cdot ${c}${w}`;
            const steps = `f'(x) &= u'vw + uv'w + uvw' \\\\
&= ${ans}`;
            return {
                q: `f(x) = (${u})(${v})${w}`,
                a: `$$ ${ans} $$`,
                steps: `$$
\\begin{aligned}
u &= ${u} & v &= ${v} & w &= ${w} \\\\
u' &= 2x & v' &= 1 & w' &= ${c}${w}
\\end{aligned}
$$
$$
\\begin{aligned}
${steps}
\\end{aligned}
$$`,
                hint: "Trippel-produkt! Bruk formelen: (uvw)' = u'vw + uv'w + uvw'"
            };
        });
    }

    const pattern = patterns[r(0, patterns.length - 1)];
    const prob = pattern();
    add('product', lvl, 'exp', prob.q, prob.a, prob.steps, prob.hint);
}

/**
 * Generate logarithm product rule problems
 */
export function generateProductLog(lvl, a, b, n, add, makeAlignedSteps, par, r) {
    const patterns = [];

    // Level 1: Easy basics
    if (lvl === 1) {
        patterns.push(() => {
            // x · ln(x) - simple product
            const raw = `1 \\cdot \\ln x + x \\cdot \\frac{1}{x}`;
            const simp = `\\ln x + 1`;
            const ans = `f'(x) = ${simp}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw} \\\\
&= ${simp}`;
            return {
                q: `f(x) = x\\ln x`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`x`, `\\ln x`, `1`, `\\frac{1}{x}`, steps),
                hint: "Klassisk eksempel - x/x = 1."
            };
        });

        patterns.push(() => {
            // (x + a) · ln(x) - linear times logarithm
            const u = `x ${fmtNum(a)}`;
            const raw = `1 \\cdot \\ln x + (${u}) \\cdot \\frac{1}{x}`;
            const simp = `\\ln x + \\frac{${u}}{x}`;
            const ans = `f'(x) = ${simp}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw} \\\\
&= ${simp}`;
            return {
                q: `f(x) = (${u})\\ln x`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(u, `\\ln x`, `1`, `\\frac{1}{x}`, steps),
                hint: "Lineært uttrykk ganger logaritme."
            };
        });
    }

    // Level 2: Quadratic
    else if (lvl === 2) {
        patterns.push(() => {
            // x² · ln(x) - quadratic times logarithm
            const raw = `2x \\cdot \\ln x + x^2 \\cdot \\frac{1}{x}`;
            const simp = `2x\\ln x + x`;
            const factored = `x(2\\ln x + 1)`;
            const ans = `f'(x) = ${factored}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw} \\\\
&= ${simp} \\\\
&= ${factored}`;
            return {
                q: `f(x) = x^2\\ln x`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`x^2`, `\\ln x`, `2x`, `\\frac{1}{x}`, steps),
                hint: "x² ganger ln(x) - faktoriser."
            };
        });

        patterns.push(() => {
            // x · ln(ax + b) - linear times logarithm with chain
            const inner = `${fmt(a,'x')} ${fmtNum(b)}`;
            const v = `\\ln(${inner})`;
            const vp = `\\frac{${a}}{${inner}}`;
            const raw = `1 \\cdot ${v} + x \\cdot ${vp}`;
            const simplified = `${v} + \\frac{${a}x}{${inner}}`;
            const ans = `f'(x) = ${simplified}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw} \\\\
&= ${simplified}`;
            return {
                q: `f(x) = x\\ln(${inner})`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`x`, v, `1`, vp, steps),
                hint: "Kjerneregel på logaritmen."
            };
        });
    }

    // Level 3: Chain rules
    else if (lvl === 3) {
        patterns.push(() => {
            // x · ln(ax + b) more complex
            const inner = `${fmt(a,'x')} ${fmtNum(b)}`;
            const v = `\\ln(${inner})`;
            const vp = `\\frac{${a}}{${inner}}`;
            const raw = `1 \\cdot ${v} + x \\cdot ${vp}`;
            const ans = `f'(x) = \\ln(${inner}) + \\frac{${a}x}{${inner}}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw} \\\\
&= ${ans}`;
            return {
                q: `f(x) = x\\ln(${inner})`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`x`, v, `1`, vp, steps),
                hint: "Produktregel og kjerneregel kombinert."
            };
        });

        patterns.push(() => {
            // x² · ln(ax + b) - quadratic times log with chain
            const inner = `${fmt(a,'x')} ${fmtNum(b)}`;
            const v = `\\ln(${inner})`;
            const vp = `\\frac{${a}}{${inner}}`;
            const raw = `2x \\cdot ${v} + x^2 \\cdot ${vp}`;
            const ans = `f'(x) = ${raw}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw}`;
            return {
                q: `f(x) = x^2\\ln(${inner})`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`x^2`, v, `2x`, vp, steps),
                hint: "Kvadratisk ganger logaritme med kjerneregel."
            };
        });
    }

    // Level 4: Advanced
    else if (lvl === 4) {
        patterns.push(() => {
            // (x² + a) · ln(bx + c) - quadratic times log with chain
            const c = r(1, 2);
            const d = r(1, 3);
            const u = `x^2 ${fmtNum(a)}`;
            const inner = `${fmt(c,'x')} ${fmtNum(d)}`;
            const v = `\\ln(${inner})`;
            const vp = `\\frac{${c}}{${inner}}`;
            const raw = `2x \\cdot ${v} + (${u}) \\cdot ${vp}`;
            const ans = `f'(x) = ${raw}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw}`;
            return {
                q: `f(x) = (${u})\\ln(${inner})`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(u, v, `2x`, vp, steps),
                hint: "Kvadratisk uttrykk ganger logaritme."
            };
        });

        patterns.push(() => {
            // x · ln(x² + a) - linear times log of quadratic
            const inner = `x^2 ${fmtNum(a)}`;
            const v = `\\ln(${inner})`;
            const vp = `\\frac{2x}{${inner}}`;
            const raw = `1 \\cdot ${v} + x \\cdot ${vp}`;
            const ans = `f'(x) = ${v} + \\frac{2x^2}{${inner}}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw} \\\\
&= ${ans}`;
            return {
                q: `f(x) = x\\ln(${inner})`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`x`, v, `1`, vp, steps),
                hint: "Logaritme av kvadratisk uttrykk - kjerneregel."
            };
        });
    }

    // Level 5: Expert
    else {
        patterns.push(() => {
            // (x² + a) · ln(bx² + c) - quadratic times log of quadratic
            const c = r(1, 2);
            const d = r(1, 3);
            const u = `x^2 ${fmtNum(a)}`;
            const inner = `${fmt(c,'x^2')} ${fmtNum(d)}`;
            const v = `\\ln(${inner})`;
            const vp = `\\frac{${2*c}x}{${inner}}`;
            const raw = `2x \\cdot ${v} + (${u}) \\cdot ${vp}`;
            const ans = `f'(x) = ${raw}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw}`;
            return {
                q: `f(x) = (${u})\\ln(${inner})`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(u, v, `2x`, vp, steps),
                hint: "Avansert - logaritme av kvadratisk uttrykk."
            };
        });

        patterns.push(() => {
            // ln(ax + b) · ln(cx + d) - product of two logarithms!
            const c = r(1, 2);
            const d = r(1, 3) * (Math.random() > 0.5 ? 1 : -1);
            const inner1 = `${fmt(a,'x')} ${fmtNum(b)}`;
            const inner2 = `${fmt(c,'x')} ${fmtNum(d)}`;
            const u = `\\ln(${inner1})`;
            const v = `\\ln(${inner2})`;
            const up = `\\frac{${a}}{${inner1}}`;
            const vp = `\\frac{${c}}{${inner2}}`;
            const raw = `${up} \\cdot ${v} + ${u} \\cdot ${vp}`;
            const ans = `f'(x) = ${raw}`;
            const steps = `f'(x) &= u'v + uv' \\\\
&= ${raw}`;
            return {
                q: `f(x) = ${u} \\cdot ${v}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(u, v, up, vp, steps),
                hint: "Ekstremt avansert - produkt av to logaritmer!"
            };
        });
    }

    const pattern = patterns[r(0, patterns.length - 1)];
    const prob = pattern();
    add('product', lvl, 'log', prob.q, prob.a, prob.steps, prob.hint);
}
