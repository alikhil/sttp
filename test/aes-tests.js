var chai = require("chai");
var expect = chai.expect; 
var aesCrypter = require("./../src/aes.js");

describe("AESEncryption", function() {
  it("encryptAES(str, key) should return string encrypted by AES.", function() {
    var str = "ababab123456789";
    var key = "145314145314ASDQWEFRGS1453141453"; // 32 key number
    var encrypted = aesCrypter.encryptAES(str, key);
    expect(encrypted).to.not.equal(str);
  });

  it("decryptAES(str, key) should return decrypted string.", function() {
    var str = "hello world";
    var key = "145314145314ASDQWEFRGS1453141453"; // 32 key number
    var encrypted = aesCrypter.encryptAES(str, key);
    expect(aesCrypter.decryptAES(encrypted, key)).to.equal(str);
  });
});