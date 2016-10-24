var chai = require("chai");
var expect = chai.expect; 
var rsaCrypter = require("./../src/rsa.js");




describe("RSAEncryption", function(){
  it("encryptRSA(str, pubkey) should return string encrypted by RSA.", function(){
    var str = "Meow, meow! Hello world!";
    var keys = rsaCrypter.generateRSAKeys();
    var encrypted = rsaCrypter.encryptRSA(str, keys.publicKey);
    expect(encrypted).to.not.equal(str);
  });

  it("decryptRSA(str, privkey) should return decrypted string.", function() {
    var str = "Meow, meow! Hello world!";
    var keys = rsaCrypter.generateRSAKeys();
    var encrypted = rsaCrypter.encryptRSA(str, keys.publicKey);
    var decrypted = rsaCrypter.decryptRSA(str, keys.privateKey);
    expect(str).to.equal(decrypted);
  });
});