/* ----------------------------------------------------------------------------
 * File:     src/core/edo.js
 * Authors:  SrAqua
 * ------------------------------------------------------------------------- */

const { Matrix } = require("./matrix");

class ODESystem {

    constructor(dim, f) {
        this.dim = dim;
        this.f = f; // função f(x) -> vetor
    }

    // Jacobiano numérico
    jacobian(x0, h = 1e-6) {
        const n = this.dim;
        const J = Matrix.zero(n, n).data;

        const f0 = this.f(x0);

        for (let j = 0; j < n; j++) {
            let xh = [...x0];
            xh[j] += h;
            const fh = this.f(xh);

            for (let i = 0; i < n; i++) {
                J[i][j] = (fh[i] - f0[i]) / h;
            }
        }

        return new Matrix(n, n, J);
    }
}


// -------- Stable-manifold computation -------- //

function computeStableManifold(edo) {
    const J = edo.jacobian(Array(edo.dim).fill(0)); // jacobiano na origem

    const { eigenvalues, eigenvectors } = J.eigenDecomposition();

    let stable = [];

    for (let k = 0; k < eigenvalues.length; k++) {
        const λ = eigenvalues[k];
        if (Re(λ) < 0) {
            stable.push(eigenvectors[k]);
        }
    }

    return stable;
}


// -------- Stable-manifold computation -------- //

function computeUnstableManifold(edo) {
    const J = edo.jacobian(Array(edo.dim).fill(0));

    const { eigenvalues, eigenvectors } = J.eigenDecomposition();

    let unstable = [];

    for (let k = 0; k < eigenvalues.length; k++) {
        const λ = eigenvalues[k];
        if (Re(λ) > 0) {
            unstable.push(eigenvectors[k]);
        }
    }

    return unstable;
}

// Função real da parte real de número complexo (aceita números reais)
function Re(z) {
    return typeof z === "number" ? z : z.re;
}

module.exports = {
    ODESystem,
    computeStableManifold,
    computeUnstableManifold
};
