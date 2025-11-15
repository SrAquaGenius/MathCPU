/* ----------------------------------------------------------------------------
* File:     src/core/matrices.js
* Authors:  SrAqua
* ------------------------------------------------------------------------- */

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

	prettyPrint() {
		const maxLen = Math.max(...this.data.flat().map(v => v.toString().length));

		this.data.forEach(row => {
			const rowStr = row.map(v => v.toString().padEnd(maxLen)).join(" ");
			console.log(`| ${rowStr} |`);
		});
	}

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


	static validateSameSize(A, B) {
		if (A.nRows !== B.nRows || A.nCols !== B.nCols) {
			throw new Error("Matrices must have the same dimensions.");
		}
	}


	static copy(A) {
		const dataCopy = A.data.map(row => [...row]);
		return new Matrix(A.nRows, A.nCols, dataCopy);
	}

	copy() { return Matrix.copy(this); }

	// Basic Operadores -------------------------------------------------------

	// b1. Add two matrices
	static add(A, B) {
		Matrix.validateSameSize(A, B);

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
		Matrix.validateSameSize(A, B);
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
}

class ZeroMatrix extends Matrix {

	constructor(nRows, nCols = nRows) {
		if (!Number.isInteger(nRows) || nRows <= 0 ||
			!Number.isInteger(nCols) || nCols <= 0)
			throw new Error("ZeroMatrix: dimensions must be positive integers");

		super(nRows, nCols);  // The Matrix constructor already creates zeros
	}
}

class IdentityMatrix extends Matrix {

	constructor(dim) {

		if (!Number.isInteger(dim) || dim <= 0)
			throw new Error("IdentityMatrix: dimension must be a positive integer");

		super(dim, dim, Array.from({ length: dim }, (_, i) =>
			Array.from({ length: dim }, (_, j) => (i === j ? 1 : 0))
		));
	}

}

module.exports = { Matrix, ZeroMatrix, IdentityMatrix };
