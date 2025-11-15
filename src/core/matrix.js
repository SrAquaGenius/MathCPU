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
			
			this.rows = a;
			this.cols = b;
			this.data = c ? this.checkData(c) : this.newZeroMatrix(a, b);
			return;
		}

		// Constructor for a square matrix
		if (typeof a === "number" && c === undefined) {

			if (!Number.isInteger(a) || a <= 0)
				throw new Error("Matrix: dimension must be a positive integer");

			this.rows = a;
			this.cols = a;
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

		if (data.length !== this.rows) {
			throw new Error(
				`Matrix: number of rows (${data.length}) does not match expected (${this.rows})`
			);
		}

		for (let i = 0; i < this.rows; i++) {
			if (!Array.isArray(data[i])) {
				throw new Error(`Matrix: row ${i} is not an array`);
			}
			if (data[i].length !== this.cols) {
				throw new Error(
					`Matrix: row ${i} has ${data[i].length} columns, expected ${this.cols}`
				);
			}
		}

		// Deep copy to avoid mutation
		return data.map(row => [...row]);
	}

	toString() {
		return this.data.map(row => row.join(" ")).join("\n");
	}
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
