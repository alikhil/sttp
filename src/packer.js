"use strict";

const lz = require("lz-string");
const zaes = require("zaes-js");
const NodeRSA = require("node-rsa");

const DataPacker = function(aesKey) {
	
	this.aesKey = aesKey;
	
	this.pack = function(data) {
		if (typeof data !== "string")
			data = JSON.stringify(data);
		let compressed = lz.compress(data);
		let bytesPerChar = zaes.utils.detectBytesPerChar(compressed);
		let compressedBytes = zaes.utils.stringToBytes(compressed, bytesPerChar);  
		let crypted = zaes.encrypt(compressedBytes, aesKey);
		let total = [0, bytesPerChar].concat(crypted); // to decrypt then 
		return zaes.utils.bytesToString(total, 2);
	};
	
	this.unpack = function(rawData) {
		let bytesPerChar = zaes.utils.detectBytesPerChar(rawData);
		let bytes = zaes.utils.stringToBytes(rawData, bytesPerChar);
		let newBytesPerChar = bytes[1];
		let crypted = bytes.slice(2);
		let decryptedBytes = zaes.decrypt(crypted, aesKey);
		let decrypted = zaes.utils.bytesToString(decryptedBytes, newBytesPerChar);
		return lz.decompress(decrypted);
	};

	return this;
};

/**
 * Class for packing and unpacking with rsa
 * @constructor
 * @param {string} key rsa key. In format: "-----BEGIN PUBLIC|PRIVATE KEY-----	.... -----END PUBLIC|PRIVATE KEY-----"
 * @param {boolean} isPrivate Depricated. 
 */
const AuthKeyPacker = function(key, isPrivate=false) {
	
	this.rsaKey = new NodeRSA(key);


	/**
	 * [Depricated] Use isPrivate() or isPublic() insted
	 */
	this.hasPrivateKey = isPrivate;
	// this.key = key;

	/**
	 * Detects if it is available to encrypt with key that was passed on creating
	 * @function
	 * @returns {boolean} true if available. false if key was invalid
	 */
	this.canEncrypt = function() {
		return !this.rsaKey.isEmpty();
	};

	/**
	 * Detects if it is available to decrypt with key that was passed to constructor
	 * @function
	 * @returns {boolean} true if available, means that passed key was private. otherwise false.
	 */
	this.canDecrypt = function() {
		return !!this.rsaKey.isPrivate();
	};
	
	/**
	 * Encrypts passed data with RSA
	 * @function
	 * @param {string|any} data
	 * @returns {string} string in base64 encrypted with RSA
	 */
	this.pack = function(data) {
		if (typeof data !== "string") 
			data = JSON.stringify(data);
		let crypted = this.rsaKey.encrypt(data, "base64");
		return crypted;
	};

	/**
	 * Decrypts encrypted packed with RSA
	 * @function
	 * @param {string} rawData in base64
	 * @returns {string} decrypted in base64
	 */
	this.unpack = function(rawData) {
		return this.rsaKey.decrypt(rawData, "utf8");
	};
};


exports.AuthKeyPacker = AuthKeyPacker;
exports.DataPacker = DataPacker;