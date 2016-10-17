var chai = require("chai");
var expect = chai.expect; // we are using the "expect" style of Chai
var compresser = require("./../src/compress");

describe("Compression", function() {
  it("compress() should return string with less length than initial\'s", function() {
    var str = "ababab123456789";
    var compressed = compresser.compress(str);
    expect(compressed.length).to.be.below(str.length);
  });

  it("decompress() should retutn initial string before compression", function() {
  	var str = "hello world";
  	var compressed = compresser.compress(str);
  	expect(compresser.decompress(compressed)).to.equal(str);
  });
});

