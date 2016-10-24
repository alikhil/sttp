function stringToByteArray(str) {
	var array = new Array();
	var j = 0;
	var secondPart, firstPart, thirdPart;
	for (var i = 0; i < str.length; i++) {
		var code = str.charCodeAt(i);
		if (code < 128) {// means uses 7 bits; left 1 bit is control bit
			array[j++] = code;
		}
		else if (code > 127 && code < 2048) {
			secondPart = (code & 63) | 128; 	// 2 control bits + 6 bits; [10][??????]  
			firstPart = (code >> 6) | 192;		// 3 control bits + 5 bits; [110][?????]; firstPart always < 224 and > 192
			array[j++] = firstPart;
			array[j++] = secondPart;
		} 
		else { // if code > 2047 
			thirdPart = (code & 63) | 128; 		// 2 control bits + 6 bits; 	[10][??????]
			secondPart = ((code >> 6) & 63) | 192;// 2 control bits + 6 bits; 	[11][??????]
			firstPart = (code >> 12) | 224;		// 4 control bits + 4 bits 		[1110][????] firstPart > 224
			
			array[j++] = firstPart;
			array[j++] = secondPart;
			array[j++] = thirdPart;
		}
	}
	return array;
}

function byteArrayToString(byteArray) {
	var str = "";
	var secondPart, firstPart, thirdPart;

	for (var i = 0; i < byteArray.length;) {
		var code = byteArray[i] & 255;
		if (code < 128) {
			str += String.fromCharCode(code);
			i++;
		}
		else if (code > 191 && code < 224) {
			firstPart = (code & 31) << 6;
			secondPart = (byteArray[i + 1] & 63);
			str += String.fromCharCode(firstPart + secondPart);
			i += 2;
		}
		else { // code > 223
			firstPart = (code & 15) << 12;
			secondPart = (byteArray[i + 1] & 63) << 6;
			thirdPart = (byteArray[i + 2] & 63);
			str += String.fromCharCode(firstPart + secondPart + thirdPart);
			i += 3;
		}
	}
	return str;
}

exports.byteArrayToString = byteArrayToString;
exports.stringToByteArray = stringToByteArray;
