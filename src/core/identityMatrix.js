/* ----------------------------------------------------------------------------
* File:     src/core/identityMatrices.js
* Authors:  SrAqua
* ------------------------------------------------------------------------- */

const { Matrix } = require("./matrix");

class IdentityMatrix extends Matrix {

	constructor(dim) {

		if (!Number.isInteger(dim) || dim <= 0)
			throw new Error("IdentityMatrix: dimension must be a positive integer");

		super(dim, dim, Array.from({ length: dim }, (_, i) =>
			Array.from({ length: dim }, (_, j) => (i === j ? 1 : 0))
		));
	}

}

module.exports = { IdentityMatrix };
