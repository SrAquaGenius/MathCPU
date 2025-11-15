/* ----------------------------------------------------------------------------
 * File:     testes/testeMatrixMediumOperators.js
 * Authors:  SrAqua
 * ------------------------------------------------------------------------- */

const { Matrix } = require("../src/core/matrix");
const { log } = require("../src/utils/logger");

log("=== Testes de Operadores de Nível Médios de Matrizes ===\n");

// ----------------------------
// Teste 1: Transpose
// ----------------------------
log("--- Teste Transpose ---");
const A = new Matrix(2,3, [
    [1,2,3],
    [4,5,6]
]);
log("Matriz A:");
A.prettyPrint();

const At = A.transpose();
log("\nTransposta A^T:");
At.prettyPrint();

// ----------------------------
// Teste 2: Trace
// ----------------------------
log("\n--- Teste Trace ---");
const B = new Matrix(3,3, [
    [1,2,3],
    [4,5,6],
    [7,8,9]
]);
B.prettyPrint();
log("Trace(B) =", B.trace()); // 1+5+9 = 15

// ----------------------------
// Teste 3: Determinant
// ----------------------------
log("\n--- Teste Determinant ---");
const C = new Matrix(3,3, [
    [6,1,1],
    [4,-2,5],
    [2,8,7]
]);
C.prettyPrint();
log("Determinant(C) =", C.determinant()); // deve ser -306

// ----------------------------
// Teste 4: Adjoint
// ----------------------------
log("\n--- Teste Adjoint ---");
const D = new Matrix(2,2, [
    [4,7],
    [2,6]
]);
D.prettyPrint();

const adjD = D.adjoint();
log("Adjoint(D):");
adjD.prettyPrint();

// ----------------------------
// Teste 5: Inverse (Adjoint/Determinant)
// ----------------------------
log("\n--- Teste Inverse (Adjoint/Determinant) ---");
const invD = D.inverse();
log("Inverse(D):");
invD.prettyPrint();

// ----------------------------
// Teste 6: Inverse (Gauss-Jordan)
// ----------------------------
log("\n--- Teste Gauss-Jordan Inverse ---");
const invD_GJ = D.gaussJordanInverse();
log("Gauss-Jordan Inverse(D):");
invD_GJ.prettyPrint();
