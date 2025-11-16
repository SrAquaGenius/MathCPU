/* ----------------------------------------------------------------------------
* File:     src/menu/menuEDO.js
* Authors:  SrAqua
* -----------------------------------------------------------------------------
* @brief submenu de EDO do MathCPU.
* ------------------------------------------------------------------------- */

const { perguntar } = require("../utils/input");

const { log, error } = require("../utils/logger");

/**
 * @brief Mostra o menu de EDO e processa a escolha do utilizador.
 * @param {Function} ret - Função a chamar quando se escolhe voltar.
 */
function menuEDO(ret) {

	log("\n==== EDO ====");
	log("1. Calcular 'Stable Manifold'");
	log("2. Calcular 'Unstable Manifold'");
	log("q. Voltar");

	perguntar("Escolha uma operação: ", (resposta) => {
		switch (resposta) {
			case "1": calcularStableManifold(); break;
			case "2": calcularUnstableManifold(); break;
			case "q": log(); return ret();
			default: 
				error("Opção inválida");
		}
	});
}

module.exports = { menuEDO };
