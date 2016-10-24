var LZString = require("lz-string");
var HashMap = require("hashmap");

function compress(jsonData) {
	return LZString.compress(jsonData);
}

function decompress(compressed) {
	return LZString.decompress(compressed);
}

/**
 * Function that counts number of symbols occurrences in string and returns
 * @param input string that is expected to be JSON (but not a mandatory)
 * @returns {*} a map < symbol, count >
 */
function countOccurrences(input) {
	var occurrencesMap = new HashMap();
	for (var i = 0; i < input.length; i++) {
		var currentChar = input.charAt(i);
		if (occurrencesMap.has(currentChar)) {
			var charCount = occurrencesMap.get(currentChar);
			charCount++;
			occurrencesMap.set(currentChar, charCount);
		} else {
			occurrencesMap.set(currentChar, 1);
		}
	}
	return occurrencesMap;
}

exports.compress = compress;
exports.decompress = decompress;
exports.countOccurences = countOccurrences;