function getKey(password) {
	/* Hash password and transform according to
	AES standard to get a key */
	return 1;
}

function split(text, chunkSize) {
	return text.match(new RegExp("(.|[\r\n]){1," + chunkSize + "}", "g"));
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

function normalize(str) {
	while((str.length % 16) !== 0) {
		str += " ";
	}
	return textToBinary(str);
}

function encryptBlock(block, key) {
	return block;
}

function encryptAES(str, password) {
	var binary = normalize(str);
	var key = getKey(password);
	var blocks = split(binary, 16*8);
	var cipher = new Array(blocks.length);
	for (var i = 0; i < blocks.length; i++) {
		cipher[i] = encryptBlock(blocks[i], key);
	}
	var encryptedBinarySequence = cipher.join("");
	var resultString = binaryToText(encryptedBinarySequence);
	return resultString;
}

function decryptAES(str, key) {
	return "decrypted";
}

function decryptBlock(block, key) {

}

exports.encryptAES = encryptAES;
exports.decryptAES = decryptAES;