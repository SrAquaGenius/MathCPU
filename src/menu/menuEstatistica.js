/* ----------------------------------------------------------------------------
* File:     src/menu/menuEstatistica.js
* Authors:  SrAqua
* -----------------------------------------------------------------------------
* @brief submenu de Estatística do MathCPU. Permite ao utilizador escolher 
* algumas operações como calcular utilizando o método de D'Hondt.
* ------------------------------------------------------------------------- */

const { perguntar } = require("../utils/input");
const { metodoDeDHondt } = require("../core/estatistica");

const { log, error } = require("../utils/logger");
const { debug } = require("../utils/debug");

/**
 * @brief Mostra o menu de Estatística e processa a escolha do utilizador.
 * @param {Function} ret - Função a chamar quando se escolhe voltar.
 */
function menuEstatistica(ret) {

	log("\n==== Estatística ====");
	log("1. Método Eleitoral de D'Hondt");
	log("0. Voltar");

	perguntar("Escolha uma operação: ", (resposta) => {
		switch (resposta) {
			case "1": pedirDadosDHondt((dados) => { metodoDeDHondt(dados); ret(); }); break;
			case "0": log(); return ret();
			default: 
				error("Opção inválida");
		}
	});
}

/* ----------------------------------------------------------------------------
	* @brief pede os dados necessários para aplicar o método de D'Hondt.
	* @param {Function} ret - função a chamar no final para regressar ao menu anterior.
	* @returns {void}
	* ------------------------------------------------------------------------- */
function pedirDadosDHondt(ret) {

	log("\n=== Método de D'Hondt ===");

	// objeto para guardar os dados
	const dados = { numPartidos: 0, numLugares: 0, votos: [], nomes: [] };

	// passo 1: número de partidos
	perguntar("Número de partidos recenseados: ", (np) => {

		dados.numPartidos = Number(np);
		if (isNaN(dados.numPartidos) || dados.numPartidos <= 0) {
			error("Número de partidos inválido");
			return pedirDadosDHondt(ret);
		}

		// passo 2: número de lugares
		perguntar("Número de lugares a distribuir: ", (nl) => {
			dados.numLugares = Number(nl);
			if (isNaN(dados.numLugares) || dados.numLugares <= 0) {
				error("Número de lugares inválido");
				return pedirDadosDHondt(ret);
			}

			// passo 3: votos de cada partido
			let i = 0;
			function pedirVotos() {

				// Vai pedir nomes opcionalmente
				if (i >= dados.numPartidos) return pedirNomes(); 

				perguntar(`Número de votos do partido ${i + 1}: `, (v) => {
					const votosPartido = Number(v);
					if (isNaN(votosPartido) || votosPartido < 0) {
						error("Número de votos inválido");
						return pedirVotos();
					}
					dados.votos.push(votosPartido);
					i++;
					pedirVotos();
				});
			}

			// passo 4: nomes opcionais
			function pedirNomes() {
				let j = 0;
				function pedirNome() {
					if (j >= dados.numPartidos) {
						log("\n✅ Dados recolhidos");
						debug(":" + dados);
						return ret(dados);
					}

					perguntar(`Nome do partido ${j + 1} (opcional, Enter para ignorar): `, (nome) => {
						dados.nomes.push(nome || `Partido ${j + 1}`);
						j++;
						pedirNome();
					});
				}
				perguntar("Deseja inserir nomes dos partidos? (s/n): ", (resp) => {
					if (resp.toLowerCase() === "s") {
						pedirNome();
					}
					
					else {
						// nomes automáticos
						for (let k = 0; k < dados.numPartidos; k++) {
							dados.nomes.push(`Partido ${k + 1}`);
						}
						log("\n✅ Dados recolhidos");
						debug(":" + dados);
						ret(dados);
					}
				});
			}

			pedirVotos();
		});
	});
}

module.exports = { menuEstatistica };
