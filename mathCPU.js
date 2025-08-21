/* ----------------------------------------------------------------------------
 * File:     mathCPU.js
 * Authors:  SrAqua
 * ------------------------------------------------------------------------- */

const { clear, log, todo } = require("./src/utils/logger");
const { criarInterface } = require("./src/utils/input");

const { menuAlgebra } = require("./src/menu/menuAlgebra");


const input = criarInterface();
menuPrincipal();


function menuPrincipal() {

	clear();
	log("\n=== MathCPU ===");
	log("1. Álgebra");
	log("2. Cálculo");
	log("3. Geometria");
	log("4. Teoria dos Números");
	log("5. Estatística");
	log("0. Sair");

	input.question("Escolha uma opção: ", (resposta) => {
		switch (resposta) {
			case "1": menuAlgebra(input, menuPrincipal); break;
			case "2": todo(); break;
			case "3": todo(); break;
			case "4": todo(); break;
			case "5": todo(); break;
			case "0": input.close(); break;
			default: log("❌ Opção inválida"); menuPrincipal();
		}
	});
}

module.exports = { menuPrincipal };
