/* ----------------------------------------------------------------------------
 * File:     src/utils/input.js
 * Authors:  SrAqua
 * ------------------------------------------------------------------------- */

const readline = require("readline");

function criarInterface() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

function perguntar(pergunta, callback) {
    const rl = criarInterface();
    rl.question(pergunta, (resposta) => {
        rl.close();
        callback(resposta);
    });
}

module.exports = { criarInterface, perguntar };
