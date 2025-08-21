/* ----------------------------------------------------------------------------
 * File:     src/core/algebra.js
 * Authors:  SrAqua
 * ------------------------------------------------------------------------- */

function somar(a, b) {
    return a + b;
}

function subtrair(a, b) {
    return a - b;
}

function multiplicar(a, b) {
    return a * b;
}

function dividir(a, b) {
    if (b === 0) return "Erro: divisão por zero";
    return a / b;
}

// cache de fatoriais já calculados
let fatorialCache = { 0: 1, 1: 1 };

/**
 * @brief Calcula o fatorial de n usando memoização.
 * @param {number} n - Número inteiro não negativo.
 * @returns {number|string} fatorial de n ou mensagem de erro.
 */
function fatorial(n) {
    if (n < 0) return "Erro: fatorial indefinido para negativos";
    if (n > 170) return "Erro: valor demasiado grande (overflow em JS)";

    if (fatorialCache[n] !== undefined) {
        return fatorialCache[n]; // devolve da cache
    }

    let resultado = n * fatorial(n - 1);
    fatorialCache[n] = resultado; // guarda na cache
    return resultado;
}

module.exports = { somar, subtrair, multiplicar, dividir, fatorial };
