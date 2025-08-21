/* ----------------------------------------------------------------------------
 * File:     src/utils/debug.js
 * Authors:  SrAqua
 * ------------------------------------------------------------------------- */

const { log } = require("./logger");

let debugFlag = false;
let debugPlusFlag = false;

/** @brief troca o estado de debug atual */
function mudarDebug() {
	debugFlag = !debugFlag;
	log(`🐞 Modo de debug ${debugFlag ? "ativado" : "desativado"}\n`);
}

/** @brief Devolve o estado de debug atual */
function mostrarDebug() {
	return debugFlag;
}

/**
 * Imprime mensagens de debug, indicando a função de chamada.
 * @param {...any} mensagens Mensagens a imprimir em modo debug.
 */
function debug(...mensagens) {

	if (debugFlag) {
		const stack = new Error().stack;
		const linhas = stack.split("\n");
		let origem = "desconhecida";

		// Tenta obter a função chamadora
		if (linhas.length >= 3) {
			const linha = linhas[2];

			// Caso com nome da função: at separarSilabas (/caminho/ficheiro.js:linha:col)
			let matchFuncao = linha.match(/at (\S+) \(([^)]+)\)/);

			if (matchFuncao) {
				origem = matchFuncao[1];
			}
			else {
				// Caso sem nome da função: at /caminho/ficheiro.js:linha:col
				let matchFicheiro = linha.match(/at .*\/([^\/:]+):\d+:\d+/);
				if (matchFicheiro) {
					origem = matchFicheiro[1];
				}
			}
		}

		log(`[DEBUG][${origem}]`, ...mensagens);
	}
}

function debugPlus(...mensagens) {
	if (debugPlusFlag) debug(...mensagens);
}

module.exports = { mostrarDebug, mudarDebug, debug, debugPlus };
