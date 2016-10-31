var bigInt = require("big-integer");

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


function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @brief Power base^exponent % modulus
 * @details gets base to power of exponent with module 'modulus'
 * 
 * @param base
 * @param exponent 
 * @param modulus modulus
 * @return base ^ exponent % modulus
 */
function power(base, exponent, modulus) {
	
	if (modulus === 1) { 
		return 0;
	}
    var result = 1;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2 === 1) {
           result = (result * base) % modulus;
        }
        exponent = exponent >> 1;
        base = (base * base) % modulus;
    }
    return result;
}

exports.power = power;
exports.randomInt = randomInt;

function getRandomBigIntPrime(min, max) {
	var prime = bigInt.randBetween(min, max);
	do {
		while(prime.isEven() || !prime.isProbablePrime(50)) {
			prime = bigInt.randBetween(min, max);
		}
	} while(!prime.isPrime());
	return prime;
}

function decToBin(num) {
	return fillWithLeadingZeros(num.toString(2), 8);
}

function concatenateBytesIntoBin(bytes) {
	var binary = "";
	for (let byte of bytes) {
		if (byte >= 256) {
			throw "byte is more than 8 bits!";
		}
		binary += decToBin(byte);
	}
	return binary;
}

function fillWithLeadingZeros(str, length) {
	while(str.length < length) {
		str = "0" + str;
	}
	return str;
}

exports.fillWithLeadingZeros = fillWithLeadingZeros;
exports.concatenateBytesIntoBin = concatenateBytesIntoBin;
exports.decToBin = decToBin;
exports.getRandomBigIntPrime = getRandomBigIntPrime;
