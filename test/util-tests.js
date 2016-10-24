var chai = require("chai");
var expect = chai.expect; 
var util = require("./../src/util.js");


describe("Util.stringToByteArray()", function(){
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

	it("Should return array of bytes containing 3 bytes for single char with code > 2047.", function(){
		// 39550 - 驾; 骆 - 39558
		var str = "驾骆";
		var correctByteArray = [233, 233, 190 ,233, 234, 134];
		var byteArray = util.stringToByteArray(str);
		expect(byteArray).to.eql(correctByteArray);
	});
});