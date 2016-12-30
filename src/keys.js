"use strict";

const zaes = require("zaes-js");
const NodeRSA = require("node-rsa");

/**
 * Generates key needed in AES enceyption/decryption
 * @function
 * @param {number} length should be 16, 24 or 32 for 128, 196 or 256 bit key respectively
 * @returns {string} generated key
 */
module.exports.generateAESKey = function(length) {
	let key = zaes.generateKey(length);
	return zaes.utils.bytesToString(key, 1);
}; 

module.exports.generateRSAKey = function(options) {
	if (options === undefined) {
		options = { bits: 1024, exp: 65537 };
	}
	let key = new NodeRSA().generateKeyPair(options.bits, options.exp);
	let keyrsa = { public: key.exportKey("public"), private: key.exportKey("private") };
	return keyrsa;
};