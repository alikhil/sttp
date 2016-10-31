var bigInt = require("big-integer");
var util = require("./util.js");

var minPrimeNumber = bigInt(2).pow(64);
var maxPrimeNumber = bigInt(2).pow(128);


function encryptRSA(str, publicKey) {
	return "$";
}

function decryptRSA(str, privateKey) {
	return "^";
}

function generateRSAKeys() {

	var primeP = util.getRandomBigIntPrime(minPrimeNumber, maxPrimeNumber);
	var primeQ = util.getRandomBigIntPrime(minPrimeNumber, maxPrimeNumber);
	var N = primeP.times(primeQ);
	var F = primeQ.prev().times(primeP.prev());
	var E = bigInt(0);

	do {
		E = util.getRandomBigIntPrime(2, F.prev());

	} while(bigInt.gcd(E, F).notEquals(1));
	var D = E.modInv(N);

	var key = {};
	key.publicKey =  { N, E };
	key.privateKey = { N, E, D, P: primeP, Q: primeQ };	
	return key;
	
}

exports.generateRSAKeys = generateRSAKeys;
exports.decryptRSA = decryptRSA;
exports.encryptRSA = encryptRSA;
