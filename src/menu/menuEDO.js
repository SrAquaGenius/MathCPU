/* ----------------------------------------------------------------------------
* File:     src/menu/menuEDO.js
* Authors:  SrAqua
* -----------------------------------------------------------------------------
* @brief submenu de EDO do MathCPU.
* ------------------------------------------------------------------------- */

const { perguntar } = require("../utils/input");
const { log, error } = require("../utils/logger");

const { parseEDOSystem } = require("../parser/parserEDO");
const { EDOSystem } = require("../core/edo");

/**
 * @brief Mostra o menu de EDO e processa a escolha do utilizador.
 * @param {Function} ret - Função a chamar quando se escolhe voltar.
 */
function menuEDO(ret) {

	log("\n==== EDO ====");
    log("1. Ler sistema por equações");
    log("2. Calcular 'Stable Manifold'");
    log("3. Calcular 'Unstable Manifold'");
    log("q. Voltar");

    perguntar("Escolha uma operação: ", (resposta) => {
        switch (resposta) {
            case "1": lerSistemaPorEquacoes(() => menuEDO(ret)); break;
            case "2": calcularStable(() => menuEDO(ret)); break;
            case "3": calcularUnstable(() => menuEDO(ret)); break;
            case "q": return ret();
            default: error("Opção inválida"); menuEDO(ret);
        }
    });
}

function lerSistemaPorEquacoes(ret) {

    log("Introduza o sistema linha a linha. Exemplo:");
    log("x' = -2x + y^3");
    log("y' = y - x^2");
    log("Linha vazia para terminar.\n");

    let linhas = [];

    function lerLinha() {
        perguntar("> ", (txt) => {
            if (txt.trim() === "") {
                try {
                    const parsed = parseEDOSystem(linhas.join("\n"));
                    global.__edo = new ODESystem(parsed.dim, parsed.f);
                    log("Sistema carregado com sucesso em __edo.");
                } catch (err) {
                    error("Erro ao ler sistema:", err.message);
                }
                return ret();
            }
            linhas.push(txt);
            lerLinha();
        });
    }

    lerLinha();
}

function calcularStable(ret) {
    if (!global.__edo) {
        error("Nenhum sistema carregado. Use a opção 1 primeiro.");
        return ret();
    }

    try {
        const manifold = computeStableManifold(global.__edo);
        log("Stable Manifold:");
        console.log(manifold);
    }
    catch (e) {
        error("Erro:", e.message);
    }

    ret();
}

function calcularUnstable(ret) {
    if (!global.__edo) {
        error("Nenhum sistema carregado. Use a opção 1 primeiro.");
        return ret();
    }

    try {
        const manifold = computeUnstableManifold(global.__edo);
        log("Unstable Manifold:");
        console.log(manifold);
    }
    catch (e) {
        error("Erro:", e.message);
    }

    ret();
}

module.exports = { menuEDO };
