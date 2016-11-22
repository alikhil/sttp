var chai = require("chai");
var expect = chai.expect; 
var assert = chai.assert;
var hasher = require("../src/hash.js");
var rsa = require("./../src/rsa.js");
var packer = require("./../src/packer.js");
var Base64 = require("./../src/Base64.js");

var DataPacker = packer.DataPacker;
var AuthKeyPacker = packer.AuthKeyPacker;

var base64Regex = /^[a-zA-Z0-9\/+]+={0,2}$/

const AES_KEY = "put any valid aes_key there";

describe("Packer", function(){

	describe("DataPacker", function() {

		describe("constructor(aesKey)", function() {
			
			it("Should create AES packer wich can pack and unpack data with given aesKey.", function() {
				var dataPacker = new DataPacker(AES_KEY);
				expect(dataPacker).to.have.property("aesKey", AES_KEY);
			});
		});

		describe("pack(data)", function() {

			it("Should return packet with length less than initial.", function() {
				var dataPacker = new DataPacker(AES_KEY);
				var data = {key : "value", array: [1, 2]};
				var packet = dataPacker.pack(data);
				expect(packet.length).to.be.below(JSON.stringify(data).length);
			});
		});

		describe("unpack(rawData)", function() {
			
			it("Should return initial object that had been packed by the same aes_key.", function() {
				var dataPacker = new DataPacker(AES_KEY);
				var data = {name:"Alik", Surname: "Khilazhev", courses:["IT", "TCS", "OS", "MPP", "CA"]};
				var packedData = dataPacker.pack(data);
				expect(JSON.parse(dataPacker.unpack(packedData))).to.eql(data);
			});
		});
	});

	describe("AuthKeyPacker", function() {

		describe("constructor(publicKey)", function() {

			it("Should create RSA packer with given public key.", function() {
				var rsaKey = rsa.generateRSAKeys();
				var authKeyPacker = new AuthKeyPacker(rsaKey.publicKey);
				expect(authKeyPacker.canEncrypt()).to.be.true;
				expect(authKeyPacker.canDecrypt()).to.be.false;
			});
		});

		describe("contructor(privateKey, true)", function() {
			
			it("Should create RSA packer with given private key.", function() {
				var rsaKey = rsa.generateRSAKeys();
				var authKeyPacker = new AuthKeyPacker(rsaKey.privateKey, true);
				expect(authKeyPacker.canEncrypt()).to.be.true;
				expect(authKeyPacker.canDecrypt()).to.be.true;
			});
		});

		describe("pack(authKey)", function() {

			var rsaKey = rsa.generateRSAKeys();
			var authKeyPacker = new AuthKeyPacker(rsaKey.privateKey, true);
			var aesKey = "0000111122223333";
			
			it("Should encrypt with public RSA key and return it as packet containing 'data' and 'hash' fields.", function() {
				
				var packet = JSON.parse(Base64.decode(authKeyPacker.pack(aesKey)));
				expect(packet).to.have.property("data");
				expect(packet).to.have.property("hash", hasher.hash(packet.data));
			});

			it("Should encrypt and return as base64 string", function() {
				var encoded = authKeyPacker.pack(aesKey);
				assert.match(encoded, base64Regex, "encoded auth pack data is not in base64");
			});
		});

		describe("unpack(packet)", function() {
			it("Should decrypt packet created by 'pack()' and return initial data.", function() {
				var rsaKey = rsa.generateRSAKeys();
				var authKeyPacker = new AuthKeyPacker(rsaKey.privateKey, true);
				var aesKey = "0000111122223333";
				var packet = authKeyPacker.pack(aesKey);
				var unpacked = authKeyPacker.unpack(packet);
				expect(unpacked).to.be.equal(aesKey);
			});
		});

	});
});