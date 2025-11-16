/* ----------------------------------------------------------------------------
* File:     src/core/matrix.js
* Authors:  SrAqua
* ------------------------------------------------------------------------- */

const { log } = require("../utils/logger");

class Matrix {

	constructor(a, b, c) {

		// Constructor for a rectangular matrix
		if (typeof a === "number" && typeof b === "number") {
			
			if (!Number.isInteger(a) || a <= 0 ||
			!Number.isInteger(b) || b <= 0)
			throw new Error("Matrix: dimensions must be a positive integer");
			
			this.nRows = a;
			this.nCols = b;
			this.data = c ? this.checkData(c) : this.newZeroMatrix(a, b);
			return;
		}

		// Constructor for a square matrix
		if (typeof a === "number" && c === undefined) {

			if (!Number.isInteger(a) || a <= 0)
				throw new Error("Matrix: dimension must be a positive integer");

			this.nRows = a;
			this.nCols = a;
			this.data = b ? this.checkData(b) : this.newZeroMatrix(a, a);
			return;
		}

		throw new Error("Matrix: construtor inválido");
	}

	// Create a Zero filled matrix
	newZeroMatrix(nRows, nCols) {
		return Array.from({ length: nRows }, () =>
			Array(nCols).fill(0)
		);
	}

	// Data validator
	checkData(data) {
		if (!Array.isArray(data) || !Array.isArray(data[0])) {
			throw new Error("Matrix: data must be an array of arrays");
		}

		if (data.length !== this.nRows) {
			throw new Error(
				`Matrix: number of nRows (${data.length}) does not match expected (${this.nRows})`
			);
		}

		for (let i = 0; i < this.nRows; i++) {
			if (!Array.isArray(data[i])) {
				throw new Error(`Matrix: row ${i} is not an array`);
			}
			if (data[i].length !== this.nCols) {
				throw new Error(
					`Matrix: row ${i} has ${data[i].length} columns, expected ${this.nCols}`
				);
			}
		}

		// Deep copy to avoid mutation
		return data.map(row => [...row]);
	}

	toString() {
		return this.data.map(row => row.join(" ")).join("\n");
	}

	prettyString() {
		const maxLen = Math.max(...this.data.flat().map(v => v.toString().length));

		const linhas = this.data.map(row => {
			const rowStr = row.map(v => v.toString().padEnd(maxLen)).join(" ");
			return `| ${rowStr} |`;
		});

		return linhas.join("\n");
	}

	prettyPrint() { log(this.prettyString()); }

	static equals(A, B) {
		if (A.rows !== B.rows || A.cols !== B.cols) return false;

		for (let i = 0; i < A.rows; i++) {
			for (let j = 0; j < A.cols; j++) {
				if (A.data[i][j] !== B.data[i][j]) return false;
			}
		}

		return true;
	}

	equals(B) { return Matrix.equals(this, B); }


	static _validateSameSize(A, B) {
		if (A.nRows !== B.nRows || A.nCols !== B.nCols) {
			throw new Error("Matrices must have the same dimensions.");
		}
	}

	static _validateSquare(A) {
		if (A.nRows !== A.nCols) {
			throw new Error("Matrix must be a square one.");
		}
	}


	static copy(A) {
		const dataCopy = A.data.map(row => [...row]);
		return new Matrix(A.nRows, A.nCols, dataCopy);
	}

	copy() { return Matrix.copy(this); }

	// Basic-Level Operadores -------------------------------------------------

	// b1. Add two matrices
	static add(A, B) {
		Matrix._validateSameSize(A, B);

		const data = Array.from({ length: A.nRows }, (_, i) =>
			Array.from({ length: A.nCols }, (_, j) =>
				A.data[i][j] + B.data[i][j]
			)
		);

		return new Matrix(A.nRows, A.nCols, data);
	}

	add(B) { return Matrix.add(this, B); }


	// b2. Negative matrix
	static neg(A) {
		const data = Array.from({ length: A.nRows }, (_, i) =>
			Array.from({ length: A.nCols }, (_, j) =>
				-1 * A.data[i][j]
			)
		);

		return new Matrix(A.nRows, A.nCols, data);
	}

	neg() { return Matrix.neg(this); }


	// b3. Subtract two matrices
	static sub(A, B) {
		Matrix._validateSameSize(A, B);
		return Matrix.add(A, B.neg());
	}

	sub(B) { return Matrix.sub(this, B); }


	// b4. Multiply two matrices
	static mul(A, B) {
		if (A.nCols !== B.nRows) {
			throw new Error("Matrix multiplication dimension mismatch.");
		}

		const data = Array.from({ length: A.nRows }, (_, i) =>
			Array.from({ length: B.nCols }, (_, j) =>
				Array.from({ length: A.nCols }, (_, k) =>
					A.data[i][k] * B.data[k][j]
				).reduce((a, b) => a + b, 0)
			)
		);

		return new Matrix(A.nRows, B.nCols, data);
	}

	mul(B) { return Matrix.mul(this, B); }


	// b5. Scalar multiplying to a matrix
	static scalarMul(A, s) {
		const data = A.data.map(row => row.map(x => s * x));
		return new Matrix(A.nRows, A.nCols, data);
	}

	scalarMul(s) { return Matrix.scalarMul(this, s); }

	
	// Medium-Level Operators -------------------------------------------------

	// m6. Transpose a matrix
	static transpose(A) {
		const data = Array.from({ length: A.nCols }, (_, i) =>
			Array.from({ length: A.nRows }, (_, j) =>
				A.data[j][i]
			)
		);

		return new Matrix(A.nCols, A.nRows, data);
	}

	transpose() { return Matrix.transpose(this); }


	// m7. Trace of a matrix
	static trace(A) {
		Matrix._validateSquare(A);
		return A.data.reduce((sum, row, i) => sum + row[i], 0);
	}

	trace() { return Matrix.trace(this); }


	// m8. Determinant of a matrix

	_minor(row, col) {
		const data = this.data
			.filter((_, i) => i !== row)
			.map(r => r.filter((_, j) => j !== col));
		return new Matrix(this.nRows-1, this.nCols-1, data);
	}

	static _fixFloat(x, decimals = 10) {
		if (typeof x !== "number" || !isFinite(x)) return x; // ignora se não for número
		return Number(x.toFixed(decimals));
	}

	static determinant(A) {
		Matrix._validateSquare(A);
		
		const dim = A.nRows;

		if (dim === 1) return A.data[0][0];
		if (dim === 2) return A.data[0][0]*A.data[1][1] - A.data[0][1]*A.data[1][0];

		// Laplace expansion
		let det = 0;
		for (let j = 0; j < dim; j++) {
			const minor = A._minor(0, j);
			det += ((j % 2 === 0 ? 1 : -1) * A.data[0][j] * minor.determinant());
		}
		return Matrix._fixFloat(det);
	}

	determinant() { return Matrix.determinant(this); }


	// m9. Adjoint Matrix
	
	// Método para calcular o cofactor de uma célula (i,j)
	cofactor(i, j) {
		const minorMatrix = this._minor(i, j);
		const sign = ((i + j) % 2 === 0) ? 1 : -1;
		return sign * minorMatrix.determinant();
	}

	// Método para calcular a adjunta (adjugate)
	static adjoint(A) {
		Matrix._validateSquare(A);

		const n = A.nRows;
		const adjData = Array.from({ length: n }, (_, i) =>
			Array.from({ length: n }, (_, j) =>
				A.cofactor(j, i)  // Note: transposed
			)
		);

		return new Matrix(n, n, adjData);
	}

	adjoint() { return Matrix.adjoint(this); }


	// m10. Inverted Matrix
	static inverse(A) {
		Matrix._validateSquare(A);

		const detA = A.determinant();
		if (detA === 0) {
			throw new Error("Matrix is singular and cannot be inverted");
		}

		const adjA = A.adjoint();
		const invData = adjA.data.map(row =>
			row.map(x => Matrix._fixFloat(x / detA))
		);
		return new Matrix(A.nRows, A.nCols, invData);
	}

	inverse() { return Matrix.inverse(this); }

	static gaussJordanInverse(A) {
		Matrix._validateSquare(A);

		const n = A.nRows;
		// Criar matriz aumentada [A | I]
		let augmented = A.data.map((row, i) => [
			...row,
			...Array.from({length:n}, (_, j) => (i===j?1:0))
		]);

		// Gauss-Jordan
		for (let i = 0; i < n; i++) {
			// Encontrar pivô
			let pivot = augmented[i][i];
			if (pivot === 0) {
				// Tentar trocar com linha abaixo
				let swapped = false;
				for (let k = i+1; k < n; k++) {
					if (augmented[k][i] !== 0) {
						[augmented[i], augmented[k]] = [augmented[k], augmented[i]];
						pivot = augmented[i][i];
						swapped = true;
						break;
					}
				}
				if (!swapped) throw new Error("Matrix is singular, cannot invert");
			}

			// Normalizar linha do pivô
			for (let j = 0; j < 2*n; j++) {
				augmented[i][j] = Matrix._fixFloat(augmented[i][j] / pivot);
			}

			// Zerificar colunas
			for (let k = 0; k < n; k++) {
				if (k === i) continue;
				const factor = augmented[k][i];
				for (let j = 0; j < 2*n; j++) {
					augmented[k][j] =Matrix._fixFloat(augmented[k][j] - factor * augmented[i][j]);
				}
			}
		}

		// Extrair matriz inversa
		const inverseData = augmented.map(row => row.slice(n));
		return new Matrix(n, n, inverseData);
	}

	gaussJordanInverse() { return Matrix.gaussJordanInverse(this); }
}

module.exports = { Matrix };
