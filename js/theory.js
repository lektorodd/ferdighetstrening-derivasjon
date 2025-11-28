/**
 * Theory content for the derivative rules
 * Contains explanations and examples in 4 languages (NO, EN, ES, UK)
 * @module theory
 */

export const theoryData = {
    basic: {
        no: {
            title: "Grunnleggende derivasjonsregler",
            intro: "Disse reglene er byggesteinene for all derivasjon. Du må kunne dem før du går videre til kjerne-, produkt- og brøkregelen.",
            formula: "",
            ruleText: "",
            whenToUse: `
                <div class="space-y-6">
                    <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h4 class="font-bold text-blue-900 mb-2">📐 Potensregelen</h4>
                        <div class="text-center text-lg mb-2">$(x^n)' = n \\cdot x^{n-1}$</div>
                        <p class="text-sm text-blue-800 mb-2">Gjelder for alle reelle tall $n \\neq 0$</p>
                        <div class="grid grid-cols-2 gap-2 text-sm">
                            <div class="bg-white p-2 rounded">$(x^3)' = 3x^2$</div>
                            <div class="bg-white p-2 rounded">$(x^{-2})' = -2x^{-3}$</div>
                            <div class="bg-white p-2 rounded">$(\\sqrt{x})' = (x^{1/2})' = \\frac{1}{2\\sqrt{x}}$</div>
                            <div class="bg-white p-2 rounded">$(x)' = 1$</div>
                        </div>
                    </div>

                    <div class="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                        <h4 class="font-bold text-emerald-900 mb-2">📈 Eksponentialfunksjonen</h4>
                        <div class="text-center text-lg mb-2">$(e^x)' = e^x$</div>
                        <p class="text-sm text-emerald-800 mb-2">Den eneste funksjonen som er lik sin egen deriverte!</p>
                        <div class="bg-white p-2 rounded text-sm">
                            For andre grunntall: $(a^x)' = a^x \\cdot \\ln(a)$
                        </div>
                    </div>

                    <div class="bg-amber-50 p-4 rounded-lg border border-amber-100">
                        <h4 class="font-bold text-amber-900 mb-2">📊 Naturlig logaritme</h4>
                        <div class="text-center text-lg mb-2">$(\\ln x)' = \\frac{1}{x}$</div>
                        <p class="text-sm text-amber-800 mb-2">Gjelder for $x > 0$</p>
                        <div class="bg-white p-2 rounded text-sm">
                            For andre grunntall: $(\\log_a x)' = \\frac{1}{x \\cdot \\ln(a)}$
                        </div>
                    </div>

                    <div class="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <h4 class="font-bold text-purple-900 mb-2">➕ Sum- og konstantregler</h4>
                        <div class="space-y-2 text-center">
                            <div>$(c)' = 0$ <span class="text-sm text-purple-600">Konstanter forsvinner</span></div>
                            <div>$(c \\cdot f(x))' = c \\cdot f'(x)$ <span class="text-sm text-purple-600">Konstanter kan flyttes ut</span></div>
                            <div>$(f(x) + g(x))' = f'(x) + g'(x)$ <span class="text-sm text-purple-600">Deriver ledd for ledd</span></div>
                        </div>
                    </div>
                </div>
            `,
            detailedExample: `
                <div class="bg-stone-50 p-4 rounded-lg border border-stone-200 mt-6">
                    <h4 class="font-bold text-stone-800 mb-3">🔍 Eksempel: $f(x) = 3x^4 + 2e^x - 5\\ln x + 7$</h4>
                    <div class="space-y-2 text-sm">
                        <p>Vi deriverer ledd for ledd:</p>
                        <ul class="list-disc list-inside space-y-1 ml-4">
                            <li>$(3x^4)' = 3 \\cdot 4x^3 = 12x^3$ (potensregel + konstant ut)</li>
                            <li>$(2e^x)' = 2e^x$ (eksponentialregel + konstant ut)</li>
                            <li>$(-5\\ln x)' = -5 \\cdot \\frac{1}{x} = -\\frac{5}{x}$ (ln-regel + konstant ut)</li>
                            <li>$(7)' = 0$ (konstantregel)</li>
                        </ul>
                        <div class="bg-emerald-100 p-3 rounded mt-3 text-center">
                            <strong>Svar:</strong> $f'(x) = 12x^3 + 2e^x - \\frac{5}{x}$
                        </div>
                    </div>
                </div>
            `
        },
        en: {
            title: "Basic Derivative Rules",
            intro: "These rules are the building blocks for all differentiation. Master them before moving on to the chain, product, and quotient rules.",
            formula: "",
            ruleText: "",
            whenToUse: `
                <div class="space-y-6">
                    <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h4 class="font-bold text-blue-900 mb-2">📐 Power Rule</h4>
                        <div class="text-center text-lg mb-2">$(x^n)' = n \\cdot x^{n-1}$</div>
                        <p class="text-sm text-blue-800 mb-2">Applies to all real numbers $n \\neq 0$</p>
                        <div class="grid grid-cols-2 gap-2 text-sm">
                            <div class="bg-white p-2 rounded">$(x^3)' = 3x^2$</div>
                            <div class="bg-white p-2 rounded">$(x^{-2})' = -2x^{-3}$</div>
                            <div class="bg-white p-2 rounded">$(\\sqrt{x})' = (x^{1/2})' = \\frac{1}{2\\sqrt{x}}$</div>
                            <div class="bg-white p-2 rounded">$(x)' = 1$</div>
                        </div>
                    </div>

                    <div class="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                        <h4 class="font-bold text-emerald-900 mb-2">📈 Exponential Function</h4>
                        <div class="text-center text-lg mb-2">$(e^x)' = e^x$</div>
                        <p class="text-sm text-emerald-800 mb-2">The only function equal to its own derivative!</p>
                        <div class="bg-white p-2 rounded text-sm">
                            For other bases: $(a^x)' = a^x \\cdot \\ln(a)$
                        </div>
                    </div>

                    <div class="bg-amber-50 p-4 rounded-lg border border-amber-100">
                        <h4 class="font-bold text-amber-900 mb-2">📊 Natural Logarithm</h4>
                        <div class="text-center text-lg mb-2">$(\\ln x)' = \\frac{1}{x}$</div>
                        <p class="text-sm text-amber-800 mb-2">Applies for $x > 0$</p>
                        <div class="bg-white p-2 rounded text-sm">
                            For other bases: $(\\log_a x)' = \\frac{1}{x \\cdot \\ln(a)}$
                        </div>
                    </div>

                    <div class="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <h4 class="font-bold text-purple-900 mb-2">➕ Sum and Constant Rules</h4>
                        <div class="space-y-2 text-center">
                            <div>$(c)' = 0$ <span class="text-sm text-purple-600">Constants disappear</span></div>
                            <div>$(c \\cdot f(x))' = c \\cdot f'(x)$ <span class="text-sm text-purple-600">Constants can be factored out</span></div>
                            <div>$(f(x) + g(x))' = f'(x) + g'(x)$ <span class="text-sm text-purple-600">Differentiate term by term</span></div>
                        </div>
                    </div>
                </div>
            `,
            detailedExample: `
                <div class="bg-stone-50 p-4 rounded-lg border border-stone-200 mt-6">
                    <h4 class="font-bold text-stone-800 mb-3">🔍 Example: $f(x) = 3x^4 + 2e^x - 5\\ln x + 7$</h4>
                    <div class="space-y-2 text-sm">
                        <p>We differentiate term by term:</p>
                        <ul class="list-disc list-inside space-y-1 ml-4">
                            <li>$(3x^4)' = 3 \\cdot 4x^3 = 12x^3$ (power rule + constant out)</li>
                            <li>$(2e^x)' = 2e^x$ (exponential rule + constant out)</li>
                            <li>$(-5\\ln x)' = -5 \\cdot \\frac{1}{x} = -\\frac{5}{x}$ (ln rule + constant out)</li>
                            <li>$(7)' = 0$ (constant rule)</li>
                        </ul>
                        <div class="bg-emerald-100 p-3 rounded mt-3 text-center">
                            <strong>Answer:</strong> $f'(x) = 12x^3 + 2e^x - \\frac{5}{x}$
                        </div>
                    </div>
                </div>
            `
        },
        es: {
            title: "Reglas Básicas de Derivación",
            intro: "Estas reglas son los bloques fundamentales de toda derivación. Domínalas antes de pasar a las reglas de la cadena, producto y cociente.",
            formula: "",
            ruleText: "",
            whenToUse: `
                <div class="space-y-6">
                    <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h4 class="font-bold text-blue-900 mb-2">📐 Regla de Potencia</h4>
                        <div class="text-center text-lg mb-2">$(x^n)' = n \\cdot x^{n-1}$</div>
                        <p class="text-sm text-blue-800 mb-2">Se aplica a todos los números reales $n \\neq 0$</p>
                        <div class="grid grid-cols-2 gap-2 text-sm">
                            <div class="bg-white p-2 rounded">$(x^3)' = 3x^2$</div>
                            <div class="bg-white p-2 rounded">$(x^{-2})' = -2x^{-3}$</div>
                            <div class="bg-white p-2 rounded">$(\\sqrt{x})' = (x^{1/2})' = \\frac{1}{2\\sqrt{x}}$</div>
                            <div class="bg-white p-2 rounded">$(x)' = 1$</div>
                        </div>
                    </div>

                    <div class="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                        <h4 class="font-bold text-emerald-900 mb-2">📈 Función Exponencial</h4>
                        <div class="text-center text-lg mb-2">$(e^x)' = e^x$</div>
                        <p class="text-sm text-emerald-800 mb-2">¡La única función igual a su propia derivada!</p>
                        <div class="bg-white p-2 rounded text-sm">
                            Para otras bases: $(a^x)' = a^x \\cdot \\ln(a)$
                        </div>
                    </div>

                    <div class="bg-amber-50 p-4 rounded-lg border border-amber-100">
                        <h4 class="font-bold text-amber-900 mb-2">📊 Logaritmo Natural</h4>
                        <div class="text-center text-lg mb-2">$(\\ln x)' = \\frac{1}{x}$</div>
                        <p class="text-sm text-amber-800 mb-2">Se aplica para $x > 0$</p>
                        <div class="bg-white p-2 rounded text-sm">
                            Para otras bases: $(\\log_a x)' = \\frac{1}{x \\cdot \\ln(a)}$
                        </div>
                    </div>

                    <div class="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <h4 class="font-bold text-purple-900 mb-2">➕ Reglas de Suma y Constantes</h4>
                        <div class="space-y-2 text-center">
                            <div>$(c)' = 0$ <span class="text-sm text-purple-600">Las constantes desaparecen</span></div>
                            <div>$(c \\cdot f(x))' = c \\cdot f'(x)$ <span class="text-sm text-purple-600">Las constantes se pueden sacar</span></div>
                            <div>$(f(x) + g(x))' = f'(x) + g'(x)$ <span class="text-sm text-purple-600">Derivar término a término</span></div>
                        </div>
                    </div>
                </div>
            `,
            detailedExample: `
                <div class="bg-stone-50 p-4 rounded-lg border border-stone-200 mt-6">
                    <h4 class="font-bold text-stone-800 mb-3">🔍 Ejemplo: $f(x) = 3x^4 + 2e^x - 5\\ln x + 7$</h4>
                    <div class="space-y-2 text-sm">
                        <p>Derivamos término a término:</p>
                        <ul class="list-disc list-inside space-y-1 ml-4">
                            <li>$(3x^4)' = 3 \\cdot 4x^3 = 12x^3$ (regla de potencia + constante)</li>
                            <li>$(2e^x)' = 2e^x$ (regla exponencial + constante)</li>
                            <li>$(-5\\ln x)' = -5 \\cdot \\frac{1}{x} = -\\frac{5}{x}$ (regla ln + constante)</li>
                            <li>$(7)' = 0$ (regla de constantes)</li>
                        </ul>
                        <div class="bg-emerald-100 p-3 rounded mt-3 text-center">
                            <strong>Respuesta:</strong> $f'(x) = 12x^3 + 2e^x - \\frac{5}{x}$
                        </div>
                    </div>
                </div>
            `
        },
        uk: {
            title: "Основні правила диференціювання",
            intro: "Ці правила є будівельними блоками для всього диференціювання. Опануйте їх перед переходом до правила ланцюга, добутку та частки.",
            formula: "",
            ruleText: "",
            whenToUse: `
                <div class="space-y-6">
                    <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h4 class="font-bold text-blue-900 mb-2">📐 Правило степеня</h4>
                        <div class="text-center text-lg mb-2">$(x^n)' = n \\cdot x^{n-1}$</div>
                        <p class="text-sm text-blue-800 mb-2">Застосовується для всіх дійсних чисел $n \\neq 0$</p>
                        <div class="grid grid-cols-2 gap-2 text-sm">
                            <div class="bg-white p-2 rounded">$(x^3)' = 3x^2$</div>
                            <div class="bg-white p-2 rounded">$(x^{-2})' = -2x^{-3}$</div>
                            <div class="bg-white p-2 rounded">$(\\sqrt{x})' = (x^{1/2})' = \\frac{1}{2\\sqrt{x}}$</div>
                            <div class="bg-white p-2 rounded">$(x)' = 1$</div>
                        </div>
                    </div>

                    <div class="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                        <h4 class="font-bold text-emerald-900 mb-2">📈 Експоненціальна функція</h4>
                        <div class="text-center text-lg mb-2">$(e^x)' = e^x$</div>
                        <p class="text-sm text-emerald-800 mb-2">Єдина функція, що дорівнює власній похідній!</p>
                        <div class="bg-white p-2 rounded text-sm">
                            Для інших основ: $(a^x)' = a^x \\cdot \\ln(a)$
                        </div>
                    </div>

                    <div class="bg-amber-50 p-4 rounded-lg border border-amber-100">
                        <h4 class="font-bold text-amber-900 mb-2">📊 Натуральний логарифм</h4>
                        <div class="text-center text-lg mb-2">$(\\ln x)' = \\frac{1}{x}$</div>
                        <p class="text-sm text-amber-800 mb-2">Застосовується для $x > 0$</p>
                        <div class="bg-white p-2 rounded text-sm">
                            Для інших основ: $(\\log_a x)' = \\frac{1}{x \\cdot \\ln(a)}$
                        </div>
                    </div>

                    <div class="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <h4 class="font-bold text-purple-900 mb-2">➕ Правила суми та констант</h4>
                        <div class="space-y-2 text-center">
                            <div>$(c)' = 0$ <span class="text-sm text-purple-600">Константи зникають</span></div>
                            <div>$(c \\cdot f(x))' = c \\cdot f'(x)$ <span class="text-sm text-purple-600">Константи можна винести</span></div>
                            <div>$(f(x) + g(x))' = f'(x) + g'(x)$ <span class="text-sm text-purple-600">Диференціювати член за членом</span></div>
                        </div>
                    </div>
                </div>
            `,
            detailedExample: `
                <div class="bg-stone-50 p-4 rounded-lg border border-stone-200 mt-6">
                    <h4 class="font-bold text-stone-800 mb-3">🔍 Приклад: $f(x) = 3x^4 + 2e^x - 5\\ln x + 7$</h4>
                    <div class="space-y-2 text-sm">
                        <p>Диференціюємо член за членом:</p>
                        <ul class="list-disc list-inside space-y-1 ml-4">
                            <li>$(3x^4)' = 3 \\cdot 4x^3 = 12x^3$ (правило степеня + константа)</li>
                            <li>$(2e^x)' = 2e^x$ (експоненціальне правило + константа)</li>
                            <li>$(-5\\ln x)' = -5 \\cdot \\frac{1}{x} = -\\frac{5}{x}$ (правило ln + константа)</li>
                            <li>$(7)' = 0$ (правило констант)</li>
                        </ul>
                        <div class="bg-emerald-100 p-3 rounded mt-3 text-center">
                            <strong>Відповідь:</strong> $f'(x) = 12x^3 + 2e^x - \\frac{5}{x}$
                        </div>
                    </div>
                </div>
            `
        }
    },
    chain: {
        no: {
            title: "Kjerneregelen",
            intro: "Kjerneregelen brukes når vi skal derivere sammensatte funksjoner - altså funksjoner inne i funksjoner.",
            formula: "$$f(x) = g(u(x)) \\implies f'(x) = g'(u) \\cdot u'(x)$$",
            ruleText: "Derivert ytre · Derivert kjerne",
            whenToUse: `
                <div class="mb-4">
                    <h4 class="font-bold text-stone-700 mb-2">📌 Når bruker du kjerneregelen?</h4>
                    <ul class="list-disc list-inside space-y-1 text-stone-600">
                        <li>Når du har en <strong>funksjon inne i en annen funksjon</strong></li>
                        <li>Når du ser <strong>potenser av uttrykk</strong> som $(2x+1)^3$ eller $(x^2-5)^{10}$</li>
                        <li>Når du har <strong>$e^{uttrykk}$</strong> eller <strong>$\\ln(uttrykk)$</strong> hvor "uttrykk" ikke bare er $x$</li>
                        <li>Når du har <strong>$\\sqrt{uttrykk}$</strong> hvor uttrykket er mer enn bare $x$</li>
                    </ul>
                </div>
            `,
            detailedExample: `
                <div class="bg-blue-50/50 p-4 rounded-lg border border-blue-100 mb-4">
                    <h4 class="font-bold text-blue-900 mb-3">🔍 Detaljert eksempel: $f(x) = (3x - 2)^4$</h4>

                    <div class="space-y-3 text-sm text-stone-700">
                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Steg 1: Identifiser ytre og indre funksjon</strong>
                            <div class="mt-2 ml-4">
                                <p>• <strong>Ytre funksjon:</strong> $g(u) = u^4$ (noe i 4. potens)</p>
                                <p>• <strong>Indre funksjon (kjernen):</strong> $u(x) = 3x - 2$</p>
                            </div>
                        </div>

                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Steg 2: Deriver ytre funksjonen (la kjernen stå)</strong>
                            <div class="mt-2 ml-4">
                                <p>$g'(u) = 4u^3 = 4(3x-2)^3$</p>
                                <p class="text-xs text-stone-500 italic mt-1">Bruker potensregelen: $(u^n)' = n \\cdot u^{n-1}$</p>
                            </div>
                        </div>

                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Steg 3: Deriver kjernen</strong>
                            <div class="mt-2 ml-4">
                                <p>$u'(x) = 3$</p>
                                <p class="text-xs text-stone-500 italic mt-1">Deriverer $3x - 2$ ledd for ledd</p>
                            </div>
                        </div>

                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Steg 4: Gang sammen (ytre · kjerne)</strong>
                            <div class="mt-2 ml-4">
                                <p>$$f'(x) = 4(3x-2)^3 \\cdot 3 = 12(3x-2)^3$$</p>
                            </div>
                        </div>

                        <div class="bg-emerald-50 p-3 rounded border border-emerald-200 mt-3">
                            <strong class="text-emerald-800">✅ Svar:</strong> $f'(x) = 12(3x-2)^3$
                        </div>
                    </div>
                </div>
            `
        },
        en: {
            title: "Chain Rule",
            intro: "The chain rule is used when differentiating composite functions - functions within functions.",
            formula: "$$f(x) = g(u(x)) \\implies f'(x) = g'(u) \\cdot u'(x)$$",
            ruleText: "Outer deriv · Inner deriv",
            whenToUse: `
                <div class="mb-4">
                    <h4 class="font-bold text-stone-700 mb-2">📌 When to use the chain rule?</h4>
                    <ul class="list-disc list-inside space-y-1 text-stone-600">
                        <li>When you have a <strong>function inside another function</strong></li>
                        <li>When you see <strong>powers of expressions</strong> like $(2x+1)^3$</li>
                        <li>When you have <strong>$e^{expression}$</strong> or <strong>$\\ln(expression)$</strong> where "expression" is not just $x$</li>
                        <li>When you have <strong>$\\sqrt{expression}$</strong> where the expression is more than just $x$</li>
                    </ul>
                </div>
            `,
            detailedExample: `
                <div class="bg-blue-50/50 p-4 rounded-lg border border-blue-100 mb-4">
                    <h4 class="font-bold text-blue-900 mb-3">🔍 Detailed example: $f(x) = (3x - 2)^4$</h4>

                    <div class="space-y-3 text-sm text-stone-700">
                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Step 1: Identify outer and inner function</strong>
                            <div class="mt-2 ml-4">
                                <p>• <strong>Outer function:</strong> $g(u) = u^4$</p>
                                <p>• <strong>Inner function:</strong> $u(x) = 3x - 2$</p>
                            </div>
                        </div>

                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Step 2: Differentiate outer (leave inner unchanged)</strong>
                            <div class="mt-2 ml-4">
                                <p>$g'(u) = 4u^3 = 4(3x-2)^3$</p>
                            </div>
                        </div>

                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Step 3: Differentiate inner</strong>
                            <div class="mt-2 ml-4">
                                <p>$u'(x) = 3$</p>
                            </div>
                        </div>

                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Step 4: Multiply (outer · inner)</strong>
                            <div class="mt-2 ml-4">
                                <p>$$f'(x) = 4(3x-2)^3 \\cdot 3 = 12(3x-2)^3$$</p>
                            </div>
                        </div>

                        <div class="bg-emerald-50 p-3 rounded border border-emerald-200 mt-3">
                            <strong class="text-emerald-800">✅ Answer:</strong> $f'(x) = 12(3x-2)^3$
                        </div>
                    </div>
                </div>
            `
        },
        es: {
            title: "Regla de la Cadena",
            intro: "La regla de la cadena se usa para derivar funciones compuestas - funciones dentro de funciones.",
            formula: "$$f(x) = g(u(x)) \\implies f'(x) = g'(u) \\cdot u'(x)$$",
            ruleText: "Deriv externa · Deriv interna",
            whenToUse: `
                <div class="mb-4">
                    <h4 class="font-bold text-stone-700 mb-2">📌 ¿Cuándo usar la regla de la cadena?</h4>
                    <ul class="list-disc list-inside space-y-1 text-stone-600">
                        <li>Cuando tienes una <strong>función dentro de otra función</strong></li>
                        <li>Cuando ves <strong>potencias de expresiones</strong> como $(2x+1)^3$</li>
                        <li>Cuando tienes <strong>$e^{expresión}$</strong> o <strong>$\\ln(expresión)$</strong></li>
                        <li>Cuando tienes <strong>$\\sqrt{expresión}$</strong></li>
                    </ul>
                </div>
            `,
            detailedExample: `
                <div class="bg-blue-50/50 p-4 rounded-lg border border-blue-100 mb-4">
                    <h4 class="font-bold text-blue-900 mb-3">🔍 Ejemplo detallado: $f(x) = (3x - 2)^4$</h4>

                    <div class="space-y-3 text-sm text-stone-700">
                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Paso 1: Identificar función externa e interna</strong>
                            <div class="mt-2 ml-4">
                                <p>• <strong>Función externa:</strong> $g(u) = u^4$</p>
                                <p>• <strong>Función interna:</strong> $u(x) = 3x - 2$</p>
                            </div>
                        </div>

                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Paso 2: Derivar externa (dejar interna sin cambios)</strong>
                            <div class="mt-2 ml-4">
                                <p>$g'(u) = 4u^3 = 4(3x-2)^3$</p>
                            </div>
                        </div>

                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Paso 3: Derivar interna</strong>
                            <div class="mt-2 ml-4">
                                <p>$u'(x) = 3$</p>
                            </div>
                        </div>

                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Paso 4: Multiplicar</strong>
                            <div class="mt-2 ml-4">
                                <p>$$f'(x) = 4(3x-2)^3 \\cdot 3 = 12(3x-2)^3$$</p>
                            </div>
                        </div>

                        <div class="bg-emerald-50 p-3 rounded border border-emerald-200 mt-3">
                            <strong class="text-emerald-800">✅ Respuesta:</strong> $f'(x) = 12(3x-2)^3$
                        </div>
                    </div>
                </div>
            `
        },
        uk: {
            title: "Правило ланцюга",
            intro: "Правило ланцюга використовується при диференціюванні складених функцій - функцій всередині функцій.",
            formula: "$$f(x) = g(u(x)) \\implies f'(x) = g'(u) \\cdot u'(x)$$",
            ruleText: "Зовнішня похідна · Внутрішня похідна",
            whenToUse: `
                <div class="mb-4">
                    <h4 class="font-bold text-stone-700 mb-2">📌 Коли використовувати правило ланцюга?</h4>
                    <ul class="list-disc list-inside space-y-1 text-stone-600">
                        <li>Коли у вас <strong>функція всередині іншої функції</strong></li>
                        <li>Коли ви бачите <strong>степені виразів</strong> як $(2x+1)^3$</li>
                        <li>Коли у вас <strong>$e^{вираз}$</strong> або <strong>$\\ln(вираз)$</strong></li>
                        <li>Коли у вас <strong>$\\sqrt{вираз}$</strong></li>
                    </ul>
                </div>
            `,
            detailedExample: `
                <div class="bg-blue-50/50 p-4 rounded-lg border border-blue-100 mb-4">
                    <h4 class="font-bold text-blue-900 mb-3">🔍 Детальний приклад: $f(x) = (3x - 2)^4$</h4>
                    <div class="space-y-3 text-sm text-stone-700">
                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Крок 1: Визначити зовнішню і внутрішню функції</strong>
                            <div class="mt-2 ml-4">
                                <p>• <strong>Зовнішня функція:</strong> $g(u) = u^4$</p>
                                <p>• <strong>Внутрішня функція:</strong> $u(x) = 3x - 2$</p>
                            </div>
                        </div>
                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Крок 2: Похідна зовнішньої (залишити внутрішню без змін)</strong>
                            <div class="mt-2 ml-4">
                                <p>$g'(u) = 4u^3 = 4(3x-2)^3$</p>
                            </div>
                        </div>
                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Крок 3: Похідна внутрішньої</strong>
                            <div class="mt-2 ml-4">
                                <p>$u'(x) = 3$</p>
                            </div>
                        </div>
                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Крок 4: Помножити</strong>
                            <div class="mt-2 ml-4">
                                <p>$$f'(x) = 4(3x-2)^3 \\cdot 3 = 12(3x-2)^3$$</p>
                            </div>
                        </div>
                        <div class="bg-emerald-50 p-3 rounded border border-emerald-200 mt-3">
                            <strong class="text-emerald-800">✅ Відповідь:</strong> $f'(x) = 12(3x-2)^3$
                        </div>
                    </div>
                </div>
            `
        }
    },
    product: {
        no: {
            title: "Produktregelen",
            intro: "Produktregelen brukes når vi skal derivere et produkt (ganging) av to funksjoner.",
            formula: "$$(u \\cdot v)' = u'v + uv'$$",
            ruleText: "u'v + uv'",
            whenToUse: `
                <div class="mb-4">
                    <h4 class="font-bold text-stone-700 mb-2">📌 Når bruker du produktregelen?</h4>
                    <ul class="list-disc list-inside space-y-1 text-stone-600">
                        <li>Når du har <strong>to funksjoner ganget sammen</strong>, for eksempel $x^2 \\cdot e^x$</li>
                        <li>Når begge delene <strong>inneholder $x$</strong> og varierer (ikke konstanter)</li>
                        <li>Når du har <strong>polynom ganget med eksponentialfunksjon</strong>: $x^3 \\cdot e^{2x}$</li>
                        <li>Når du har <strong>polynom ganget med logaritme</strong>: $x^2 \\cdot \\ln(x)$</li>
                        <li>Når du har <strong>trigonometriske funksjoner ganget med andre funksjoner</strong>: $x \\cdot \\sin(x)$</li>
                    </ul>
                    <div class="mt-3 p-3 bg-amber-50 border border-amber-200 rounded">
                        <p class="text-sm text-amber-900"><strong>💡 Tips:</strong> Hvis bare én faktor inneholder $x$, trenger du ikke produktregelen!
                        For eksempel: $(3x^2)' = 3 \\cdot 2x = 6x$ (konstanten 3 kan stå utenfor).</p>
                    </div>
                </div>
            `,
            detailedExample: `
                <div class="bg-blue-50/50 p-4 rounded-lg border border-blue-100 mb-4">
                    <h4 class="font-bold text-blue-900 mb-3">🔍 Detaljert eksempel: $f(x) = x^2 \\cdot e^{3x}$</h4>

                    <div class="space-y-3 text-sm text-stone-700">
                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Steg 1: Identifiser de to funksjonene</strong>
                            <div class="mt-2 ml-4">
                                <p>• $u = x^2$ (første faktor)</p>
                                <p>• $v = e^{3x}$ (andre faktor)</p>
                                <p class="text-xs text-stone-500 italic mt-2">Siden begge inneholder $x$, må vi bruke produktregelen!</p>
                            </div>
                        </div>

                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Steg 2: Deriver hver funksjon for seg</strong>
                            <div class="mt-2 ml-4">
                                <p>• $u' = 2x$ (potensregelen)</p>
                                <p>• $v' = 3e^{3x}$ (kjerneregelen på $e^{3x}$)</p>
                                <p class="text-xs text-stone-500 italic mt-2">Husk: $(e^{ax})' = a \\cdot e^{ax}$</p>
                            </div>
                        </div>

                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Steg 3: Bruk formelen $(u \\cdot v)' = u'v + uv'$</strong>
                            <div class="mt-2 ml-4">
                                <p>$$f'(x) = u'v + uv'$$</p>
                                <p>$$f'(x) = (2x)(e^{3x}) + (x^2)(3e^{3x})$$</p>
                                <p class="text-xs text-stone-500 italic mt-2">
                                    Første ledd: $u'$ ganget med $v$ (original)<br>
                                    Andre ledd: $u$ (original) ganget med $v'$
                                </p>
                            </div>
                        </div>

                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Steg 4: Forenkle (faktoriser hvis mulig)</strong>
                            <div class="mt-2 ml-4">
                                <p>$$f'(x) = 2xe^{3x} + 3x^2e^{3x}$$</p>
                                <p>$$f'(x) = e^{3x}(2x + 3x^2)$$</p>
                                <p>$$f'(x) = xe^{3x}(2 + 3x)$$</p>
                                <p class="text-xs text-stone-500 italic mt-2">Vi faktoriserer ut fellesfaktorer for et enklere svar</p>
                            </div>
                        </div>

                        <div class="bg-emerald-50 p-3 rounded border border-emerald-200 mt-3">
                            <strong class="text-emerald-800">✅ Svar:</strong> $f'(x) = xe^{3x}(2 + 3x)$
                        </div>
                    </div>
                </div>

                <div class="bg-purple-50 p-4 rounded-lg border border-purple-100 mt-4">
                    <h5 class="font-bold text-purple-900 mb-2">⚠️ Vanlige feil:</h5>
                    <ul class="list-disc list-inside space-y-1 text-sm text-purple-800">
                        <li><strong>FEIL:</strong> $(x^2 \\cdot e^{3x})' = 2x \\cdot 3e^{3x}$ ❌ (Du kan ikke bare gange derivertene!)</li>
                        <li><strong>RIKTIG:</strong> Du må bruke formelen $u'v + uv'$ ✅</li>
                        <li>Husk å derivere <strong>begge</strong> funksjoner</li>
                        <li>Glem ikke å ta med den <strong>originale</strong> funksjonen i hvert ledd</li>
                    </ul>
                </div>
            `
        },
        en: {
            title: "Product Rule",
            intro: "The product rule is used when differentiating a product of two functions.",
            formula: "$$(u \\cdot v)' = u'v + uv'$$",
            ruleText: "u'v + uv'",
            whenToUse: `
                <div class="mb-4">
                    <h4 class="font-bold text-stone-700 mb-2">📌 When to use the product rule?</h4>
                    <ul class="list-disc list-inside space-y-1 text-stone-600">
                        <li>When you have <strong>two functions multiplied together</strong>, e.g., $x^2 \\cdot e^x$</li>
                        <li>When both parts <strong>contain $x$</strong> (not constants)</li>
                        <li>When you have <strong>polynomial times exponential</strong>: $x^3 \\cdot e^{2x}$</li>
                        <li>When you have <strong>polynomial times logarithm</strong>: $x^2 \\cdot \\ln(x)$</li>
                    </ul>
                </div>
            `,
            detailedExample: `
                <div class="bg-blue-50/50 p-4 rounded-lg border border-blue-100 mb-4">
                    <h4 class="font-bold text-blue-900 mb-3">🔍 Detailed example: $f(x) = x^2 \\cdot e^{3x}$</h4>

                    <div class="space-y-3 text-sm text-stone-700">
                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Step 1: Identify the two functions</strong>
                            <div class="mt-2 ml-4">
                                <p>• $u = x^2$</p>
                                <p>• $v = e^{3x}$</p>
                            </div>
                        </div>

                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Step 2: Differentiate each function</strong>
                            <div class="mt-2 ml-4">
                                <p>• $u' = 2x$</p>
                                <p>• $v' = 3e^{3x}$</p>
                            </div>
                        </div>

                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Step 3: Apply formula $(u \\cdot v)' = u'v + uv'$</strong>
                            <div class="mt-2 ml-4">
                                <p>$$f'(x) = (2x)(e^{3x}) + (x^2)(3e^{3x})$$</p>
                            </div>
                        </div>

                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Step 4: Simplify</strong>
                            <div class="mt-2 ml-4">
                                <p>$$f'(x) = xe^{3x}(2 + 3x)$$</p>
                            </div>
                        </div>

                        <div class="bg-emerald-50 p-3 rounded border border-emerald-200 mt-3">
                            <strong class="text-emerald-800">✅ Answer:</strong> $f'(x) = xe^{3x}(2 + 3x)$
                        </div>
                    </div>
                </div>

                <div class="bg-purple-50 p-4 rounded-lg border border-purple-100 mt-4">
                    <h5 class="font-bold text-purple-900 mb-2">⚠️ Common Mistakes:</h5>
                    <ul class="list-disc list-inside space-y-1 text-sm text-purple-800">
                        <li><strong>WRONG:</strong> $(x^2 \\cdot e^{3x})' = 2x \\cdot 3e^{3x}$ ❌ (You can't just multiply the derivatives!)</li>
                        <li><strong>CORRECT:</strong> You must use the formula $u'v + uv'$ ✅</li>
                        <li>Remember to differentiate <strong>both</strong> functions</li>
                        <li>Don't forget to include the <strong>original</strong> function in each term</li>
                    </ul>
                </div>
            `
        },
        es: {
            title: "Regla del Producto",
            intro: "La regla del producto se usa para derivar el producto de dos funciones.",
            formula: "$$(u \\cdot v)' = u'v + uv'$$",
            ruleText: "u'v + uv'",
            whenToUse: `
                <div class="mb-4">
                    <h4 class="font-bold text-stone-700 mb-2">📌 ¿Cuándo usar la regla del producto?</h4>
                    <ul class="list-disc list-inside space-y-1 text-stone-600">
                        <li>Cuando tienes <strong>dos funciones multiplicadas</strong>, ej. $x^2 \\cdot e^x$</li>
                        <li>Cuando ambas partes <strong>contienen $x$</strong></li>
                        <li>Cuando tienes <strong>polinomio por exponencial</strong>: $x^3 \\cdot e^{2x}$</li>
                    </ul>
                </div>
            `,
            detailedExample: `
                <div class="bg-blue-50/50 p-4 rounded-lg border border-blue-100 mb-4">
                    <h4 class="font-bold text-blue-900 mb-3">🔍 Ejemplo: $f(x) = x^2 \\cdot e^{3x}$</h4>
                    <div class="space-y-3 text-sm text-stone-700">
                        <div class="bg-emerald-50 p-3 rounded border border-emerald-200">
                            <strong class="text-emerald-800">✅ Respuesta:</strong> $f'(x) = xe^{3x}(2 + 3x)$
                        </div>
                    </div>
                </div>

                <div class="bg-purple-50 p-4 rounded-lg border border-purple-100 mt-4">
                    <h5 class="font-bold text-purple-900 mb-2">⚠️ Errores Comunes:</h5>
                    <ul class="list-disc list-inside space-y-1 text-sm text-purple-800">
                        <li><strong>INCORRECTO:</strong> $(x^2 \\cdot e^{3x})' = 2x \\cdot 3e^{3x}$ ❌ (¡No puedes solo multiplicar las derivadas!)</li>
                        <li><strong>CORRECTO:</strong> Debes usar la fórmula $u'v + uv'$ ✅</li>
                        <li>Recuerda derivar <strong>ambas</strong> funciones</li>
                        <li>No olvides incluir la función <strong>original</strong> en cada término</li>
                    </ul>
                </div>
            `
        },
        uk: {
            title: "Правило добутку",
            intro: "Правило добутку використовується при диференціюванні добутку двох функцій.",
            formula: "$$(u \\cdot v)' = u'v + uv'$$",
            ruleText: "u'v + uv'",
            whenToUse: `
                <div class="mb-4">
                    <h4 class="font-bold text-stone-700 mb-2">📌 Коли використовувати правило добутку?</h4>
                    <ul class="list-disc list-inside space-y-1 text-stone-600">
                        <li>Коли у вас <strong>дві функції помножені разом</strong>, напр. $x^2 \\cdot e^x$</li>
                        <li>Коли обидві частини <strong>містять $x$</strong></li>
                        <li>Коли у вас <strong>поліном помножений на експоненту</strong>: $x^3 \\cdot e^{2x}$</li>
                    </ul>
                </div>
            `,
            detailedExample: `
                <div class="bg-blue-50/50 p-4 rounded-lg border border-blue-100 mb-4">
                    <h4 class="font-bold text-blue-900 mb-3">🔍 Приклад: $f(x) = x^2 \\cdot e^{3x}$</h4>
                    <div class="space-y-3 text-sm text-stone-700">
                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Крок 1: Визначити дві функції</strong>
                            <div class="mt-2 ml-4">
                                <p>• $u = x^2$</p>
                                <p>• $v = e^{3x}$</p>
                            </div>
                        </div>
                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Крок 2: Знайти похідні</strong>
                            <div class="mt-2 ml-4">
                                <p>• $u' = 2x$</p>
                                <p>• $v' = 3e^{3x}$</p>
                            </div>
                        </div>
                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Крок 3: Застосувати формулу</strong>
                            <div class="mt-2 ml-4">
                                <p>$$f'(x) = (2x)(e^{3x}) + (x^2)(3e^{3x})$$</p>
                            </div>
                        </div>
                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Крок 4: Спростити</strong>
                            <div class="mt-2 ml-4">
                                <p>$$f'(x) = xe^{3x}(2 + 3x)$$</p>
                            </div>
                        </div>
                        <div class="bg-emerald-50 p-3 rounded border border-emerald-200">
                            <strong class="text-emerald-800">✅ Відповідь:</strong> $f'(x) = xe^{3x}(2 + 3x)$
                        </div>
                    </div>
                </div>

                <div class="bg-purple-50 p-4 rounded-lg border border-purple-100 mt-4">
                    <h5 class="font-bold text-purple-900 mb-2">⚠️ Поширені Помилки:</h5>
                    <ul class="list-disc list-inside space-y-1 text-sm text-purple-800">
                        <li><strong>НЕПРАВИЛЬНО:</strong> $(x^2 \\cdot e^{3x})' = 2x \\cdot 3e^{3x}$ ❌ (Не можна просто перемножити похідні!)</li>
                        <li><strong>ПРАВИЛЬНО:</strong> Потрібно використовувати формулу $u'v + uv'$ ✅</li>
                        <li>Пам'ятайте диференціювати <strong>обидві</strong> функції</li>
                        <li>Не забувайте включати <strong>оригінальну</strong> функцію в кожен доданок</li>
                    </ul>
                </div>
            `
        }
    },
    quotient: {
        no: {
            title: "Brøkregelen",
            intro: "Brøkregelen brukes når vi skal derivere en brøk hvor både teller og nevner inneholder $x$.",
            formula: "$$\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}$$",
            ruleText: "(u'v - uv') / v²",
            whenToUse: `
                <div class="mb-4">
                    <h4 class="font-bold text-stone-700 mb-2">📌 Når bruker du brøkregelen?</h4>
                    <ul class="list-disc list-inside space-y-1 text-stone-600">
                        <li>Når du har en <strong>brøk</strong> hvor både teller og nevner inneholder $x$</li>
                        <li>Når du har <strong>rasjonale funksjoner</strong> som $\\frac{x^2 + 1}{x - 3}$</li>
                        <li>Når du har <strong>$\\frac{e^x}{x}$</strong> eller <strong>$\\frac{\\ln(x)}{x^2}$</strong></li>
                    </ul>
                    <div class="mt-3 p-3 bg-amber-50 border border-amber-200 rounded">
                        <p class="text-sm text-amber-900"><strong>💡 Tips:</strong> Hvis bare telleren inneholder $x$, kan du ofte bruke enklere regler:
                        <br>• $\\frac{x^2}{3} = \\frac{1}{3}x^2$ → bruk potensregelen
                        <br>• Men $\\frac{x^2}{x+1}$ → bruk brøkregelen (begge har $x$)
                        </p>
                    </div>
                    <div class="mt-3 p-3 bg-purple-50 border border-purple-200 rounded">
                        <p class="text-sm text-purple-900"><strong>🎯 Huskeregel:</strong> "lo-d-hi minus hi-d-lo over lo-lo"
                        <br>• <strong>lo</strong> (low) = nevner
                        <br>• <strong>hi</strong> (high) = teller
                        <br>• <strong>d</strong> = derivert
                        <br>Altså: (nevner · teller') - (teller · nevner') delt på nevner²
                        </p>
                    </div>
                </div>
            `,
            detailedExample: `
                <div class="bg-blue-50/50 p-4 rounded-lg border border-blue-100 mb-4">
                    <h4 class="font-bold text-blue-900 mb-3">🔍 Detaljert eksempel: $f(x) = \\frac{x^2 + 1}{2x - 3}$</h4>

                    <div class="space-y-3 text-sm text-stone-700">
                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Steg 1: Identifiser teller og nevner</strong>
                            <div class="mt-2 ml-4">
                                <p>• $u = x^2 + 1$ (teller)</p>
                                <p>• $v = 2x - 3$ (nevner)</p>
                                <p class="text-xs text-stone-500 italic mt-2">Siden begge inneholder $x$, må vi bruke brøkregelen!</p>
                            </div>
                        </div>

                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Steg 2: Deriver teller og nevner hver for seg</strong>
                            <div class="mt-2 ml-4">
                                <p>• $u' = 2x$ (deriverer $x^2 + 1$ ledd for ledd)</p>
                                <p>• $v' = 2$ (deriverer $2x - 3$)</p>
                            </div>
                        </div>

                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Steg 3: Bruk formelen $\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}$</strong>
                            <div class="mt-2 ml-4">
                                <p>$$f'(x) = \\frac{u'v - uv'}{v^2}$$</p>
                                <p class="mt-2">Setter inn:</p>
                                <p>$$f'(x) = \\frac{(2x)(2x-3) - (x^2+1)(2)}{(2x-3)^2}$$</p>
                                <p class="text-xs text-stone-500 italic mt-2">
                                    Teller: (derivert teller · original nevner) - (original teller · derivert nevner)<br>
                                    Nevner: (original nevner)²
                                </p>
                            </div>
                        </div>

                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Steg 4: Forenkle telleren</strong>
                            <div class="mt-2 ml-4">
                                <p class="mb-2">Gang ut i telleren:</p>
                                <p>$2x(2x-3) = 4x^2 - 6x$</p>
                                <p>$(x^2+1)(2) = 2x^2 + 2$</p>
                                <p class="mt-2">Trekk fra:</p>
                                <p>$(4x^2 - 6x) - (2x^2 + 2)$</p>
                                <p>$= 4x^2 - 6x - 2x^2 - 2$</p>
                                <p>$= 2x^2 - 6x - 2$</p>
                            </div>
                        </div>

                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Steg 5: Skriv ferdig svar</strong>
                            <div class="mt-2 ml-4">
                                <p>$$f'(x) = \\frac{2x^2 - 6x - 2}{(2x-3)^2}$$</p>
                                <p class="text-xs text-stone-500 italic mt-2">Vi kan også faktorisere teller hvis ønskelig: $\\frac{2(x^2 - 3x - 1)}{(2x-3)^2}$</p>
                            </div>
                        </div>

                        <div class="bg-emerald-50 p-3 rounded border border-emerald-200 mt-3">
                            <strong class="text-emerald-800">✅ Svar:</strong> $f'(x) = \\frac{2x^2 - 6x - 2}{(2x-3)^2}$
                        </div>
                    </div>
                </div>

                <div class="bg-purple-50 p-4 rounded-lg border border-purple-100 mt-4">
                    <h5 class="font-bold text-purple-900 mb-2">⚠️ Vanlige feil:</h5>
                    <ul class="list-disc list-inside space-y-1 text-sm text-purple-800">
                        <li><strong>FEIL:</strong> $\\left(\\frac{u}{v}\\right)' = \\frac{u'}{v'}$ ❌ (Du kan ikke bare derivere teller og nevner hver for seg!)</li>
                        <li><strong>FEIL:</strong> Glemme minustegnet: Det er $u'v - uv'$ (ikke pluss!)</li>
                        <li><strong>FEIL:</strong> Glemme å kvadrere nevneren: Det er $v^2$ ikke bare $v$</li>
                        <li><strong>RIKTIG:</strong> Bruk formelen nøyaktig: $\\frac{u'v - uv'}{v^2}$ ✅</li>
                        <li>Vær <strong>ekstra nøye</strong> med parenteser når du regner ut $(uv')$</li>
                    </ul>
                </div>

                <div class="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
                    <h5 class="font-bold text-blue-900 mb-2">💡 Alternativ: Når kan du unngå brøkregelen?</h5>
                    <p class="text-sm text-blue-800 mb-2">Noen ganger kan du omskrive brøken for å slippe brøkregelen:</p>
                    <ul class="list-disc list-inside space-y-1 text-sm text-blue-800">
                        <li>$\\frac{1}{x^2} = x^{-2}$ → bruk potensregelen: $(x^{-2})' = -2x^{-3}$</li>
                        <li>$\\frac{x^3}{x} = x^2$ → forenkle først, så deriver: $(x^2)' = 2x$</li>
                        <li>$\\frac{\\sqrt{x}}{x} = \\frac{x^{1/2}}{x} = x^{-1/2}$ → bruk potensregelen</li>
                    </ul>
                </div>
            `
        },
        en: {
            title: "Quotient Rule",
            intro: "The quotient rule is used when differentiating a fraction where both numerator and denominator contain $x$.",
            formula: "$$\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}$$",
            ruleText: "(u'v - uv') / v²",
            whenToUse: `
                <div class="mb-4">
                    <h4 class="font-bold text-stone-700 mb-2">📌 When to use the quotient rule?</h4>
                    <ul class="list-disc list-inside space-y-1 text-stone-600">
                        <li>When you have a <strong>fraction</strong> where both numerator and denominator contain $x$</li>
                        <li>When you have <strong>rational functions</strong> like $\\frac{x^2 + 1}{x - 3}$</li>
                        <li>When you have <strong>$\\frac{e^x}{x}$</strong> or <strong>$\\frac{\\ln(x)}{x^2}$</strong></li>
                    </ul>
                    <div class="mt-3 p-3 bg-purple-50 border border-purple-200 rounded">
                        <p class="text-sm text-purple-900"><strong>🎯 Memory aid:</strong> "lo-d-hi minus hi-d-lo over lo-lo"
                        <br>• <strong>lo</strong> = denominator (bottom)
                        <br>• <strong>hi</strong> = numerator (top)
                        <br>• <strong>d</strong> = derivative
                        </p>
                    </div>
                </div>
            `,
            detailedExample: `
                <div class="bg-blue-50/50 p-4 rounded-lg border border-blue-100 mb-4">
                    <h4 class="font-bold text-blue-900 mb-3">🔍 Detailed example: $f(x) = \\frac{x^2 + 1}{2x - 3}$</h4>

                    <div class="space-y-3 text-sm text-stone-700">
                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Step 1: Identify numerator and denominator</strong>
                            <div class="mt-2 ml-4">
                                <p>• $u = x^2 + 1$ (numerator)</p>
                                <p>• $v = 2x - 3$ (denominator)</p>
                            </div>
                        </div>

                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Step 2: Differentiate each</strong>
                            <div class="mt-2 ml-4">
                                <p>• $u' = 2x$</p>
                                <p>• $v' = 2$</p>
                            </div>
                        </div>

                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Step 3: Apply formula</strong>
                            <div class="mt-2 ml-4">
                                <p>$$f'(x) = \\frac{(2x)(2x-3) - (x^2+1)(2)}{(2x-3)^2}$$</p>
                            </div>
                        </div>

                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Step 4: Simplify</strong>
                            <div class="mt-2 ml-4">
                                <p>$$f'(x) = \\frac{2x^2 - 6x - 2}{(2x-3)^2}$$</p>
                            </div>
                        </div>

                        <div class="bg-emerald-50 p-3 rounded border border-emerald-200 mt-3">
                            <strong class="text-emerald-800">✅ Answer:</strong> $f'(x) = \\frac{2x^2 - 6x - 2}{(2x-3)^2}$
                        </div>
                    </div>

                <div class="bg-purple-50 p-4 rounded-lg border border-purple-100 mt-4">
                    <h5 class="font-bold text-purple-900 mb-2">⚠️ Common Mistakes:</h5>
                    <ul class="list-disc list-inside space-y-1 text-sm text-purple-800">
                        <li><strong>WRONG:</strong> $\\left(\\frac{u}{v}\\right)' = \\frac{u'}{v'}$ ❌ (You can't just differentiate numerator and denominator separately!)</li>
                        <li><strong>WRONG:</strong> Forgetting the minus sign: It's $u'v - uv'$ (not plus!)</li>
                        <li><strong>WRONG:</strong> Forgetting to square the denominator: It's $v^2$ not just $v$</li>
                        <li><strong>CORRECT:</strong> Use the formula exactly: $\\frac{u'v - uv'}{v^2}$ ✅</li>
                        <li>Be <strong>extra careful</strong> with parentheses when calculating $(uv')$</li>
                    </ul>
                </div>

                <div class="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
                    <h5 class="font-bold text-blue-900 mb-2">💡 Alternative: When can you avoid the quotient rule?</h5>
                    <p class="text-sm text-blue-800 mb-2">Sometimes you can rewrite the fraction to avoid the quotient rule:</p>
                    <ul class="list-disc list-inside space-y-1 text-sm text-blue-800">
                        <li>$\\frac{1}{x^2} = x^{-2}$ → use power rule: $(x^{-2})' = -2x^{-3}$</li>
                        <li>$\\frac{x^3}{x} = x^2$ → simplify first, then differentiate: $(x^2)' = 2x$</li>
                        <li>$\\frac{\\sqrt{x}}{x} = \\frac{x^{1/2}}{x} = x^{-1/2}$ → use power rule</li>
                    </ul>
                </div>
                </div>
            `
        },
        es: {
            title: "Regla del Cociente",
            intro: "La regla del cociente se usa para derivar una fracción donde numerador y denominador contienen $x$.",
            formula: "$$\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}$$",
            ruleText: "(u'v - uv') / v²",
            whenToUse: `
                <div class="mb-4">
                    <h4 class="font-bold text-stone-700 mb-2">📌 ¿Cuándo usar?</h4>
                    <ul class="list-disc list-inside space-y-1 text-stone-600">
                        <li>Cuando tienes una <strong>fracción</strong> con $x$ en numerador y denominador</li>
                    </ul>
                </div>
            `,
            detailedExample: `
                <div class="bg-blue-50/50 p-4 rounded-lg border border-blue-100 mb-4">
                    <h4 class="font-bold text-blue-900 mb-3">🔍 Ejemplo: $f(x) = \\frac{x^2 + 1}{2x - 3}$</h4>
                    <div class="bg-emerald-50 p-3 rounded border border-emerald-200">
                        <strong class="text-emerald-800">✅ Respuesta:</strong> $f'(x) = \\frac{2x^2 - 6x - 2}{(2x-3)^2}$
                    </div>
                </div>

                <div class="bg-purple-50 p-4 rounded-lg border border-purple-100 mt-4">
                    <h5 class="font-bold text-purple-900 mb-2">⚠️ Errores Comunes:</h5>
                    <ul class="list-disc list-inside space-y-1 text-sm text-purple-800">
                        <li><strong>INCORRECTO:</strong> $\\left(\\frac{u}{v}\\right)' = \\frac{u'}{v'}$ ❌ (¡No puedes solo derivar numerador y denominador por separado!)</li>
                        <li><strong>INCORRECTO:</strong> Olvidar el signo menos: Es $u'v - uv'$ (¡no más!)</li>
                        <li><strong>INCORRECTO:</strong> Olvidar elevar al cuadrado el denominador: Es $v^2$ no solo $v$</li>
                        <li><strong>CORRECTO:</strong> Usa la fórmula exactamente: $\\frac{u'v - uv'}{v^2}$ ✅</li>
                        <li>Ten <strong>mucho cuidado</strong> con los paréntesis al calcular $(uv')$</li>
                    </ul>
                </div>

                <div class="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
                    <h5 class="font-bold text-blue-900 mb-2">💡 Alternativa: ¿Cuándo puedes evitar la regla del cociente?</h5>
                    <p class="text-sm text-blue-800 mb-2">A veces puedes reescribir la fracción para evitar la regla del cociente:</p>
                    <ul class="list-disc list-inside space-y-1 text-sm text-blue-800">
                        <li>$\\frac{1}{x^2} = x^{-2}$ → usa regla de potencia: $(x^{-2})' = -2x^{-3}$</li>
                        <li>$\\frac{x^3}{x} = x^2$ → simplifica primero, luego deriva: $(x^2)' = 2x$</li>
                        <li>$\\frac{\\sqrt{x}}{x} = \\frac{x^{1/2}}{x} = x^{-1/2}$ → usa regla de potencia</li>
                    </ul>
                </div>
            `
        },
        uk: {
            title: "Правило частки",
            intro: "Правило частки використовується при диференціюванні дробу, де чисельник і знаменник містять $x$.",
            formula: "$$\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}$$",
            ruleText: "(u'v - uv') / v²",
            whenToUse: `
                <div class="mb-4">
                    <h4 class="font-bold text-stone-700 mb-2">📌 Коли використовувати правило частки?</h4>
                    <ul class="list-disc list-inside space-y-1 text-stone-600">
                        <li>Коли у вас <strong>дріб</strong> де чисельник і знаменник містять $x$</li>
                        <li>Коли у вас <strong>раціональні функції</strong> як $\\frac{x^2 + 1}{x - 3}$</li>
                        <li>Коли у вас <strong>$\\frac{e^x}{x}$</strong> або <strong>$\\frac{\\ln(x)}{x^2}$</strong></li>
                    </ul>
                    <div class="mt-3 p-3 bg-purple-50 border border-purple-200 rounded">
                        <p class="text-sm text-purple-900"><strong>🎯 Підказка:</strong> "знаменник-похідна-чисельник мінус чисельник-похідна-знаменник, все поділене на знаменник-квадрат"</p>
                    </div>
                </div>
            `,
            detailedExample: `
                <div class="bg-blue-50/50 p-4 rounded-lg border border-blue-100 mb-4">
                    <h4 class="font-bold text-blue-900 mb-3">🔍 Приклад: $f(x) = \\frac{x^2 + 1}{2x - 3}$</h4>
                    <div class="space-y-3 text-sm text-stone-700">
                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Крок 1: Визначити чисельник і знаменник</strong>
                            <div class="mt-2 ml-4">
                                <p>• $u = x^2 + 1$ (чисельник)</p>
                                <p>• $v = 2x - 3$ (знаменник)</p>
                            </div>
                        </div>
                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Крок 2: Знайти похідні</strong>
                            <div class="mt-2 ml-4">
                                <p>• $u' = 2x$</p>
                                <p>• $v' = 2$</p>
                            </div>
                        </div>
                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Крок 3: Застосувати формулу</strong>
                            <div class="mt-2 ml-4">
                                <p>$$f'(x) = \\frac{(2x)(2x-3) - (x^2+1)(2)}{(2x-3)^2}$$</p>
                            </div>
                        </div>
                        <div class="bg-white p-3 rounded border border-blue-100">
                            <strong class="text-blue-700">Крок 4: Спростити</strong>
                            <div class="mt-2 ml-4">
                                <p>$$f'(x) = \\frac{2x^2 - 6x - 2}{(2x-3)^2}$$</p>
                            </div>
                        </div>
                        <div class="bg-emerald-50 p-3 rounded border border-emerald-200">
                            <strong class="text-emerald-800">✅ Відповідь:</strong> $f'(x) = \\frac{2x^2 - 6x - 2}{(2x-3)^2}$
                        </div>
                    </div>
                </div>

                <div class="bg-purple-50 p-4 rounded-lg border border-purple-100 mt-4">
                    <h5 class="font-bold text-purple-900 mb-2">⚠️ Поширені Помилки:</h5>
                    <ul class="list-disc list-inside space-y-1 text-sm text-purple-800">
                        <li><strong>НЕПРАВИЛЬНО:</strong> $\\left(\\frac{u}{v}\\right)' = \\frac{u'}{v'}$ ❌ (Не можна просто диференціювати чисельник і знаменник окремо!)</li>
                        <li><strong>НЕПРАВИЛЬНО:</strong> Забути знак мінус: Це $u'v - uv'$ (не плюс!)</li>
                        <li><strong>НЕПРАВИЛЬНО:</strong> Забути піднести знаменник до квадрату: Це $v^2$, а не просто $v$</li>
                        <li><strong>ПРАВИЛЬНО:</strong> Використовуйте формулу точно: $\\frac{u'v - uv'}{v^2}$ ✅</li>
                        <li>Будьте <strong>особливо обережні</strong> з дужками при обчисленні $(uv')$</li>
                    </ul>
                </div>

                <div class="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
                    <h5 class="font-bold text-blue-900 mb-2">💡 Альтернатива: Коли можна уникнути правила частки?</h5>
                    <p class="text-sm text-blue-800 mb-2">Іноді можна переписати дріб, щоб уникнути правила частки:</p>
                    <ul class="list-disc list-inside space-y-1 text-sm text-blue-800">
                        <li>$\\frac{1}{x^2} = x^{-2}$ → використовуйте правило степеня: $(x^{-2})' = -2x^{-3}$</li>
                        <li>$\\frac{x^3}{x} = x^2$ → спростіть спочатку, потім диференціюйте: $(x^2)' = 2x$</li>
                        <li>$\\frac{\\sqrt{x}}{x} = \\frac{x^{1/2}}{x} = x^{-1/2}$ → використовуйте правило степеня</li>
                    </ul>
                </div>
            `
        }
    }
};
