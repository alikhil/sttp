var chai = require("chai");
var expect = chai.expect; 
var rsaCrypter = require("./../src/rsa.js");




describe("RSAEncryption", function() {

  describe("generateRSAKeys()", function() {
    
    it("Should contain 'publicKey' and 'privateKey' properties.", function() {
      var keys = rsaCrypter.generateRSAKeys();
      expect(keys).to.have.property("publicKey");
      expect(keys).to.have.property("privateKey");
    });

    it("Should contain 'N' and 'E' fields on 'publicKey'.", function() {
      var publicKey = rsaCrypter.generateRSAKeys().publicKey;
      expect(publicKey).to.have.property("N");
      expect(publicKey).to.have.property("E");
    });

    it("Should contain 'N', 'E', 'D', 'R' and 'Q' fields.", function() {
      var privateKey = rsaCrypter.generateRSAKeys().privateKey;
      expect(privateKey).to.have.property("N");
      expect(privateKey).to.have.property("E");
      expect(privateKey).to.have.property("D");
      expect(privateKey).to.have.property("P");
      expect(privateKey).to.have.property("Q");
    });

    it("Should contatin D such that ED = 1 (mod N).", function(){
      var privateKey = rsaCrypter.generateRSAKeys().privateKey;
      var D = privateKey.D;
      var E = privateKey.E;
      var N = privateKey.N;
      expect(E.times(D).mod(N).equals(1)).to.be.true;
    });

    it("Should contain N such that N = P * Q.", function() {
      var privateKey = rsaCrypter.generateRSAKeys().privateKey;
      var N = privateKey.N;
      var P = privateKey.P;
      var Q = privateKey.Q;
      expect(P.times(Q).equals(N)).to.be.true;
    });

  });

  describe("encryptRSA(str, pubkey)", function() {
  
    it("Should return string encrypted by RSA.", function() {
      var str = "Meow, meow! Hello world!";
      var keys = rsaCrypter.generateRSAKeys();
      var encrypted = rsaCrypter.encryptRSA(str, keys.publicKey);
      expect(encrypted).to.not.equal(str);
    });
  
  });

  describe("decryptRSA(str, privkey)", function() {
    
    it("Should return decrypted string.", function() {
      var str = "Meow, meow! Hello world!";
      var keys = rsaCrypter.generateRSAKeys();
      var encrypted = rsaCrypter.encryptRSA(str, keys.publicKey);
      var decrypted = rsaCrypter.decryptRSA(str, keys.privateKey);
      expect(str).to.equal(decrypted);
    });

  });

});