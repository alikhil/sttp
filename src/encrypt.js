function encryptAES(str, key) {
	return "encrypted";
}

function decryptAES(str, key) {
	return "decrypted";
}

function hash(str) {
	return "#";
}

function encryptRSA(str, publicKey) {
	return "$";
}

function decryptRSA(str, privateKey) {
	return "^";
}

exports.decryptRSA = decryptRSA;
exports.encryptRSA = encryptRSA;

exports.encryptAES = encryptAES;
exports.decryptAES = decryptAES;

exports.hash = hash;