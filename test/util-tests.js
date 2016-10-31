var chai = require("chai");
var expect = chai.expect; 
var util = require("./../src/util.js");
var bigInt = require("big-integer");

describe("Util", function() {

	describe("stringToByteArray(str)", function(){
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

		it("Should transformable to initial one after 2 calls.", function() {
			var str = "Meow, meow! Hello world!";
			var byteArray = util.stringToByteArray(str);
			var res = util.byteArrayToString(byteArray);
			expect(res).to.be.equal(str);
		});
	});

	describe("byteArrayToString(byteArray)", function() {

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



	describe("randomInt(min, max)", function() {
		it("Should generate number in range(min, max).", function() {
			this.retries(10);
			expect(util.randomInt(5, 100)).to.be.within(5, 100);
		});
	});

	describe("power(a, n, mod)", function() {
		it("Should power a by n with module mod.", function() {
			expect(util.power(2, 3, 16)).to.equal(8);
			expect(util.power(174, 55, 221)).to.equal(47);
			expect(util.power(174, 110, 221)).to.equal(220);
			expect(util.power(5, 596, 1234)).to.equal(1013);
		});
	});

	describe("getRandomBigIntPrime(min, max)", function() {

		it("Should return random prime number in range(min, max).", function() {
			this.retries(10);
			var a = bigInt("12213545489161321684"), 
				b = bigInt("9912213545489161321684"); 
			
			var prime = util.getRandomBigIntPrime(a, b);
			expect(prime.lesserOrEquals(b)).to.be.true;
			expect(a.lesserOrEquals(prime)).to.be.true;
			expect(prime.isPrime()).to.be.true;
		});

		this.timeout(50);

		it("Should work less than 50ms.", function(done) {
			var prime = util.getRandomBigIntPrime(1e7, 1e9);
			expect(prime.valueOf()).to.be.within(1e7, 1e9);
			expect(prime.isPrime()).to.be.true;
			done();
		});
	});
	
	describe("decToBin(num)", function() {
		it("Should convert positive int to binary with leading zeros.", function(){
			expect(util.decToBin(1)).to.be.equal("00000001");
			expect(util.decToBin(2)).to.be.equal("00000010");
			expect(util.decToBin(128)).to.be.equal("10000000");
			expect(util.decToBin(255)).to.be.equal("11111111");
		});
	});

	describe("concatenateBytesIntoBin(bytes)", function(){
		it("Should make binary string with concatenating all bytes", function(){

			expect(util.concatenateBytesIntoBin([0])).to.be.equal("00000000");
			expect(util.concatenateBytesIntoBin([128, 15])).to.be.equal("1000000000001111");

		});
	});

	describe("fillWithLeadingZeros(str, len)", function() {
		it("Should fill string with zeros if it's length lesser that given.", function() {
			expect(util.fillWithLeadingZeros("15", 3)).to.be.equal("015");
			expect(util.fillWithLeadingZeros("1", 8)).to.be.equal("00000001");
			expect(util.fillWithLeadingZeros("1000", 3)).to.be.equal("1000");
			expect(util.fillWithLeadingZeros("1000", 4)).to.be.equal("1000");

		});
	});

});


