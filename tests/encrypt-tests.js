var chai = require("chai");
var expect = chai.expect; 
var crypter = require("./../src/encrypt.js");

describe("AESEnctyption", function() {
  it("encryptAES(str, key) should return string encrypted by AES.", function() {
    var str = "ababab123456789";
    var key = "145314145314ASDQWEFRGS1453141453"; // 32 key number
    var encrypted = crypter.encryptAES(str, key);
    expect(encrypted).to.not.equal(str);
  });

  it("decryptAES(str, key) should return decrypted string.", function() {
  	var str = "hello world";
    var key = "145314145314ASDQWEFRGS1453141453"; // 32 key number
  	var encrypted = crypter.encryptAES(str, key);
  	expect(crypter.decryptAES(encrypted, key)).to.equal(str);
  });
});

describe("Hashing", function(){
  it("hash(str) should return HEX or BASE64 hash of str.", function(){
    var str = "STTP is the best protocol ever been!";
    var regex = /^([0-9A-Za-z])+$/g;
    var hash = crypter.hash(str);
    expect(regex.test(hash)).to.be.true;
  });

  it("hash(str) should return different hashes for different values.", function() {
    var str = "STTP is the best protocol ever been!";
    var str2 = "HTTP not safe";
    var hash = crypter.hash(str);
    var hash2 = crypter.hash(str2);
    expect(hash).to.not.equal(hash2);
  });
});