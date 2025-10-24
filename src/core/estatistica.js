/* ----------------------------------------------------------------------------
* File:     src/core/estatistica.js
* Authors:  SrAqua
* ------------------------------------------------------------------------- */

const { debug } = require("../utils/debug");
const { log } = require("../utils/logger");

function metodoDeDHondt(dados) {
	
	debug(dados);
	const { numPartidos, numLugares, votos, nomes } = dados;

	// Gerar tabela de quocientes
	let tabela = [];
	for (let i = 1; i <= numLugares; i++) {
		for (let j = 0; j < numPartidos; j++) {
			tabela.push({
				nome: nomes[j],
				divisor: i,
				quociente: votos[j] / i
			});
		}
	}

	mostrarTabelaQuocientes(numPartidos, numLugares, nomes, votos);

	// Ordenar por quociente e selecionar os N maiores
	tabela.sort((a, b) => b.quociente - a.quociente);
	const selecionados = tabela.slice(0, numLugares);

	// Contar quantos mandatos cada nome obteve
	const mandatos = {};
	for (let nome of nomes) mandatos[nome] = 0;
	for (let linha of selecionados) mandatos[linha.nome]++;

	mostrarTabelaSelecionados(numLugares, selecionados);
	mostrarDistribuicao(nomes, votos, mandatos);
	log();

	return mandatos;
}

/**
 * @brief Mostra a tabela completa de quocientes usada no método de D'Hondt.
 * Exibe cada divisor e o respetivo quociente para todos os partidos.
 * 
 * @param {number} numPartidos - Número total de partidos.
 * @param {number} numLugares - Número total de lugares a distribuir.
 * @param {string[]} nomes - Lista com os nomes dos partidos.
 * @param {number[]} votos - Lista com o número de votos de cada partido.
 */
function mostrarTabelaQuocientes(numPartidos, numLugares, nomes, votos) {

	console.log("\n> Tabela de quocientes:\n");
	const COLUNE_WIDTH = 10;

	// Cabeçalho
	let cabecalho = " Divisor".padEnd(COLUNE_WIDTH + 1) + "|";
	nomes.forEach((n) => {
		cabecalho += " " + n.padEnd(COLUNE_WIDTH) + "|";
	});
	console.log(cabecalho);
	console.log(("-".repeat(COLUNE_WIDTH + 1) + "+").repeat(numPartidos + 1));

	// Linhas
	for (let j = 1; j <= numLugares; j++) {
		let linha = " " + String(j).padEnd(COLUNE_WIDTH) + "|";
		for (let i = 0; i < nomes.length; i++) {
			const quociente = (votos[i] / j).toFixed(2);
			linha += " " + quociente.padEnd(COLUNE_WIDTH) + "|";
		}
		console.log(linha);
	}
}

/**
 * @brief Mostra a tabela com os maiores quocientes selecionados.
 * Exibe o top dos quocientes usados para atribuição de mandatos.
 * 
 * @param {number} numLugares - Número de lugares a atribuir.
 * @param {Array<Object>} selecionados - Lista dos quocientes selecionados (nome, quociente, divisor).
 */
function mostrarTabelaSelecionados(numLugares, selecionados) {

	const COLUNE_WIDTH = 10;

	// Cabeçalho
	console.log("\n> Tabela de quocientes (top " + numLugares + "):\n");
	console.log(
		" Partido".padEnd(COLUNE_WIDTH + 1) + "|",
		"Quociente".padEnd(COLUNE_WIDTH) + "|",
		"Divisor".padEnd(COLUNE_WIDTH) + "|"
	);
	console.log(("-".repeat(COLUNE_WIDTH + 1) + "+").repeat(3));

	// Linhas
	selecionados.forEach((l) => {
		console.log(
			" " + l.nome.padEnd(COLUNE_WIDTH) + "|",
			l.quociente.toFixed(2).padEnd(COLUNE_WIDTH) + "|",
			String(l.divisor).padEnd(COLUNE_WIDTH) + "|"
		);
	});
}

/**
 * @brief Mostra a tabela final de distribuição de mandatos.
 * Lista o número de votos e mandatos obtidos por cada partido.
 * 
 * @param {string[]} nomes - Lista dos nomes dos partidos.
 * @param {number[]} votos - Lista de votos correspondentes a cada partido.
 * @param {Object} mandatos - Objeto com o número de mandatos por partido.
 */
function mostrarDistribuicao(nomes, votos, mandatos) {

	const COLUNE_WIDTH = 10;

	// Cabeçalho
	console.log("\n> Distribuição final de mandatos:\n");
	console.log(
		" Nome".padEnd(COLUNE_WIDTH + 1) + "|",
		"Votos".padEnd(COLUNE_WIDTH) + "|",
		"Mandatos".padEnd(COLUNE_WIDTH) + "|"
	);
	console.log(("-".repeat(COLUNE_WIDTH + 1) + "+").repeat(3));

	// Linhas
	for (let i = 0; i < nomes.length; i++) {
		console.log(
			" " + nomes[i].padEnd(COLUNE_WIDTH) + "|",
			String(votos[i]).padEnd(COLUNE_WIDTH) + "|",
			String(mandatos[nomes[i]]).padEnd(COLUNE_WIDTH) + "|"
		);
	}
}

module.exports = { metodoDeDHondt };
