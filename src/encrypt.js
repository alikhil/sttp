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
	return text.match(new RegExp('(.|[\r\n]){1,' + chunkSize + '}', 'g'));
}

function binaryToText(binary) {
	var symbols = split(binary, 8);
	var text = "";
	for (var i = 0; i < symbols.length; i++) {
		text += String.fromCharCode(parseInt(symbols[i], 2));
	}
	return text;
}

function textToBinary(text) {
	var PADDING = "00000000";
	var binary = "";
	for (var i = 0; i < text.length; i++) {
		var temp = text.charCodeAt(i).toString(2);
		temp = PADDING.substring(0, PADDING.length - temp.length) + temp;
		binary += temp;
	}
	return binary;
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