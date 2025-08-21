/* ----------------------------------------------------------------------------
* File:     src/menu/menuAlgebra.js
* Authors:  SrAqua
* -----------------------------------------------------------------------------
* @brief submenu de Álgebra do MathCPU. Permite ao utilizador escolher entre
* operações básicas: soma, subtração, multiplicação e divisão.
* ------------------------------------------------------------------------- */

const { perguntar } = require("../utils/input");
const { somar, subtrair, multiplicar, dividir } = require("../core/algebra");

const { log, error } = require("../utils/logger");

/**
 * @brief Mostra o menu de Álgebra e processa a escolha do utilizador.
 * @param {Function} ret - Função a chamar quando o utilizador escolhe voltar.
 */
function menuAlgebra(ret) {

	log("\n=== Álgebra ===");
	log("1. Somar dois números");
	log("2. Subtrair dois números");
	log("3. Multiplicar dois números");
	log("4. Dividir dois números");
	log("0. Voltar");

	perguntar("Escolha uma operação: ", (resposta) => {
		switch (resposta) {
			case "1": return pedirDoisNumeros(somar);
			case "2": return pedirDoisNumeros(subtrair);
			case "3": return pedirDoisNumeros(multiplicar);
			case "4": return pedirDoisNumeros(dividir);
			case "0": log(); return ret();
			default: 
				error("Opção inválida");
				menuAlgebra();
		}
	});
}

/**
 * @brief pede ao utilizador dois números e aplica a operação escolhida.
 * @param {Function} operacao - Função matemática (ex.: somar, subtrair).
 */
function pedirDoisNumeros(operacao) {
	perguntar("Primeiro número: ", (a) => {
		perguntar("Segundo número: ", (b) => {
			const resultado = operacao(Number(a), Number(b));
			log("Resultado:", resultado);
			menuAlgebra();
		});
	});
}

module.exports = { menuAlgebra };
