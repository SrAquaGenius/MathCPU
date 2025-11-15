/* ----------------------------------------------------------------------------
 * File:     testes/testeMatrix.js
 * Authors:  SrAqua
 * ------------------------------------------------------------------------- */

const { Matrix } = require("../src/core/matrix");
const { IdentityMatrix } = require("../src/core/identityMatrix");
const { ZeroMatrix } = require("../src/core/zeroMatrix");
const { log } = require("../src/utils/logger");

log("=== Testes Matrix ===");

// Teste 1: Matrix normal
log("\n--- Matrix Normal (3x3) ---");
const A = new Matrix(3, 3, [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9]
]);
A.prettyPrint();

// Teste 2: IdentityMatrix
log("\n--- Identity Matrix (dim = 4) ---");
const I = new IdentityMatrix(4);
I.prettyPrint();

// Teste 3: ZeroMatrix
log("\n--- Zero Matrix (5x2) ---");
const Z = new ZeroMatrix(5, 2);
Z.prettyPrint();

// ---------------------------
// Teste 4: equals
// ---------------------------
log("\n--- Teste equals ---");
const A_copy = A.copy();

log("A.equals(A_copy) =", A.equals(A_copy)); // true

const B = new Matrix(3, 3, [
	[1, 2, 3],
	[4, 0, 6],
	[7, 8, 9]
]);
log("A.equals(B) =", A.equals(B)); // false

// Modificando A_copy não altera A
A_copy.data[0][0] = 999;
console.log(A.data[0][0]); // 1
