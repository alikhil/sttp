"use strict";

var chai = require("chai");
var expect = chai.expect; 
var hasher = require("./../src/hash.js");


describe("Hashing", function(){
	it("hash(str) should return HEX or BASE64 hash of str.", function(){
		var str = "STTP is the best protocol ever been!";
		var regex = /^([0-9A-Za-z])+$/g;
		var hash = hasher.hash(str);
		expect(regex.test(hash)).to.be.true;
	});

	it("hash(str) should return different hashes for different values.", function() {
		var str = "STTP is the best protocol ever been!";
		var str2 = "HTTP not safe";
		var hash = hasher.hash(str);
		var hash2 = hasher.hash(str2);
		expect(hash).to.not.equal(hash2);
	});
});