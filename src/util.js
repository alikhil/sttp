function stringToByteArray(str) {
	var array = new Array();
	var j = 0;
	for (var i = 0; i < str.length; i++) {
		var code = str.charCodeAt(i);
		if (code < 128) {// means uses 7 bits; left 1 bit is control bit
			array[j++] = code;
		}
		else if (code > 127 && code < 2048) {
			var secondPart = (code & 63) | 128; 	// 2 control bits + 6 bits; [10][??????]  
			var firstPart = (code >> 6) | 192;		// 3 control bits + 5 bits; [110][?????]; firstPart always < 224 and > 192
			array[j++] = firstPart;
			array[j++] = secondPart;
		} 
		else { // if code > 2047 
			var thirdPart = (code & 63) | 128; 		// 2 control bits + 6 bits; 	[10][??????]
			var secondPart = ((code >> 6) & 63) | 192;// 2 control bits + 6 bits; 	[11][??????]
			var firstPart = (code >> 12) | 224;		// 4 control bits + 4 bits 		[1110][????] firstPart > 224
			array[j++] = firstPart;
			array[j++] = secondPart;
			array[j++] = thirdPart;
		}
	}
	return array;
}

function byteArrayToString(byteArray) {
	var str = "";

	for (var i = 0; i < byteArray.length;) {
		var code = byteArray[i] & 255;
		if (code < 128) {
			str += String.fromCharCode(code);
			i++;
		}
		else if (code > 191 && code < 224) {
			var first = (code & 31) << 6;
			var second = (byteArray[i + 1] & 63);
			str += String.fromCharCode(first + second);
			i += 2;
		}
		else { // code > 223
			var first = (code & 15) << 12;
			var second = (byteArray[i + 1] & 63) << 6;
			var third = (byteArray[i + 2] & 63);
			str += String.fromCharCode(first + second + third);
			i += 3;
		}
	}
	return str;
}

exports.byteArrayToString = byteArrayToString;
exports.stringToByteArray = stringToByteArray;
