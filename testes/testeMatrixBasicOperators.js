/* ----------------------------------------------------------------------------
 * File:     testes/testeMatrixBasicOperators.js
 * Authors:  SrAqua
 * ------------------------------------------------------------------------- */

const { Matrix } = require("../src/core/matrix");
const { IdentityMatrix } = require("../src/core/identityMatrix");
const { ZeroMatrix } = require("../src/core/zeroMatrix");
const { log } = require("../src/utils/logger");

log("=== Testes de Operadores Básicos de Matrizes ===\n");

// Matrizes simples para testar
const A = new Matrix(2, 2, [
    [1, 2],
    [3, 4]
]);

const B = new Matrix(2, 2, [
    [5, 6],
    [7, 8]
]);

const I = new IdentityMatrix(2);
const Z = new ZeroMatrix(2);

log("A =");
A.prettyPrint();
log("\nB =");
B.prettyPrint();
log("\nI =");
I.prettyPrint();
log("\nZ =");
Z.prettyPrint();
log("\n------------------------------\n");

// 1. Teste Add
log("A + B =");
A.add(B).prettyPrint();

// 2. Teste Negative
log("\n-A =");
A.neg().prettyPrint();

// 3. Teste Sub
log("\nA - B =");
A.sub(B).prettyPrint();

// 4. Teste Multiplicação de Matrizes
log("\nA * B =");
A.mul(B).prettyPrint();

// 5. Teste Multiplicação por Escalar
log("\nA * 3 =");
A.scalarMul(3).prettyPrint();

// 6. Testar identidade em multiplicação
log("\nA * I =  (deve dar A)");
A.mul(I).prettyPrint();

// 7. Testar zero em adição
log("\nA + Z =  (deve dar A)");
A.add(Z).prettyPrint();

// 8. Testar I * B
log("\nI * B =  (deve dar B)");
I.mul(B).prettyPrint();

log("\n=== Fim dos testes ===");
