/* ----------------------------------------------------------------------------
 * File:     mathCPU.js
 * Authors:  SrAqua
 * ------------------------------------------------------------------------- */

const { rl } = require("./src/utils/input");
const { clear, log, error, todo } = require("./src/utils/logger");

const { menuAlgebra } = require("./src/menu/menuAlgebra");

clear();
menuPrincipal();

function menuPrincipal() {

	log("=== MathCPU ===");
	log("1. Álgebra");
	log("2. Cálculo");
	log("3. Geometria");
	log("4. Teoria dos Números");
	log("5. Estatística");
	log("0. Sair");

	rl.question("Escolha uma opção: ", (resposta) => {
		switch (resposta) {
			case "1": menuAlgebra(menuPrincipal); break;
			case "2": todo("Menu Cálculo"); menuPrincipal(); break;
			case "3": todo("Menu Geometria"); menuPrincipal(); break;
			case "4": todo("Menu Teoria dos Números"); menuPrincipal(); break;
			case "5": todo("Menu Estatística"); menuPrincipal(); break;
			case "0": log("👋 Adeus!"); rl.close(); break;
			default: error("Opção inválida"); menuPrincipal();
		}
	});
}

module.exports = { menuPrincipal };
