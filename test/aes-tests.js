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
    var test = function(str, key) {
      var encrypted = aesCrypter.encryptAES(str, key);
      expect(aesCrypter.decryptAES(encrypted, key)).to.equal(str);
    };

    it("should return decrypted string.", function() {
      var str = "hello world";
      var key = "145314145314ASDQWEFRGS1453141453"; // 32 key number
      test(str, key);
      test("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq", str);
      test(JSON.stringify({v : 15, qwe:"qweqwea34"}), key);
      test("㞂⃖੠鸠尠㜂᠆삮ᄀ桄脹뀍ꀣᘁ》ꀯ退", key);
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