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

function pedirDadosDHondt(ret) {

	log("\n=== Método de D'Hondt ===");

	// Objeto para guardar os dados
	const dados = { numPartidos: 0, numLugares: 0, votos: [], nomes: [] };

	// Passo 1: número de partidos
	perguntar("Número de partidos recenseados: ", (np) => {

		dados.numPartidos = Number(np);
		if (isNaN(dados.numPartidos) || dados.numPartidos <= 0) {
			error("Número de partidos inválido");
			return pedirDadosDHondt(ret);
		}

		// Passo 2: número de lugares
		perguntar("Número de lugares a distribuir: ", (nl) => {
			dados.numLugares = Number(nl);
			if (isNaN(dados.numLugares) || dados.numLugares <= 0) {
				error("Número de lugares inválido");
				return pedirDadosDHondt(ret);
			}

			// Passo 3: nomes opcionais
			perguntar("Deseja inserir nomes dos partidos? (s/n): ", (resp) => {

				const inserirNomes = resp.trim().toLowerCase() === "s";

				if (inserirNomes) {
					let j = 0;
					function pedirNome() {
						if (j >= dados.numPartidos) {
							log("\n✅ Nomes recolhidos\n");
							return pedirVotos();
						}

						perguntar(`Nome do partido ${j + 1}: `, (nome) => {
							const letra = String.fromCharCode(65 + j);
							dados.nomes.push(nome || `${letra}`);
							j++;
							pedirNome();
						});
					}
					pedirNome();
				}
				else {
					// Nomes automáticos atribuidos
					for (let k = 0; k < dados.numPartidos; k++) {
						const letra = String.fromCharCode(65 + k);
						dados.nomes.push(`${letra}`);
					}

					pedirVotos();
				}
			});

			// Passo 4: pedir votos (usa os nomes definidos acima)
			function pedirVotos() {
				let i = 0;
				function pedirVoto() {
					if (i >= dados.numPartidos) {
						log("\n✅ Dados recolhidos");
						debug(dados);
						return ret(dados);
					}

					const nomePartido = dados.nomes[i];
					perguntar(`Número de votos no partido ${nomePartido}: `, (v) => {
						const votosPartido = Number(v);
						if (isNaN(votosPartido) || votosPartido < 0) {
							error("Número de votos inválido");
							return pedirVoto();
						}
						dados.votos.push(votosPartido);
						i++;
						pedirVoto();
					});
				}
				pedirVoto();
			}
		});
	});
}

module.exports = { menuEstatistica };
