/* ----------------------------------------------------------------------------
 * File:     testes/testeMatrix.js
 * Authors:  SrAqua
 * ------------------------------------------------------------------------- */

const { Matrix, IdentityMatrix, ZeroMatrix } = require("../src/core/matrix");

console.log("=== Testes Matrix ===");

// Teste 1: Matrix normal
console.log("\n--- Matrix Normal (3x3) ---");
const A = new Matrix(3, 3, [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9]
]);
console.log(A.toString());

// Teste 2: IdentityMatrix
console.log("\n--- IdentityMatrix (dim = 4) ---");
const I = new IdentityMatrix(4);
console.log(I.toString());

// Teste 3: ZeroMatrix
console.log("\n--- ZeroMatrix (5x2) ---");
const Z = new ZeroMatrix(5, 2);
console.log(Z.toString());
