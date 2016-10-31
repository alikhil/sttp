var bigInt = require("big-integer");
var util = require("./util.js");

var minPrimeNumber = bigInt(2).pow(32);
var maxPrimeNumber = bigInt(2).pow(33);


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

exports.generateRSAKeys = generateRSAKeys;
exports.decryptRSA = decryptRSA;
exports.encryptRSA = encryptRSA;
