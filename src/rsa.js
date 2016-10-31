var bigInt = require("big-integer");
var util = require("./util.js");

const minPrimeNumber = bigInt(2).pow(16);
const maxPrimeNumber = bigInt(2).pow(17);
// number of bytes in block theoretically, really uses one more byte
// that's why in some places you can meet blockSize + 1; in encryptBlock and decryptRSA
const blockSize = 4;


function encryptBlock(bytes, publicKey) {
	
	var binary = util.concatenateBytesIntoBin(bytes);
	// concatinating bytes to single number
	
	var message = bigInt(binary, 2);
	// enctypting got number as message
	var binEncrypted = message.modPow(publicKey.E, publicKey.N).toString(2);
	
	// split to ascii chars got encrypted number
	binEncrypted = util.fillWithLeadingZeros(binEncrypted, 8 * (blockSize + 1));

	var encryptedBlock = "";
	for (var i = 0; i < blockSize + 1; i++) {
		var num = bigInt(binEncrypted.slice(i * 8, (i + 1) * 8), 2);
		encryptedBlock += String.fromCharCode(num);
	}
	return encryptedBlock;
}


function encryptRSA(str, publicKey) {
	var bytes = util.stringToByteArray(str);
	
	while(bytes.length % blockSize !== 0) {
		bytes.push(0);
	}
	var blocks = bytes.length / blockSize;
	var encrypted = "";
	for (let i = 0; i < blocks; i++) {
		var block = bytes.slice(i * blockSize, (i + 1) * blockSize);
		var encryptedBlock = encryptBlock(block, publicKey);
		encrypted = encrypted.concat(encryptedBlock);
	}
	return encrypted;
}


function decryptBlock(str, privateKey) {
	var bytes = new Array(str.length);
	for (let i = 0; i < str.length; i++) {
		bytes[i] = str.charCodeAt(i);
	}

	var binary = util.concatenateBytesIntoBin(bytes);

	var decrypted = bigInt(binary, 2)
		.modPow(privateKey.D, privateKey.N);

	var decryptedBin = decrypted.toString(2);

	decryptedBin = util.fillWithLeadingZeros(decryptedBin, 8 * blockSize);
	
	var decryptedBlock = new Array(blockSize);

	for (let i = 0; i < blockSize; i++) {
		var num = bigInt(decryptedBin.slice(i * 8, (i + 1) * 8), 2);
		decryptedBlock[i] = num.valueOf();
	}
	return decryptedBlock;
}

function decryptRSA(str, privateKey) {
	if (str.length % (blockSize+1) !== 0) {
		throw "Can not devide to blocks with size == $blockSize.";
	}
	var blocks = str.length / (blockSize + 1);
	var decrypted = [];
	for (let i = 0; i < blocks; i++) {
		let encryptedBlock = str.slice(i * (blockSize + 1), (i + 1) * (blockSize + 1));
		decrypted = decrypted.concat(decryptBlock(encryptedBlock, privateKey));
	}
	return util.byteArrayToString(decrypted);
}

function generateRSAKeys() {

	var primeP = util.getRandomBigIntPrime(minPrimeNumber, maxPrimeNumber);
	var primeQ = util.getRandomBigIntPrime(minPrimeNumber, maxPrimeNumber);
	var N = primeP.times(primeQ);
	var F = primeQ.prev().times(primeP.prev());
	var E = bigInt(3674911);

	do {
		E = util.getRandomBigIntPrime(2, F.prev());

	} while(bigInt.gcd(E, F).notEquals(1));
	var D = E.modInv(F);

	var key = {};
	key.publicKey =  { N, E };
	key.privateKey = { N, E, D, P: primeP, Q: primeQ, F };	
	return key;
	
}


exports.decryptBlock = decryptBlock;
exports.encryptBlock = encryptBlock;
exports.generateRSAKeys = generateRSAKeys;
exports.decryptRSA = decryptRSA;
exports.encryptRSA = encryptRSA;
