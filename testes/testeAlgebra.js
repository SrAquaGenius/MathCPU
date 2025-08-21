/* ----------------------------------------------------------------------------
 * File:     testes/testeAlgebra.js
 * Authors:  SrAqua
 * ------------------------------------------------------------------------- */

const { somar, subtrair, multiplicar, dividir } = require("../src/mathcore/algebra");

console.log("=== Testes Álgebra ===");
console.log("2 + 3 =", somar(2, 3)); // 5
console.log("5 - 2 =", subtrair(5, 2)); // 3
console.log("4 * 6 =", multiplicar(4, 6)); // 24
console.log("8 / 2 =", dividir(8, 2)); // 4
console.log("8 / 0 =", dividir(8, 0)); // erro
