/* ----------------------------------------------------------------------------
 * File:     src/parser/parserEDO.js
 * Authors:  SrAqua
 * ------------------------------------------------------------------------- */

/**
 * Parser de EDO no formato:
 *   x' = -2x + y^3
 *   y' = y - x^2
 */
function parseEDOSystem(text) {
    let lines = text.split("\n")
        .map(l => l.trim())
        .filter(l => l.length > 0);

    // 1. Identificar variáveis e equações
    let variables = [];
    let equations = [];

    for (let line of lines) {

        // Ex: "x' = -2x + y^3"
        const match = line.match(/^([a-zA-Z]+)'\s*=\s*(.+)$/);

        if (!match)
            throw new Error(`Linha inválida: ${line}`);

        const v = match[1];       // ex: "x"
        const expr = match[2];    // ex: "-2x + y^3"

        variables.push(v);
        equations.push(expr);
    }

    const dim = variables.length;

    // 2. Converter cada expressão numa função JavaScript
    const funcs = equations.map(expr => compileExpression(expr, variables));

    // 3. Construir f(x)
    const f = (x) => funcs.map(fn => fn(...x));

    return { dim, variables, f };
}

/**
 * Compila uma expressão matemática (string) numa função JS.
 */
function compileExpression(expr, vars) {

    // Inserir * onde falta: 2x, xy, 3xy, x y → 2*x, x*y
    // 1) Entre número e variável
    expr = expr.replace(/(\d)([a-zA-Z])/g, "$1*$2");
    // 2) Entre variável e variável
    expr = expr.replace(/([a-zA-Z])([a-zA-Z])/g, "$1*$2");
    // 3) Entre variável e número (raro)
    expr = expr.replace(/([a-zA-Z])(\d)/g, "$1*$2");

    // Potências x^3 → x**3
    expr = expr.replace(/\^/g, "**");

    // Criar assinatura da função: (x, y, z, ...)
    const args = vars.join(",");

    // Criar a função com new Function
    return new Function(args, `return ${expr};`);
}

module.exports = { parseEDOSystem };
