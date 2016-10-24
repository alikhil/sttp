var LZString = require("lz-string");
var Set = require("collections/set");

function compress(jsonData) {
	//return LZString.compress(jsonData);
	var dictionary = new Set();
}

function decompress(compressed) {
	return LZString.decompress(compressed);
}

exports.compress = compress;
exports.decompress = decompress;