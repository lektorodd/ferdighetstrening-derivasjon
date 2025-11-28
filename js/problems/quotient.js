/**
 * Quotient rule problem generators
 * @module problems/quotient
 */

import { fmt, fmtNum, fmtPow, formatFraction, par, randomInt } from '../utils.js';

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

/**
 * Main quotient problem generator - delegates to specific type generators
 */
export function generateQuotientProblem(type, lvl, a, b, n, add) {
    if (type === 'poly') {
        generateQuotientPoly(lvl, a, b, n, add);
    }
    else if (type === 'root') {
        generateQuotientRoot(lvl, a, b, n, add);
    }
    else if (type === 'exp') {
        generateQuotientExp(lvl, a, b, n, add);
    }
    else if (type === 'log') {
        generateQuotientLog(lvl, a, b, n, add);
    }
}

/**
 * Generate quotient rule problems with polynomial expressions
 */
export function generateQuotientPoly(lvl, a, b, n, add) {
    const patterns = [];

    // Level 1: Basic linear/linear, quadratic/linear
    if (lvl === 1) {
        patterns.push(() => {
            // (ax + b)/(cx + d) - linear over linear
            const c = randomInt(1, 3);
            const d = randomInt(1, 4) * (Math.random() > 0.5 ? 1 : -1);
            const num = `${fmt(a,'x')} ${fmtNum(b)}`;
            const denom = `${fmt(c,'x')} ${fmtNum(d)}`;
            const numDeriv = `${a*c} - ${a*c}`;
            const rawNum = `${a}(${denom}) - (${num})(${c})`;
            const simplifiedNum = `${a*d - b*c}`;
            const ans = `f'(x) = \\frac{${simplifiedNum}}{(${denom})^2}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(${denom})^2} \\\\
&= \\frac{${simplifiedNum}}{(${denom})^2}`;
            return {
                q: `f(x) = \\frac{${num}}{${denom}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(num, denom, `${a}`, `${c}`, steps),
                hint: "Linear over linear - konstantene forsvinner ved derivasjon."
            };
        });

        patterns.push(() => {
            // x^2/(x + a) - quadratic over linear
            const denom = `x ${fmtNum(a)}`;
            const rawNum = `2x(${denom}) - x^2 \\cdot 1`;
            const expandedNum = `2x^2 ${fmtNum(2*a, false)}x - x^2`;
            const simplifiedNum = `x^2 ${fmtNum(2*a, false)}x`;
            const factoredNum = `x(x ${fmtNum(2*a)})`;
            const ans = `f'(x) = \\frac{${factoredNum}}{(${denom})^2}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(${denom})^2} \\\\
&= \\frac{${simplifiedNum}}{(${denom})^2} \\\\
&= \\frac{${factoredNum}}{(${denom})^2}`;
            return {
                q: `f(x) = \\frac{x^2}{${denom}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`x^2`, denom, `2x`, `1`, steps),
                hint: "Kvadratisk polynom over lineært uttrykk."
            };
        });
    }

    // Level 2: Linear/quadratic, quadratic/quadratic
    else if (lvl === 2) {
        patterns.push(() => {
            // x/(x^2 + a) - linear over quadratic
            const denom = `x^2 ${fmtNum(a)}`;
            const rawNum = `1 \\cdot (${denom}) - x \\cdot 2x`;
            const simplifiedNum = `${fmtNum(a, true)} - x^2`;
            const ans = `f'(x) = \\frac{${simplifiedNum}}{(${denom})^2}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(${denom})^2} \\\\
&= \\frac{${simplifiedNum}}{(${denom})^2}`;
            return {
                q: `f(x) = \\frac{x}{${denom}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`x`, denom, `1`, `2x`, steps),
                hint: "Lineær over kvadratisk."
            };
        });

        patterns.push(() => {
            // (x + b)/(x^2 + a) - linear over quadratic
            const num = `x ${fmtNum(b)}`;
            const denom = `x^2 ${fmtNum(a)}`;
            const rawNum = `1 \\cdot (${denom}) - (${num}) \\cdot 2x`;
            const expandedNum = `x^2 ${fmtNum(a)} - 2x^2 ${fmtNum(2*b)}x`;
            const simplifiedNum = `-x^2 ${fmtNum(-2*b)}x ${fmtNum(a)}`;
            const ans = `f'(x) = \\frac{${simplifiedNum}}{(${denom})^2}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(${denom})^2} \\\\
&= \\frac{${simplifiedNum}}{(${denom})^2}`;
            return {
                q: `f(x) = \\frac{${num}}{${denom}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(num, denom, `1`, `2x`, steps),
                hint: "Lineær over kvadratisk - ekspander teller."
            };
        });
    }

    // Level 3: Chain rule integration, squared terms
    else if (lvl === 3) {
        patterns.push(() => {
            // (ax + b)^2/(x + c) - squared numerator
            const c = randomInt(1, 3) * (Math.random() > 0.5 ? 1 : -1);
            const num = `(${fmt(a,'x')} ${fmtNum(b)})^2`;
            const denom = `x ${fmtNum(c)}`;
            const numDeriv = `2(${fmt(a,'x')} ${fmtNum(b)}) \\cdot ${a}`;
            const rawNum = `${numDeriv}(${denom}) - ${num} \\cdot 1`;
            const ans = `f'(x) = \\frac{${numDeriv}(${denom}) - ${num}}{(${denom})^2}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(${denom})^2}`;
            return {
                q: `f(x) = \\frac{${num}}{${denom}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(num, denom, numDeriv, `1`, steps),
                hint: "Kvadrert teller - bruk kjerneregel."
            };
        });

        patterns.push(() => {
            // x^3/(x^2 + a) - cubic over quadratic
            const denom = `x^2 ${fmtNum(a)}`;
            const rawNum = `3x^2(${denom}) - x^3 \\cdot 2x`;
            const expandedNum = `3x^4 ${fmtNum(3*a, false)}x^2 - 2x^4`;
            const simplifiedNum = `x^4 ${fmtNum(3*a, false)}x^2`;
            const factoredNum = `x^2(x^2 ${fmtNum(3*a)})`;
            const ans = `f'(x) = \\frac{${factoredNum}}{(${denom})^2}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(${denom})^2} \\\\
&= \\frac{${simplifiedNum}}{(${denom})^2} \\\\
&= \\frac{${factoredNum}}{(${denom})^2}`;
            return {
                q: `f(x) = \\frac{x^3}{${denom}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`x^3`, denom, `3x^2`, `2x`, steps),
                hint: "Kubisk over kvadratisk - faktoriser teller."
            };
        });
    }

    // Level 4: Complex quadratic expressions
    else if (lvl === 4) {
        patterns.push(() => {
            // (x^2 + b)/(x^2 + a) - quadratic over quadratic
            const num = `x^2 ${fmtNum(b)}`;
            const denom = `x^2 ${fmtNum(a)}`;
            const rawNum = `2x(${denom}) - (${num}) \\cdot 2x`;
            const expandedNum = `2x^3 ${fmtNum(2*a, true)}x - 2x^3 ${fmtNum(2*b)}x`;
            const simplifiedNum = `${2*a - 2*b}x`;
            const ans = `f'(x) = \\frac{${simplifiedNum}}{(${denom})^2}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(${denom})^2} \\\\
&= \\frac{${simplifiedNum}}{(${denom})^2}`;
            return {
                q: `f(x) = \\frac{${num}}{${denom}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(num, denom, `2x`, `2x`, steps),
                hint: "Kvadratisk over kvadratisk - mye forenkles."
            };
        });

        patterns.push(() => {
            // (ax + b)/(x^2 + c) - linear over quadratic with coefficients
            const c = randomInt(1, 4);
            const num = `${fmt(a,'x')} ${fmtNum(b)}`;
            const denom = `x^2 ${fmtNum(c)}`;
            const rawNum = `${a}(${denom}) - (${num}) \\cdot 2x`;
            const expandedNum = `${a}x^2 ${fmtNum(a*c)} - 2x^2 ${fmtNum(2*b)}x`;
            const simplifiedNum = `${-a}x^2 ${fmtNum(-2*b)}x ${fmtNum(a*c)}`;
            const ans = `f'(x) = \\frac{${simplifiedNum}}{(${denom})^2}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(${denom})^2}`;
            return {
                q: `f(x) = \\frac{${num}}{${denom}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(num, denom, `${a}`, `2x`, steps),
                hint: "Lineær over kvadratisk med koeffisienter."
            };
        });
    }

    // Level 5: Expert - cubic polynomials
    else {
        patterns.push(() => {
            // (x^2 + a)/(x^3 + b) - quadratic over cubic
            const num = `x^2 ${fmtNum(a)}`;
            const denom = `x^3 ${fmtNum(b)}`;
            const rawNum = `2x(${denom}) - (${num}) \\cdot 3x^2`;
            const ans = `f'(x) = \\frac{2x(${denom}) - 3x^2(${num})}{(${denom})^2}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(${denom})^2}`;
            return {
                q: `f(x) = \\frac{${num}}{${denom}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(num, denom, `2x`, `3x^2`, steps),
                hint: "Kvadratisk over kubisk polynom."
            };
        });

        patterns.push(() => {
            // x^n/(x^m + a) where n, m vary
            const m = randomInt(2, 3);
            const num = `x${fmtPow(n)}`;
            const denom = `x${fmtPow(m)} ${fmtNum(a)}`;
            const rawNum = `${n}x${fmtPow(n-1)}(${denom}) - x${fmtPow(n)} \\cdot ${m}x${fmtPow(m-1)}`;
            const ans = `f'(x) = \\frac{${rawNum}}{(${denom})^2}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(${denom})^2}`;
            return {
                q: `f(x) = \\frac{${num}}{${denom}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(num, denom, `${n}x${fmtPow(n-1)}`, `${m}x${fmtPow(m-1)}`, steps),
                hint: "Høyere grads polynomer."
            };
        });
    }

    const pattern = patterns[randomInt(0, patterns.length - 1)];
    const prob = pattern();
    add('quotient', lvl, 'poly', prob.q, prob.a, prob.steps, prob.hint);
}

/**
 * Generate quotient rule problems with root expressions
 */
export function generateQuotientRoot(lvl, a, b, n, add) {
    const patterns = [];

    // Level 1: Basic root patterns
    if (lvl === 1) {
        patterns.push(() => {
            // √x/(x + a) - root over linear (current pattern, keep it)
            const denom = `x ${fmtNum(a)}`;
            const rawNum = `\\frac{1}{2\\sqrt{x}}(${denom}) - \\sqrt{x}`;
            const combinedNum = `\\frac{(${denom}) - 2x}{2\\sqrt{x}}`;
            const simpNum = `${fmtNum(a, true)} - x`;
            const ans = `f'(x) = \\frac{${simpNum}}{2\\sqrt{x}(${denom})^2}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(${denom})^2} \\\\
&= \\frac{${combinedNum}}{(${denom})^2} \\\\
&= \\frac{${simpNum}}{2\\sqrt{x}(${denom})^2}`;
            return {
                q: `f(x) = \\frac{\\sqrt{x}}{${denom}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`\\sqrt{x}`, denom, `\\frac{1}{2\\sqrt{x}}`, `1`, steps),
                hint: "Kvadratrot over lineært uttrykk."
            };
        });

        patterns.push(() => {
            // √x/x = x^(-1/2) - simplifies nicely
            const rawNum = `\\frac{1}{2\\sqrt{x}} \\cdot x - \\sqrt{x} \\cdot 1`;
            const combinedNum = `\\frac{x - 2x}{2\\sqrt{x}}`;
            const simpNum = `-x`;
            const ans = `f'(x) = \\frac{-1}{2x\\sqrt{x}}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{x^2} \\\\
&= \\frac{${combinedNum}}{x^2} \\\\
&= \\frac{-x}{2\\sqrt{x} \\cdot x^2} \\\\
&= \\frac{-1}{2\\sqrt{x}x} \\\\
&= \\frac{-1}{2x\\sqrt{x}}`;
            return {
                q: `f(x) = \\frac{\\sqrt{x}}{x}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`\\sqrt{x}`, `x`, `\\frac{1}{2\\sqrt{x}}`, `1`, steps),
                hint: "Kan også skrives som x^{-1/2} og deriveres direkte."
            };
        });
    }

    // Level 2: Root over quadratic, linear over root
    else if (lvl === 2) {
        patterns.push(() => {
            // √x/(x^2 + a) - root over quadratic
            const denom = `x^2 ${fmtNum(a)}`;
            const rawNum = `\\frac{1}{2\\sqrt{x}}(${denom}) - \\sqrt{x} \\cdot 2x`;
            const combinedNum = `\\frac{(${denom}) - 4x^2}{2\\sqrt{x}}`;
            const simpNum = `${fmtNum(a, true)} - 3x^2`;
            const ans = `f'(x) = \\frac{${simpNum}}{2\\sqrt{x}(${denom})^2}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(${denom})^2} \\\\
&= \\frac{${combinedNum}}{(${denom})^2} \\\\
&= \\frac{${simpNum}}{2\\sqrt{x}(${denom})^2}`;
            return {
                q: `f(x) = \\frac{\\sqrt{x}}{${denom}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`\\sqrt{x}`, denom, `\\frac{1}{2\\sqrt{x}}`, `2x`, steps),
                hint: "Rot over kvadratisk uttrykk."
            };
        });

        patterns.push(() => {
            // (x + a)/√x - linear over root
            const num = `x ${fmtNum(a)}`;
            const rawNum = `1 \\cdot \\sqrt{x} - (${num}) \\cdot \\frac{1}{2\\sqrt{x}}`;
            const combinedNum = `\\frac{2x - (${num})}{2\\sqrt{x}}`;
            const simpNum = `x ${fmtNum(-a)}`;
            const ans = `f'(x) = \\frac{${simpNum}}{2x}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{x} \\\\
&= \\frac{${combinedNum}}{x} \\\\
&= \\frac{${simpNum}}{2x}`;
            return {
                q: `f(x) = \\frac{${num}}{\\sqrt{x}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(num, `\\sqrt{x}`, `1`, `\\frac{1}{2\\sqrt{x}}`, steps),
                hint: "Lineær over kvadratrot."
            };
        });
    }

    // Level 3: Root with chain rule
    else if (lvl === 3) {
        patterns.push(() => {
            // √(ax + b)/(x + c) - root with chain in numerator
            const c = randomInt(1, 3) * (Math.random() > 0.5 ? 1 : -1);
            const num = `\\sqrt{${fmt(a,'x')} ${fmtNum(b)}}`;
            const denom = `x ${fmtNum(c)}`;
            const numDeriv = `\\frac{${a}}{2\\sqrt{${fmt(a,'x')} ${fmtNum(b)}}}`;
            const rawNum = `${numDeriv}(${denom}) - ${num}`;
            const ans = `f'(x) = \\frac{${rawNum}}{(${denom})^2}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(${denom})^2}`;
            return {
                q: `f(x) = \\frac{${num}}{${denom}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(num, denom, numDeriv, `1`, steps),
                hint: "Rot med kjerneregel i teller."
            };
        });

        patterns.push(() => {
            // x/√(ax + b) - linear over root with chain
            const num = `x`;
            const inner = `${fmt(a,'x')} ${fmtNum(b)}`;
            const denom = `\\sqrt{${inner}}`;
            const denomDeriv = `\\frac{${a}}{2\\sqrt{${inner}}}`;
            const rawNum = `1 \\cdot ${denom} - x \\cdot ${denomDeriv}`;
            const simplifiedNum = `${denom} - \\frac{${a}x}{2\\sqrt{${inner}}}`;
            const ans = `f'(x) = \\frac{${simplifiedNum}}{${inner}}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(${denom})^2} \\\\
&= \\frac{${simplifiedNum}}{${inner}}`;
            return {
                q: `f(x) = \\frac{${num}}{${denom}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(num, denom, `1`, denomDeriv, steps),
                hint: "Rot med kjerneregel i nevner."
            };
        });
    }

    // Level 4: Complex root expressions
    else if (lvl === 4) {
        patterns.push(() => {
            // x^2/√(ax + b) - quadratic over root
            const num = `x^2`;
            const denom = `\\sqrt{${fmt(a,'x')} ${fmtNum(b)}}`;
            const denomDeriv = `\\frac{${a}}{2\\sqrt{${fmt(a,'x')} ${fmtNum(b)}}}`;
            const rawNum = `2x \\cdot ${denom} - x^2 \\cdot ${denomDeriv}`;
            const ans = `f'(x) = \\frac{${rawNum}}{${fmt(a,'x')} ${fmtNum(b)}}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(${denom})^2} \\\\
&= \\frac{${rawNum}}{${fmt(a,'x')} ${fmtNum(b)}}`;
            return {
                q: `f(x) = \\frac{${num}}{${denom}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(num, denom, `2x`, denomDeriv, steps),
                hint: "Kvadratisk over rot med kjerneregel."
            };
        });

        patterns.push(() => {
            // √(x^2 + a)/x - complex root over x
            const num = `\\sqrt{x^2 ${fmtNum(a)}}`;
            const numDeriv = `\\frac{2x}{2\\sqrt{x^2 ${fmtNum(a)}}}`;
            const denom = `x`;
            const rawNum = `${numDeriv} \\cdot x - ${num} \\cdot 1`;
            const ans = `f'(x) = \\frac{${rawNum}}{x^2}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{x^2}`;
            return {
                q: `f(x) = \\frac{${num}}{${denom}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(num, denom, numDeriv, `1`, steps),
                hint: "Rot av kvadratisk uttrykk over x."
            };
        });
    }

    // Level 5: Expert - root ratios, cubic roots
    else {
        patterns.push(() => {
            // √(x^3 + a)/(x^2 + b) - cubic root over quadratic
            const num = `\\sqrt{x^3 ${fmtNum(a)}}`;
            const numDeriv = `\\frac{3x^2}{2\\sqrt{x^3 ${fmtNum(a)}}}`;
            const denom = `x^2 ${fmtNum(b)}`;
            const rawNum = `${numDeriv}(${denom}) - ${num} \\cdot 2x`;
            const ans = `f'(x) = \\frac{${rawNum}}{(${denom})^2}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(${denom})^2}`;
            return {
                q: `f(x) = \\frac{${num}}{${denom}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(num, denom, numDeriv, `2x`, steps),
                hint: "Rot av kubisk over kvadratisk."
            };
        });

        patterns.push(() => {
            // (x^2 + a)/√(x^3 + b) - quadratic over cubic root
            const num = `x^2 ${fmtNum(a)}`;
            const denom = `\\sqrt{x^3 ${fmtNum(b)}}`;
            const denomDeriv = `\\frac{3x^2}{2\\sqrt{x^3 ${fmtNum(b)}}}`;
            const rawNum = `2x \\cdot ${denom} - (${num}) \\cdot ${denomDeriv}`;
            const ans = `f'(x) = \\frac{${rawNum}}{x^3 ${fmtNum(b)}}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(${denom})^2} \\\\
&= \\frac{${rawNum}}{x^3 ${fmtNum(b)}}`;
            return {
                q: `f(x) = \\frac{${num}}{${denom}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(num, denom, `2x`, denomDeriv, steps),
                hint: "Kvadratisk over rot av kubisk."
            };
        });
    }

    const pattern = patterns[randomInt(0, patterns.length - 1)];
    const prob = pattern();
    add('quotient', lvl, 'root', prob.q, prob.a, prob.steps, prob.hint);
}

/**
 * Generate quotient rule problems with exponential expressions
 */
export function generateQuotientExp(lvl, a, b, n, add) {
    const patterns = [];

    // Level 1: Exponential over linear, linear over exponential
    if (lvl === 1) {
        patterns.push(() => {
            // e^x/(x + a) - exponential over linear
            const denom = `x ${fmtNum(a)}`;
            const rawNum = `e^x(${denom}) - e^x \\cdot 1`;
            const factoredNum = `e^x(${denom} - 1)`;
            const simpDenom = `x ${fmtNum(a-1)}`;
            const ans = `f'(x) = \\frac{e^x(${simpDenom})}{(${denom})^2}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(${denom})^2} \\\\
&= \\frac{e^x(${simpDenom})}{(${denom})^2}`;
            return {
                q: `f(x) = \\frac{e^x}{${denom}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`e^x`, denom, `e^x`, `1`, steps),
                hint: "Eksponentialfunksjon over lineært uttrykk."
            };
        });

        patterns.push(() => {
            // x/e^x - linear over exponential
            const rawNum = `1 \\cdot e^x - x \\cdot e^x`;
            const factoredNum = `e^x(1 - x)`;
            const ans = `f'(x) = \\frac{1 - x}{e^x}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(e^x)^2} \\\\
&= \\frac{${factoredNum}}{e^{2x}} \\\\
&= \\frac{1 - x}{e^x}`;
            return {
                q: `f(x) = \\frac{x}{e^x}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`x`, `e^x`, `1`, `e^x`, steps),
                hint: "Lineær over eksponentialfunksjon."
            };
        });
    }

    // Level 2: Exponential with chain, polynomial over exponential
    else if (lvl === 2) {
        patterns.push(() => {
            // e^(ax)/(x + b) - exponential with chain over linear
            const denom = `x ${fmtNum(b)}`;
            const rawNum = `${a}e^{${a}x}(${denom}) - e^{${a}x} \\cdot 1`;
            const factoredNum = `e^{${a}x}(${a}(${denom}) - 1)`;
            const simpNum = `${a}x ${fmtNum(a*b - 1)}`;
            const ans = `f'(x) = \\frac{e^{${a}x}(${simpNum})}{(${denom})^2}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(${denom})^2} \\\\
&= \\frac{e^{${a}x}(${simpNum})}{(${denom})^2}`;
            return {
                q: `f(x) = \\frac{e^{${a}x}}{${denom}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`e^{${a}x}`, denom, `${a}e^{${a}x}`, `1`, steps),
                hint: "Eksponential med kjerneregel over lineært."
            };
        });

        patterns.push(() => {
            // x^2/e^x - quadratic over exponential
            const rawNum = `2x \\cdot e^x - x^2 \\cdot e^x`;
            const factoredNum = `e^x(2x - x^2)`;
            const simpNum = `x(2 - x)`;
            const ans = `f'(x) = \\frac{${simpNum}}{e^x}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{e^{2x}} \\\\
&= \\frac{${factoredNum}}{e^{2x}} \\\\
&= \\frac{${simpNum}}{e^x}`;
            return {
                q: `f(x) = \\frac{x^2}{e^x}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`x^2`, `e^x`, `2x`, `e^x`, steps),
                hint: "Kvadratisk over eksponential."
            };
        });
    }

    // Level 3: More complex chain rules
    else if (lvl === 3) {
        patterns.push(() => {
            // e^(ax)/(x^2 + b) - exponential with chain over quadratic
            const denom = `x^2 ${fmtNum(b)}`;
            const rawNum = `${a}e^{${a}x}(${denom}) - e^{${a}x} \\cdot 2x`;
            const factoredNum = `e^{${a}x}(${a}(${denom}) - 2x)`;
            const ans = `f'(x) = \\frac{${factoredNum}}{(${denom})^2}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(${denom})^2} \\\\
&= \\frac{${factoredNum}}{(${denom})^2}`;
            return {
                q: `f(x) = \\frac{e^{${a}x}}{${denom}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`e^{${a}x}`, denom, `${a}e^{${a}x}`, `2x`, steps),
                hint: "Eksponential over kvadratisk."
            };
        });

        patterns.push(() => {
            // (x^2 + a)/e^(bx) - quadratic over exponential with chain
            const num = `x^2 ${fmtNum(a)}`;
            const denom = `e^{${b}x}`;
            const rawNum = `2x \\cdot ${denom} - (${num}) \\cdot ${b}${denom}`;
            const factoredNum = `${denom}(2x - ${b}(${num}))`;
            const simpNum = `2x - ${b}x^2 ${fmtNum(b*a)}`;
            const ans = `f'(x) = \\frac{${simpNum}}{${denom}}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(${denom})^2} \\\\
&= \\frac{${simpNum}}{${denom}}`;
            return {
                q: `f(x) = \\frac{${num}}{${denom}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(num, denom, `2x`, `${b}${denom}`, steps),
                hint: "Kvadratisk over eksponential med kjerneregel."
            };
        });
    }

    // Level 4: Product in numerator, complex expressions
    else if (lvl === 4) {
        patterns.push(() => {
            // x·e^x/(x^2 + a) - product in numerator
            const num = `x \\cdot e^x`;
            const numDeriv = `e^x + x \\cdot e^x`;
            const denom = `x^2 ${fmtNum(a)}`;
            const rawNum = `(${numDeriv})(${denom}) - ${num} \\cdot 2x`;
            const ans = `f'(x) = \\frac{(${numDeriv})(${denom}) - 2x^2e^x}{(${denom})^2}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(${denom})^2}`;
            return {
                q: `f(x) = \\frac{${num}}{${denom}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(num, denom, numDeriv, `2x`, steps),
                hint: "Produkt i teller - bruk produktregel først."
            };
        });

        patterns.push(() => {
            // e^(ax + b)/(x^2 + c) - shifted exponential over quadratic
            const c = randomInt(1, 4);
            const num = `e^{${fmt(a,'x')} ${fmtNum(b)}}`;
            const numDeriv = `${a}e^{${fmt(a,'x')} ${fmtNum(b)}}`;
            const denom = `x^2 ${fmtNum(c)}`;
            const rawNum = `${numDeriv}(${denom}) - ${num} \\cdot 2x`;
            const ans = `f'(x) = \\frac{${rawNum}}{(${denom})^2}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(${denom})^2}`;
            return {
                q: `f(x) = \\frac{${num}}{${denom}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(num, denom, numDeriv, `2x`, steps),
                hint: "Eksponential med lineær ekponent."
            };
        });
    }

    // Level 5: Expert - polynomial-exponential products, complex chains
    else {
        patterns.push(() => {
            // x^2·e^(ax)/(bx + c) - quadratic-exponential product over linear
            const c = randomInt(1, 3);
            const num = `x^2 \\cdot e^{${a}x}`;
            const numDeriv = `2x \\cdot e^{${a}x} + x^2 \\cdot ${a}e^{${a}x}`;
            const denom = `${fmt(b,'x')} ${fmtNum(c)}`;
            const rawNum = `(${numDeriv})(${denom}) - ${num} \\cdot ${b}`;
            const ans = `f'(x) = \\frac{${rawNum}}{(${denom})^2}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(${denom})^2}`;
            return {
                q: `f(x) = \\frac{${num}}{${denom}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(num, denom, numDeriv, `${b}`, steps),
                hint: "Produkt i teller - kombiner produkt- og kjerneregel."
            };
        });

        patterns.push(() => {
            // (ax + b)·e^(cx)/(dx^2 + e) - linear-exponential product over quadratic
            const c = randomInt(1, 2);
            const d = randomInt(1, 2);
            const e = randomInt(1, 4);
            const num = `(${fmt(a,'x')} ${fmtNum(b)}) \\cdot e^{${c}x}`;
            const numDeriv = `${a}e^{${c}x} + (${fmt(a,'x')} ${fmtNum(b)}) \\cdot ${c}e^{${c}x}`;
            const denom = `${fmt(d,'x^2')} ${fmtNum(e)}`;
            const rawNum = `(${numDeriv})(${denom}) - ${num} \\cdot ${2*d}x`;
            const ans = `f'(x) = \\frac{${rawNum}}{(${denom})^2}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(${denom})^2}`;
            return {
                q: `f(x) = \\frac{${num}}{${denom}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(num, denom, numDeriv, `${2*d}x`, steps),
                hint: "Avansert - produktregel i teller kombinert med brøkregel."
            };
        });
    }

    const pattern = patterns[randomInt(0, patterns.length - 1)];
    const prob = pattern();
    add('quotient', lvl, 'exp', prob.q, prob.a, prob.steps, prob.hint);
}

/**
 * Generate quotient rule problems with logarithmic expressions
 */
export function generateQuotientLog(lvl, a, b, n, add) {
    const patterns = [];

    // Level 1: Basic logarithm patterns
    if (lvl === 1) {
        patterns.push(() => {
            // ln(x)/x - logarithm over x (simpler than current x^n)
            const rawNum = `\\frac{1}{x} \\cdot x - \\ln x \\cdot 1`;
            const ans = `f'(x) = \\frac{1 - \\ln x}{x^2}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{x^2} \\\\
&= \\frac{1 - \\ln x}{x^2}`;
            return {
                q: `f(x) = \\frac{\\ln x}{x}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`\\ln x`, `x`, `\\frac{1}{x}`, `1`, steps),
                hint: "Logaritme over x - klassisk oppgave."
            };
        });

        patterns.push(() => {
            // x/ln(x) - x over logarithm
            const rawNum = `1 \\cdot \\ln x - x \\cdot \\frac{1}{x}`;
            const ans = `f'(x) = \\frac{\\ln x - 1}{(\\ln x)^2}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(\\ln x)^2} \\\\
&= \\frac{\\ln x - 1}{(\\ln x)^2}`;
            return {
                q: `f(x) = \\frac{x}{\\ln x}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`x`, `\\ln x`, `1`, `\\frac{1}{x}`, steps),
                hint: "x over logaritme - interessant variant."
            };
        });
    }

    // Level 2: Logarithm over quadratic, quadratic over logarithm
    else if (lvl === 2) {
        patterns.push(() => {
            // ln(x)/(x + a) - logarithm over linear
            const denom = `x ${fmtNum(a)}`;
            const rawNum = `\\frac{1}{x}(${denom}) - \\ln x \\cdot 1`;
            const expandedNum = `\\frac{${denom}}{x} - \\ln x`;
            const combinedNum = `\\frac{${denom} - x\\ln x}{x}`;
            const ans = `f'(x) = \\frac{${denom} - x\\ln x}{x(${denom})^2}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(${denom})^2} \\\\
&= \\frac{${combinedNum}}{(${denom})^2}`;
            return {
                q: `f(x) = \\frac{\\ln x}{${denom}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`\\ln x`, denom, `\\frac{1}{x}`, `1`, steps),
                hint: "Logaritme over lineært uttrykk."
            };
        });

        patterns.push(() => {
            // ln(x)/x^2 - logarithm over x squared (current pattern at level 2)
            const rawNum = `\\frac{1}{x} \\cdot x^2 - \\ln x \\cdot 2x`;
            const factoredNum = `x(1 - 2\\ln x)`;
            const ans = `f'(x) = \\frac{1 - 2\\ln x}{x^3}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{x^4} \\\\
&= \\frac{${factoredNum}}{x^4} \\\\
&= \\frac{1 - 2\\ln x}{x^3}`;
            return {
                q: `f(x) = \\frac{\\ln x}{x^2}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`\\ln x`, `x^2`, `\\frac{1}{x}`, `2x`, steps),
                hint: "Logaritme over x^2."
            };
        });
    }

    // Level 3: Logarithm with chain rule
    else if (lvl === 3) {
        patterns.push(() => {
            // ln(ax + b)/x - logarithm with chain over x
            const num = `\\ln(${fmt(a,'x')} ${fmtNum(b)})`;
            const numDeriv = `\\frac{${a}}{${fmt(a,'x')} ${fmtNum(b)}}`;
            const rawNum = `${numDeriv} \\cdot x - ${num} \\cdot 1`;
            const ans = `f'(x) = \\frac{${rawNum}}{x^2}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{x^2}`;
            return {
                q: `f(x) = \\frac{${num}}{x}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(num, `x`, numDeriv, `1`, steps),
                hint: "Logaritme med kjerneregel over x."
            };
        });

        patterns.push(() => {
            // ln(x)/√x - logarithm over root
            const rawNum = `\\frac{1}{x} \\cdot \\sqrt{x} - \\ln x \\cdot \\frac{1}{2\\sqrt{x}}`;
            const combinedNum = `\\frac{2 - \\ln x}{2\\sqrt{x}}`;
            const ans = `f'(x) = \\frac{2 - \\ln x}{2x}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{x} \\\\
&= \\frac{${combinedNum}}{x} \\\\
&= \\frac{2 - \\ln x}{2x}`;
            return {
                q: `f(x) = \\frac{\\ln x}{\\sqrt{x}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(`\\ln x`, `\\sqrt{x}`, `\\frac{1}{x}`, `\\frac{1}{2\\sqrt{x}}`, steps),
                hint: "Logaritme over kvadratrot."
            };
        });
    }

    // Level 4: More complex logarithm expressions
    else if (lvl === 4) {
        patterns.push(() => {
            // ln(x^2 + a)/x - logarithm of quadratic over x
            const num = `\\ln(x^2 ${fmtNum(a)})`;
            const numDeriv = `\\frac{2x}{x^2 ${fmtNum(a)}}`;
            const rawNum = `${numDeriv} \\cdot x - ${num} \\cdot 1`;
            const ans = `f'(x) = \\frac{${rawNum}}{x^2}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{x^2}`;
            return {
                q: `f(x) = \\frac{${num}}{x}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(num, `x`, numDeriv, `1`, steps),
                hint: "Logaritme av kvadratisk uttrykk."
            };
        });

        patterns.push(() => {
            // ln(ax + b)/(x^2 + c) - logarithm with chain over quadratic
            const c = randomInt(1, 4);
            const num = `\\ln(${fmt(a,'x')} ${fmtNum(b)})`;
            const numDeriv = `\\frac{${a}}{${fmt(a,'x')} ${fmtNum(b)}}`;
            const denom = `x^2 ${fmtNum(c)}`;
            const rawNum = `${numDeriv}(${denom}) - ${num} \\cdot 2x`;
            const ans = `f'(x) = \\frac{${rawNum}}{(${denom})^2}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(${denom})^2}`;
            return {
                q: `f(x) = \\frac{${num}}{${denom}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(num, denom, numDeriv, `2x`, steps),
                hint: "Logaritme med kjerneregel over kvadratisk."
            };
        });
    }

    // Level 5: Expert - products with logarithms, complex expressions
    else {
        patterns.push(() => {
            // x·ln(ax + b)/(x^2 + c) - product with logarithm over quadratic
            const c = randomInt(1, 4);
            const num = `x \\cdot \\ln(${fmt(a,'x')} ${fmtNum(b)})`;
            const numDeriv = `\\ln(${fmt(a,'x')} ${fmtNum(b)}) + x \\cdot \\frac{${a}}{${fmt(a,'x')} ${fmtNum(b)}}`;
            const denom = `x^2 ${fmtNum(c)}`;
            const rawNum = `(${numDeriv})(${denom}) - ${num} \\cdot 2x`;
            const ans = `f'(x) = \\frac{${rawNum}}{(${denom})^2}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(${denom})^2}`;
            return {
                q: `f(x) = \\frac{${num}}{${denom}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(num, denom, numDeriv, `2x`, steps),
                hint: "Produkt med logaritme - bruk produktregel først."
            };
        });

        patterns.push(() => {
            // ln(ax^2 + b)/(cx + d) - logarithm of quadratic over linear
            const c = randomInt(1, 2);
            const d = randomInt(1, 3) * (Math.random() > 0.5 ? 1 : -1);
            const num = `\\ln(${fmt(a,'x^2')} ${fmtNum(b)})`;
            const numDeriv = `\\frac{${2*a}x}{${fmt(a,'x^2')} ${fmtNum(b)}}`;
            const denom = `${fmt(c,'x')} ${fmtNum(d)}`;
            const rawNum = `${numDeriv}(${denom}) - ${num} \\cdot ${c}`;
            const ans = `f'(x) = \\frac{${rawNum}}{(${denom})^2}`;
            const steps = `f'(x) &= \\frac{u'v - uv'}{v^2} \\\\
&= \\frac{${rawNum}}{(${denom})^2}`;
            return {
                q: `f(x) = \\frac{${num}}{${denom}}`,
                a: `$$ ${ans} $$`,
                steps: makeAlignedSteps(num, denom, numDeriv, `${c}`, steps),
                hint: "Logaritme av kvadratisk over lineært."
            };
        });
    }

    const pattern = patterns[randomInt(0, patterns.length - 1)];
    const prob = pattern();
    add('quotient', lvl, 'log', prob.q, prob.a, prob.steps, prob.hint);
}
