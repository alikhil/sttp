var LZString = require("lz-string");

function compress(jsonData) {
	return LZString.compress(jsonData);
}

function decompress(compressed) {
	return LZString.decompress(compressed);
}

exports.compress = compress;
exports.decompress = decompress;