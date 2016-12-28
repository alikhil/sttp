"use strict";
const chai = require("chai");
const expect = chai.expect; 
const assert = chai.assert;
const hasher = require("../src/hash.js");
const rsa = require("./../src/rsa.js");
const packer = require("./../src/packer.js");
const Base64 = require("./../src/Base64.js");

const DataPacker = packer.DataPacker;
const AuthKeyPacker = packer.AuthKeyPacker;

const base64Regex = /^[a-zA-Z0-9\/+]+={0,2}$/;

const AES_KEY = [ 134, 232, 34, 8, 200, 186, 109, 197, 79, 139, 122, 116, 244, 133, 160, 202 ]; // 128 bit key

describe("Packer", function(){

	describe("DataPacker", function() {

		describe("constructor(aesKey)", function() {
			
			it("Should create AES packer wich can pack and unpack data with given aesKey.", function() {
				let dataPacker = new DataPacker(AES_KEY);
				expect(dataPacker).to.have.property("aesKey", AES_KEY);
			});
		});

		describe("pack(data)", function() {

			it("Should return packet with length less than initial.", function() {
				let dataPacker = new DataPacker(AES_KEY);
				let data = {key : "value", array: [1, 2]};
				let packet = dataPacker.pack(data);
				expect(packet.length).to.be.below(JSON.stringify(data).length);
			});
		});

		describe("unpack(rawData)", function() {
			
			it("Should return initial object that had been packed by the same aes_key.", function() {
				let dataPacker = new DataPacker(AES_KEY);
				let data = {name:"Alik", Surname: "Khilazhev", courses:["IT", "TCS", "OS", "MPP", "CA"]};
				let packedData = dataPacker.pack(data);
				let unpacked = dataPacker.unpack(packedData);
				expect(JSON.parse(unpacked)).to.eql(data);
			});
		});
	});

	describe("AuthKeyPacker", function() {

		describe("constructor(publicKey)", function() {

			it("Should create RSA packer with given public key.", function() {
				let rsaKey = rsa.generateRSAKeys();
				let authKeyPacker = new AuthKeyPacker(rsaKey.publicKey);
				expect(authKeyPacker.canEncrypt()).to.be.true;
				expect(authKeyPacker.canDecrypt()).to.be.false;
			});
		});

		describe("contructor(privateKey, true)", function() {
			
			it("Should create RSA packer with given private key.", function() {
				let rsaKey = rsa.generateRSAKeys();
				let authKeyPacker = new AuthKeyPacker(rsaKey.privateKey, true);
				expect(authKeyPacker.canEncrypt()).to.be.true;
				expect(authKeyPacker.canDecrypt()).to.be.true;
			});
		});

		describe("pack(authKey)", function() {

			let rsaKey = rsa.generateRSAKeys();
			let authKeyPacker = new AuthKeyPacker(rsaKey.privateKey, true);
			let aesKey = "0000111122223333";
			
			it("Should encrypt with public RSA key and return it as packet containing 'data' and 'hash' fields.", function() {
				
				let packet = JSON.parse(Base64.decode(authKeyPacker.pack(aesKey)));
				expect(packet).to.have.property("data");
				expect(packet).to.have.property("hash", hasher.hash(packet.data));
			});

			it("Should encrypt and return as base64 string", function() {
				let encoded = authKeyPacker.pack(aesKey);
				assert.match(encoded, base64Regex, "encoded auth pack data is not in base64");
			});
		});

		describe("unpack(packet)", function() {
			it("Should decrypt packet created by 'pack()' and return initial data.", function() {
				let rsaKey = rsa.generateRSAKeys();
				let authKeyPacker = new AuthKeyPacker(rsaKey.privateKey, true);
				let aesKey = "0000111122223333";
				let packet = authKeyPacker.pack(aesKey);
				let unpacked = authKeyPacker.unpack(packet);
				expect(unpacked).to.be.equal(aesKey);
			});
		});

	});
});