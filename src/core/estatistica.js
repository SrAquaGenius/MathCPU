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

	// Ordenar por quociente (descendente)
	tabela.sort((a, b) => b.quociente - a.quociente);

	// Selecionar os N maiores
	const selecionados = tabela.slice(0, numLugares);

	// Contar quantos mandatos cada nome obteve
	const mandatos = {};
	for (let nome of nomes) mandatos[nome] = 0;
	for (let linha of selecionados) {
		mandatos[linha.nome]++;
	}

	mostrarTabelaSelecionados(numLugares, selecionados);
	mostrarDistribuicao(nomes, votos, mandatos);
	log();

	return mandatos;
}

function mostrarTabelaQuocientes(numPartidos, numLugares, nomes, votos) {

	console.log("\n> Tabela de quocientes:\n");
	const COLUNE_WIDTH = 11;

	// Cabeçalho
	let cabecalho = "Divisor".padEnd(COLUNE_WIDTH) + "|";
	nomes.forEach((n) => {
		cabecalho += " " + n.padEnd(COLUNE_WIDTH - 1) + "|";
	});
	console.log(cabecalho);
	console.log(("-".repeat(COLUNE_WIDTH) + "+").repeat(numPartidos + 1));

	// Linhas
	for (let j = 1; j <= numLugares; j++) {
		let linha = String(j).padEnd(COLUNE_WIDTH) + "|";
		for (let i = 0; i < nomes.length; i++) {
			const quociente = (votos[i] / j).toFixed(2);
			linha += " " + quociente.padEnd(COLUNE_WIDTH - 1) + "|";
		}
		console.log(linha);
	}
}

function mostrarTabelaSelecionados(numLugares, selecionados) {

	const COLUNE_WIDTH = 10;

	console.log("\n> Tabela de quocientes (top " + numLugares + "):\n");
	console.log(
		"Partido".padEnd(COLUNE_WIDTH), "|",
		"Quociente".padEnd(COLUNE_WIDTH - 1), "|",
		"Divisor".padEnd(COLUNE_WIDTH - 1), "|"
	);
	console.log(("-".repeat(COLUNE_WIDTH + 1) + "+").repeat(3));

	selecionados.forEach((l) => {
		console.log(
			l.nome.padEnd(COLUNE_WIDTH), "|",
			l.quociente.toFixed(2).padEnd(COLUNE_WIDTH - 1), "|",
			String(l.divisor).padEnd(COLUNE_WIDTH - 1), "|"
		);
	});
}

function mostrarDistribuicao(nomes, votos, mandatos) {

	const COLUNE_WIDTH = 10;

	console.log("\n> Distribuição final de mandatos:\n");
	console.log(
		"Nome".padEnd(COLUNE_WIDTH), "|",
		"Votos".padEnd(COLUNE_WIDTH - 1), "|",
		"Mandatos".padEnd(COLUNE_WIDTH - 1), "|"
	);
	console.log(("-".repeat(COLUNE_WIDTH + 1) + "+").repeat(3));

	for (let i = 0; i < nomes.length; i++) {
		console.log(
			nomes[i].padEnd(COLUNE_WIDTH), "|",
			String(votos[i]).padEnd(COLUNE_WIDTH - 1), "|",
			String(mandatos[nomes[i]]).padEnd(COLUNE_WIDTH - 1), "|"
		);
	}
}

module.exports = { metodoDeDHondt };
