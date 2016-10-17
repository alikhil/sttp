var chai = require("chai");
var expect = chai.expect; // we are using the "expect" style of Chai
var compresser = require("./../src/compress");

describe("Compression", function () {
    it("compress() should return string with less length than initial\'s", function () {
        var str = "{\"id\":\"780710\",\"folderID\":\"42024\",\"displayOrder\":2}"; // JSON string as an input
        var compressed = compresser.compress(str);
        expect(compressed.length).to.be.below(str.length);
    });

    it("decompress() should retutn initial string before compression", function () {
        var str = "{\"id\":\"780724\",\"folderID\":\"42024\",\"displayOrder\":3}";
        var compressed = compresser.compress(str);
        expect(compresser.decompress(compressed)).to.equal(str);
    });

    it("compress() should compress JSON string and then decompress and return the initial string: ", function () {
        var str = "{\"id\":\"780710\",\"folderID\":\"42024\",\"displayOrder\":2}";
        var compressed = compresser.compress(str);
        var decompressed = compresser.decompress(compressed);
        expect(decompressed).to.equal(str);
    })
});

