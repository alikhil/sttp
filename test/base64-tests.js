var chai = require("chai");
var expect = chai.expect;

var base64 = require("../src/Base64.js").Base64();


describe("Base64", function() {
	describe("encode(str)", function() {

		it("Should encode str into base64 and return result.", function(){
			expect(base64.encode("a")).to.be.equal("YQ==");
		});
	});

	describe("decode(b64)", function() {
		it("Should decode base64 to initial string.", function() {
			expect(base64.decode("YQ==")).to.be.equal("a");
		});
	});
});

