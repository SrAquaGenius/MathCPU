/* ----------------------------------------------------------------------------
 * File:     testes/testeMatrix.js
 * Authors:  SrAqua
 * ------------------------------------------------------------------------- */

const { Matrix, IdentityMatrix, ZeroMatrix } = require("../src/core/matrix");
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

// ---------------------------
// Teste 5: validateSameSize
// ---------------------------
log("\n--- Teste validateSameSize ---");
const C = new Matrix(2, 2, [
	[1,2],
	[3,4]
]);

const D = new Matrix(2, 2, [
	[5,6],
	[7,8]
]);

try {
	Matrix.validateSameSize(C, D);
	log("C e D têm o mesmo tamanho → válido");
} catch(e) {
	log("Erro:", e.message);
}

// Teste de erro
const E = new Matrix(3, 2, [
	[1,2],
	[3,4],
	[5,6]
]);

try {
	Matrix.validateSameSize(C, E);
	log("C e E têm o mesmo tamanho → válido");
}
catch(e) {
	log("Erro esperado:", e.message);
}
