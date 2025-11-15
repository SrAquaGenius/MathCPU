/* ----------------------------------------------------------------------------
* File:     src/core/zeroMatrix.js
* Authors:  SrAqua
* ------------------------------------------------------------------------- */

const { Matrix } = require("./matrix");

class ZeroMatrix extends Matrix {

	constructor(nRows, nCols = nRows) {
		if (!Number.isInteger(nRows) || nRows <= 0 ||
			!Number.isInteger(nCols) || nCols <= 0)
			throw new Error("ZeroMatrix: dimensions must be positive integers");

		super(nRows, nCols);  // The Matrix constructor already creates zeros
	}
}

module.exports = { ZeroMatrix };
