/* ----------------------------------------------------------------------------
 * File:     mathCPU.js
 * Authors:  SrAqua
 * ------------------------------------------------------------------------- */

const { log, todo } = require("./src/utils/logger");
const { criarInterface } = require("./src/utils/input");

const { menuAlgebra } = require("./src/menu/menuAlgebra");

function menuPrincipal() {
    log("\n=== MathCPU ===");
    log("1. Álgebra");
    log("2. Cálculo");
    log("3. Geometria");
    log("4. Teoria dos Números");
    log("5. Estatística");
    log("0. Sair");

    const rl = criarInterface();

    rl.question("Escolha uma opção: ", (resposta) => {
        switch (resposta) {
            case "1": menuAlgebra(); break;
            case "2": todo(); break;
            case "3": todo(); break;
            case "4": todo(); break;
            case "5": todo(); break;
            case "0": rl.close(); break;
            default: log("❌ Opção inválida"); menuPrincipal();
        }
    });
}

module.exports = { menuPrincipal };
