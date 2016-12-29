"use strict";

const chai = require("chai");
const expect = chai.expect; 
const bigInt = require("big-integer");

const rsaCrypter = require("./../src/rsa.js");




describe("RSAEncryption", function() {

	describe("generateRSAKeys()", function() {
	
		it("Should contain 'publicKey' and 'privateKey' properties.", function() {
			let keys = rsaCrypter.generateRSAKeys();
			expect(keys).to.have.property("publicKey");
			expect(keys).to.have.property("privateKey");
		});

		it("Should contain 'N' and 'E' fields on 'publicKey'.", function() {
			let publicKey = rsaCrypter.generateRSAKeys().publicKey;
			expect(publicKey).to.have.property("N");
			expect(publicKey).to.have.property("E");
		});

		it("Should contain 'N', 'E', 'D', 'R' and 'Q' fields.", function() {
			let privateKey = rsaCrypter.generateRSAKeys().privateKey;
			expect(privateKey).to.have.property("N");
			expect(privateKey).to.have.property("E");
			expect(privateKey).to.have.property("D");
			expect(privateKey).to.have.property("P");
			expect(privateKey).to.have.property("Q");
		});

		it("Should contatin D such that ED = 1 (mod F).", function(){
			let privateKey = rsaCrypter.generateRSAKeys().privateKey;
			let D = privateKey.D;
			let E = privateKey.E;
			let F = privateKey.F;
			expect(E.times(D).mod(F).equals(1)).to.be.true;
		});

		it("Should contain N such that N = P * Q.", function() {
			let privateKey = rsaCrypter.generateRSAKeys().privateKey;
			let N = privateKey.N;
			let P = privateKey.P;
			let Q = privateKey.Q;
			expect(P.times(Q).equals(N)).to.be.true;
		});

	});

	describe("encryptRSA(str, pubkey)", function() {
	
		it("Should return string encrypted by RSA.", function() {
			let str = "Meow, meow! Hello world!";
			let keys = rsaCrypter.generateRSAKeys();
			let encrypted = rsaCrypter.encryptRSA(str, keys.publicKey);
			expect(encrypted).to.not.equal(str);
		});
	
	});

	describe("encryptBlock(bytes, publicKey) and decryptedBlock(block, privateKey)", function() {
		
		it("Should return encrypted by RSA block with $blockSize bytes.", function(){
			let bytes = [15, 156, 78, 65];
			let keys = rsaCrypter.generateRSAKeys();
			let encryptedBlock = rsaCrypter.encryptBlock(bytes, keys.publicKey);
			let decryptedBlock = rsaCrypter.decryptBlock(encryptedBlock, keys.privateKey);
			expect(decryptedBlock).to.eql(bytes);
		});

	});

	describe("decryptRSA(str, privkey)", function() {
	
		it("Should return decrypted string.", function() {
			let str = "Meow, meow! Hello world!";
			let keys = rsaCrypter.generateRSAKeys();
			//keys = {"publicKey":{"N":bigInt(5999356123), "E": bigInt(5047596091)},"privateKey":{"N":bigInt(5999356123),"E":bigInt(5047596091),"D":bigInt(1668034675), "P":bigInt(76837),"Q" : bigInt(78079),"F": bigInt(5999201208)}};
			let encrypted = rsaCrypter.encryptRSA(str, keys.publicKey);
			let decrypted = rsaCrypter.decryptRSA(encrypted, keys.privateKey);
			expect(decrypted).to.equal(str);
		});

	});

	describe("BigInt", function() {
		it("Should be encryptable and decryptable", function() {
			let K = rsaCrypter.generateRSAKeys().privateKey;

			let message = bigInt("10001000100010001000100010001000",2);

			let encrypted = message.modPow(K.E, K.N);
			let decrypted = encrypted.modPow(K.D, K.N);
			expect(decrypted.equals(message)).to.be.true;  
		});
	});
});