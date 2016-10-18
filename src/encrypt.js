function normalize(str) {
	/*Return byte representation of str
	appended with zeros to make length(str)
	dividable by 16*/
}

function getKey(password) {
	/* Hash password and transform according to
	AES standard to get a key */
}

function split(text, chunkSize) {

}

function encryptBlock(block, key) {

}

function encryptAES(str, password) {
	var text = normalize(str);
	var key = getKey(password);
	var blocks = split(text, 16);
	var cipher = new Array(blocks.length);
	for (var i = 0; i < blocks.length; i++) {
		cipher[i] = encryptBlock(blocks[i], key);
	}
	var encryptedByteSequence = cipher.join("");
	// Should we return String or bytes?
	return "encrypted";
}

function decryptAES(str, key) {
	return "decrypted";
}

function decryptBlock(block, key) {

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