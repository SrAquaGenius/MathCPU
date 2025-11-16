/* ----------------------------------------------------------------------------
* File:     src/menu/menuAritmetrica.js
* Authors:  SrAqua
* -----------------------------------------------------------------------------
* @brief submenu de Aritmétrica do MathCPU. Permite ao utilizador escolher
* entre operações básicas: soma, subtração, multiplicação e divisão.
* ------------------------------------------------------------------------- */

const { perguntar } = require("../utils/input");
const {
		somar, subtrair, multiplicar, dividir, fatorial
	} = require("../core/aritmetrica");

const { log, error } = require("../utils/logger");

/**
 * @brief Mostra o menu de Álgebra e processa a escolha do utilizador.
 * @param {Function} ret - Função a chamar quando se escolhe voltar.
 */
function menuAritmetrica(ret) {

	log("\n==== Aritmétrica ====");
	log("1. Somar dois números");
	log("2. Subtrair dois números");
	log("3. Multiplicar dois números");
	log("4. Dividir dois números");
	log("5. Fatorial dum número");
	log("q. Voltar");

	perguntar("Escolha uma operação: ", (resposta) => {
		switch (resposta) {
			case "1": pedirDoisNumeros(somar); break;
			case "2": pedirDoisNumeros(subtrair); break;
			case "3": pedirDoisNumeros(multiplicar); break;
			case "4": pedirDoisNumeros(dividir); break;
			case "5": pedirUmNumero(fatorial); break;
			case "q": log(); return ret();
			default: 
				error("Opção inválida");
		}
	});

	/**
	 * @brief pede ao utilizador um números e aplica a operação escolhida.
	 * @param {Function} operacao - Função matemática (ex.: fatorial).
	 */
	function pedirUmNumero(operacao) {
		perguntar("Primeiro número: ", (a) => {
			const resultado = operacao(Number(a));
			log("Resultado:", resultado);
			menuAlgebra(ret);
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
				menuAlgebra(ret);
			});
		});
	}

}

module.exports = { menuAritmetrica };
