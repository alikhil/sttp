"use strict";

const chai = require("chai");
chai.should();
chai.use(require("chai-things"));
const expect = chai.expect; 
const keys = require("../src/keys.js");
const NodeRSA = require("node-rsa");

describe("keys", () => {
	describe("generateAESKey(length)", () => {
		it("should generate aes key", () => {
			let test = function(length) {
				let key = keys.generateAESKey(length);
				expect(key).to.have.length.is(length);
				key.should.all.satisfy((elm) => 
					elm >= String.fromCharCode(0) && elm < String.fromCharCode(256));
			};
			test(16);
			test(24);
			test(32);
		});
	});

	describe("generateRSA(options)", () => {
		function rsaTest(bits=1024, exp=65537) {

			describe(`should generate rsa key with given options: ${bits} bits, ${exp} - public exp`, () => {

				let options = { bits, exp };
				let rsaKey = {};
				it("should generate key", () => { 
					rsaKey = keys.generateRSAKey(options); 
				});
				
				it ("should have public and private fields", () => {
					expect(rsaKey).have.property("public");
					expect(rsaKey).have.property("private");
				});

				let publicKey ={};

				it("public field should be restorable to publicKey ", () => {
					publicKey =  new NodeRSA(rsaKey.public, "public");
					expect(publicKey.isPublic(true)).to.be.true;
				});

				let privateKey = {};

				it("private field should be restorable to privateKey", () => {
					privateKey = new NodeRSA(rsaKey.private, "private");
				});
				
				it("keys should have the size as was given in options", () => {
					expect(privateKey.getKeySize()).to.be.equal(options.bits);
					expect(publicKey.getKeySize()).to.be.equal(options.bits);
				});
			});
		}

		rsaTest();
		rsaTest(512);
		//rsaTest(2048);
	});
});