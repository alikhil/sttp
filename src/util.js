

function stringToByteArray(str) {
	var array = new Array();
	var j = 0;
	for (var i = 0; i < str.length; i++) {
		var code = str.charCodeAt(i);
		if (code < 128) // means uses 7 bits; left 1 bit is control bit
			array[j++] = code;
		else if (code > 127 && code < 2048) {
			var secondPart = (code & 63) | 128; 	// 2 control bits + 6 bits; [10][??????]
			var firstPart = (code >> 6) | 192;		// 2 control bits + 6 bits; [11][??????]
			array[j++] = firstPart;
			array[j++] = secondPart;
		} 
		else { // if code > 2047 
			var thirdPart = (code & 63) | 128;
			var secondPart = ((code >> 6) & 63) | 192;
			var firstPart = (code >> 12) | 224;
			array[j++] = firstPart;
			array[j++] = secondPart;
			array[j++] = thirdPart;
		}
	}
	return array;
}

exports.stringToByteArray = stringToByteArray;
