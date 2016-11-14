var chai = require("chai");
var expect = chai.expect; 
var aesCrypter = require("./../src/aes.js");

describe("AESEncryption", function() {

  describe("encryptAES(str, key)", function() {
    
    it("should return string encrypted by AES.", function(){
      var str = "ababab123456789";
      var key = "145314145314ASDQWEFRGS1453141453"; // 32 key number
      var encrypted = aesCrypter.encryptAES(str, key);
      expect(encrypted).to.not.equal(str);
    });

  });

  describe("decryptAES(str, key)", function() {
    it("should return decrypted string.", function() {
      var str = "hello world";
      var key = "145314145314ASDQWEFRGS1453141453"; // 32 key number
      var encrypted = aesCrypter.encryptAES(str, key);
      expect(aesCrypter.decryptAES(encrypted, key)).to.equal(str);
    });
  });

  describe("generateKey()", function(){
    it("should return 16 byte random key.", function() {
      var key = aesCrypter.generateKey();
      expect(key).to.have.lengthOf(16);
    });

    it("should return 1 byte elements each.", function() {
      var key = aesCrypter.generateKey();
      for (var i = 0; i < key.length; i++) {
        expect(key[i]).to.be.within(0, 255);
      }
    }); 
  });

});