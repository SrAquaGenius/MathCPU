/* ----------------------------------------------------------------------------
 * File:     src/utils/logger.js
 * Authors:  SrAqua
 * ------------------------------------------------------------------------- */

function log(...args) {
	console.log(...args);
}

function warn(...args) {
	console.warn("⚠️ ", ...args);
}

function error(...args) {
	console.error("❌", ...args);
}

function todo(...args) {
	log("[TODO]", ...args, "\n");
}

function clear() {
	console.clear();
}


module.exports = { log, warn, error, todo, clear };
