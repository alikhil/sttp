var compresser = require("../src/compress.js");
var aesCrypter = require("../src/aes.js");
var hasher = require("../src/hash.js");
var util = require("../src/util.js");
var base64 = require("../src/Base64.js").Base64(); 

var DataPacker = function(aesKey) {
	
	this.aesKey = aesKey;
	
	this.pack = function(data) {
		if (typeof data !== "string")
			data = JSON.stringify(data);
		var compressed = compresser.compress(data);
		console.log("compressed"+compressed);
		var crypted = aesCrypter.encryptAES(compressed, aesKey);
		console.log("crypted"+crypted);
		var packet = { data: crypted, hash: hasher.hash(crypted) };
		var result = JSON.stringify(packet);
		return base64.encode(result);
	};
	
	this.unpack = function(rawData) {
		var decoded = base64.decode(rawData);
		console.log("rawData" + rawData);
		console.log("decoded" + decoded);
		var decodedObject = JSON.parse(decoded);
		if (hasher.hash(decodedObject.data) !== decodedObject.hash)
			throw "Hashes are not equal. Data corrupted";
		var decrypted = aesCrypter.decryptAES(decodedObject.data, aesKey);
		console.log("decrypted"+decrypted);
		var decompressed = compresser.decompress(decrypted);
		return decompressed;
	};

	return this;
};

var AuthKeyPacker = function(key, private) {
	
	this.private = private || false;

	function hasKey(obj, key) {
		return obj.hasOwnProperty(key);
	}

	this.hasPrivateKey = private;
	this.key = key;


	this.canEncrypt = function() {
		return key !== null && hasKey(key, "E")
			&& hasKey(key, "N");
	};

	this.canDecrypt = function() {
		return this.hasPrivateKey && this.canEncrypt()
			&& hasKey(key, "P") && hasKey(key, "Q")
			&& hasKey(key, "D") && hasKey(key, "F");
	};
};


exports.AuthKeyPacker = AuthKeyPacker;
exports.DataPacker = DataPacker;