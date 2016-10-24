var chai = require("chai");
var expect = chai.expect; 
var util = require("./../src/util.js");


describe("Util.stringToByteArray(str)", function(){
	it("Should return array of char codes if they < 128.", function(){
		var str = "abcdEDFG01239};%$";
		var byteArray = util.stringToByteArray(str);

		expect(byteArray.length).to.equal(str.length);
		for (var i = 0; i < str.length; i++) {
			expect(str.charCodeAt(i)).to.equal(byteArray[i]);		
		}	
	});

	it("Should return array of bytes containing 2 bytes for single char in range(128, 2048).", function(){
		var str = "ø÷";
		// (÷) - 247; (ø) - 248
		var correctByteArray = [195, 184, 195, 183];
		var byteArray = util.stringToByteArray(str);
		
		expect(byteArray).to.eql(correctByteArray);
	});

	it("Should return array of bytes on for chars with codes in range(0, 2048).", function() {
		var str = "0ø÷1";
		var correctByteArray = [48, 195, 184, 195, 183, 49];
		var byteArray = util.stringToByteArray(str);
		expect(byteArray).to.eql(correctByteArray);
	});

	it("Should return array of bytes containing 3 bytes for single char with code > 2047.", function(){
		// 39550 - 驾; 骆 - 39558
		var str = "驾骆";
		var correctByteArray = [233, 233, 190 ,233, 234, 134];
		var byteArray = util.stringToByteArray(str);
		expect(byteArray).to.eql(correctByteArray);
	});

	it("Should return array of bytes on for chars with codes in any range.", function() {
		var str = "0ø÷1骆";
		var correctByteArray = [48, 195, 184, 195, 183, 49, 233, 234, 134];
		var byteArray = util.stringToByteArray(str);
		expect(byteArray).to.eql(correctByteArray);
	});

});

describe("Util.byteArrayToString(byteArray)", function() {

	it("Should return concatenated string from array of codes less than 128.", function(){
		var byteArray = [48, 65, 97];
		var str = util.byteArrayToString(byteArray);
		expect(str).to.eql("0Aa");
	});

	it("Should return string from array of codes less than < 2048.", function(){
		var byteArray = [48, 66, 98, 195, 184, 195, 183, 99];
		var str = util.byteArrayToString(byteArray);
		expect(str).to.eql("0Bbø÷c");
	});

	it("Should return string from array of any codes.", function() {
		var byteArray = [48, 66, 98, 195, 184, 195, 183, 99, 233, 234, 134, 50];
		var str = util.byteArrayToString(byteArray);
		expect(str).to.equal("0Bbø÷c骆2");
	});
});