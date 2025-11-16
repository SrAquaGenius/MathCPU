/* ----------------------------------------------------------------------------
* File:     src/menu/menuMatrix.js
* Authors:  SrAqua
* -----------------------------------------------------------------------------
* @brief Submenu de operações matriciais do MathCPU.
* Permite criar, visualizar e operar com matrizes.
* ------------------------------------------------------------------------- */

const { perguntar } = require("../utils/input");
const { log, error } = require("../utils/logger");
const { Matrix } = require("../core/matrix");

/**
 * @brief Mostra o menu de Álgebra e processa a escolha do utilizador.
 * @param {Function} ret - Função a chamar quando se escolhe voltar.
 */
function menuMatrix(ret) {

	log("\n==== Operações Matriciais ====");
	log("1. Criar matrix");
	log("2. Mostrar matrix");
	log("3. Transposta");
	log("4. Traço");
	log("5. Determinante");
	log("6. Adjunta");
	log("7. Inversa (Adjunta/Det)");
	log("8. Inversa (Gauss-Jordan)");
	log();
	log("q. Voltar");

	perguntar("Escolha uma operação: ", (resposta) => {
		switch (resposta) {
			case "1": criarMatrix(); break;
			case "2": mostrarMatrix(); break;
			case "3": operarUma("Transposta", M => M.transpose()); break;
			case "4": operarUma("Traço", M => M.trace()); break;
			case "5": operarUma("Determinante", M => M.determinant()); break;
			case "6": operarUma("Adjunta", M => M.adjoint()); break;
			case "7": operarUma("Inversa", M => M.inverse()); break;
			case "8": operarUma("Inversa (GJ)", M => M.gaussJordanInverse()); break;
			case "q": log(); return ret();
			default: 
				error("Opção inválida");
		}
	});


	// --- Helper: Criar matriz -------------------------------------
	function criarMatrix() {
		perguntar("Número de linhas: ", (r) => {
			perguntar("Número de colunas: ", (c) => {
				const nRows = Number(r);
				const nCols = Number(c);

				let data = [];
				const pedirLinha = (i) => {
					if (i >= nRows) {
						global.__matrix = new Matrix(nRows, nCols, data);
						log("Matrix guardada como variável global __matrix:");
						log(__matrix.prettyString());
						return menuMatrix(ret);
					}
					perguntar(`Linha ${i+1} (separa por espaço): `, (txt) => {
						const nums = txt.split(" ").map(Number);
						if (nums.length !== nCols) {
							error("Número de colunas incorreto!");
							return pedirLinha(i);
						}
						data.push(nums);
						pedirLinha(i+1);
					});
				};
				pedirLinha(0);
			});
		});
	}

	// --- Helper: Mostrar matriz -------------------------------------
	function mostrarMatrix() {
		if (!global.__matrix) {
			error("Nenhuma matriz criada ainda.");
		} else {
			log("\nMatriz atual:");
			log(global.__matrix.prettyString());
		}
		menuMatrix(ret);
	}

	// --- Helper: Operações de 1 matriz -------------------------------
	function operarUma(nome, operacao) {
		if (!global.__matrix) {
			error("Nenhuma matrix criada ainda.");
			return menuMatrix(ret);
		}
		try {
			const resultado = operacao(global.__matrix);
			log(`\nResultado (${nome}):`);
			if (resultado instanceof Matrix) log(resultado.prettyString());
			else log(resultado);
		}
		catch (e) { error(e.message); }
		menuMatrix(ret);
	}
}

module.exports = { menuMatrix };
