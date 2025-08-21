/* ----------------------------------------------------------------------------
* File:     src/utils/input.js
* Authors:  SrAqua
* ------------------------------------------------------------------------- */

const readline = require("readline");

let rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});


function perguntar(pergunta, ret) {
	rl.question(pergunta, (resposta) => {
		ret(resposta);
	});
}

module.exports = { rl, perguntar };
