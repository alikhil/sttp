var chai = require("chai");
var expect = chai.expect; 
var assert = chai.assert;

var rsa = require("./../src/rsa.js");
var packer = require("./../src/packer.js");
var DataPacker = packer.DataPacker;
var AuthKeyPacker = packer.AuthKeyPacker;


const AES_KEY = "put any valid aes_key there";

describe("Packer", function(){

	describe("DataPacker", function() {

		describe("constructor(aesKey)", function() {
			
			it("Should create AES packer wich can pack and unpack data with given aesKey.", function() {
				var d_packer = new DataPacker(AES_KEY);
				expect(d_packer).to.have.property("aesKey", AES_KEY);
			});
		});

		describe("pack(data)", function() {
			
			it("Should return packed(compressed and encrypted) data as base64 string.", function() {
				var dataPacker = new DataPacker(AES_KEY);
				var packedData = dataPacker.pack({key : "value", array: [1, 2]});

				assert.match(packedData, /^([0-9A-Za-z])+$/g, "packed data is not in base64");
			});
		});

		describe("unpack(rawData)", function() {
			
			it("Should return initial object that had been packed by the same aes_key.", function() {
				var dataPacker = new DataPacker(AES_KEY);
				var data = {name:"Alik", Surname: "Khilazhev", courses:["IT", "TCS", "OS", "MPP", "CA"]};
				var packedData = dataPacker.pack(data);
				expect(dataPacker.unpack(packedData)).to.be.equal(data);
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
				console.log(rsaKey);
				var authKeyPacker = new AuthKeyPacker(rsaKey.privateKey, true);
				expect(authKeyPacker.canEncrypt()).to.be.true;
				expect(authKeyPacker.canDecrypt()).to.be.true;
			});
		});

	});
});