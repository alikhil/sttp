"use strict";

const compresser = require("../src/compress.js");
const zaes = require("zaes-js");
const rsaCrypter = require("../src/rsa.js");
const hasher = require("../src/hash.js");
const base64 = require("../src/Base64.js").Base64(); 

var DataPacker = function(aesKey) {
	
	this.aesKey = aesKey;
	
	this.pack = function(data) {
		if (typeof data !== "string")
			data = JSON.stringify(data);
		let compressed = compresser.compress(data);
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
		return compresser.decompress(decrypted);
	};

	return this;
};

var AuthKeyPacker = function(key, isPrivate=false) {
	
	// this.isPrivate = isPrivate;

	function hasKey(obj, key) {
		return obj.hasOwnProperty(key);
	}

	this.hasPrivateKey = isPrivate;
	// this.key = key;


	this.canEncrypt = function() {
		return key !== null && hasKey(key, "E") &&
			hasKey(key, "N");
	};

	this.canDecrypt = function() {
		return this.hasPrivateKey && this.canEncrypt() &&
			hasKey(key, "P") && hasKey(key, "Q") &&
			hasKey(key, "D") && hasKey(key, "F");
	};

	this.pack = function(data) {
		if (typeof data !== "string") 
			data = JSON.stringify(data);
		let crypted = rsaCrypter.encryptRSA(data, key);
		let result = { data: crypted, hash: hasher.hash(crypted) };
		return base64.encode(JSON.stringify(result));
	};

	this.unpack = function(rawData) {
		let decoded = base64.decode(rawData);
		let result = JSON.parse(decoded);
		return rsaCrypter.decryptRSA(result.data, key);
	};
};


exports.AuthKeyPacker = AuthKeyPacker;
exports.DataPacker = DataPacker;