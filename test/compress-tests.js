var chai = require("chai");
var expect = chai.expect; // we are using the "expect" style of Chai
var compresser = require("./../src/compress");
var Node = compresser.Node;

describe("Compression", function () {
    it("compress() should return string with less length than initial\'s: ", function () {
        var string = JSON.stringify({ id : "780710", folderID : "42024", displayOrder : 2});
        var compressed = compresser.compress(string);
        expect(compressed.length).to.be.below(string.length);
    });

    it("decompress() should retutn initial string before compression: ", function () {
        var string = JSON.stringify({ id : "780710", folderID : "42024", displayOrder : 3});
        var compressed = compresser.compress(string);
        expect(compresser.decompress(compressed)).to.equal(string);
    });

    it("compress() should compress JSON string and then decompress and return the initial string: ", function () {
        var str = JSON.stringify({ id : "780710", folderID : "42024", displayOrder : 2});
        var compressed = compresser.compress(str);
        var decompressed = compresser.decompress(compressed);
        expect(decompressed).to.equal(str);
    });

    it("countOccurrences() counts symbols occurrences in a " +
        "string input and then returns a map \< symbol, count \>: ", function () {
        var str = "test.";
        var resultMap = compresser.countOccurences(str);
        expect(resultMap.get("t")).to.equal(2);
        expect(resultMap.get("e")).to.equal(1);
        expect(resultMap.get("s")).to.equal(1);
        expect(resultMap.get(".")).to.equal(1);
    });

    it("countOccurrences() counts symbols occurrences in a " +
        "string input with a spaces and then returns a map \< symbol, count \>: ", function () {
        var str = "String with a spaces for testing.";
        var resultMap = compresser.countOccurences(str);
        expect(resultMap.get("S")).to.equal(1);
        expect(resultMap.get("s")).to.equal(3);
        expect(resultMap.get("t")).to.equal(4);
        expect(resultMap.get("r")).to.equal(2);
        expect(resultMap.get("i")).to.equal(3);
        expect(resultMap.get("n")).to.equal(2);
        expect(resultMap.get("g")).to.equal(2);
        expect(resultMap.get(" ")).to.equal(5);
        expect(resultMap.get("w")).to.equal(1);
        expect(resultMap.get("h")).to.equal(1);
        expect(resultMap.get("a")).to.equal(2);
        expect(resultMap.get("p")).to.equal(1);
        expect(resultMap.get("c")).to.equal(1);
        expect(resultMap.get("e")).to.equal(2);
        expect(resultMap.get("f")).to.equal(1);
        expect(resultMap.get("o")).to.equal(1);
        expect(resultMap.get(".")).to.equal(1);
    });

    it("createPriorityQueue() should return a queue of Nodes sorted by priority (probability) value: ", function () {
        var str = "test";
        var map = compresser.countOccurences(str);
        var queue = compresser.createPriorityQueue(map);
        expect(queue[0].symbol).to.equal("e");
        expect(queue[0].probability).to.equal(1);
        expect(queue[1].symbol).to.equal("s");
        expect(queue[1].probability).to.equal(1);
        expect(queue[2].symbol).to.equal("t");
        expect(queue[2].probability).to.equal(2);
    });

    it("swap() just swap two elements: ", function () {
        var array = ["string1", "string2"];
        compresser.swap(array, 0, 1);
        expect(array[0]).to.equal("string2");
        expect(array[1]).to.equal("string1");
    });

    it("selectionSort() sorts a given array of Nodes", function () {
        var array = [new Node("a", 4), new Node("b", 7), new Node("c", 2)];
        compresser.selectionSort(array);
        expect(array[0].probability).to.equal(2);
        expect(array[1].probability).to.equal(4);
        expect(array[2].probability).to.equal(7);
    });

    it("buildTree() should return a Node, which is a Root Node of a tree: ", function () {
        var string = "test";
        var tree = compresser.buildTree(compresser.createPriorityQueue(compresser.countOccurences(string)));
        expect(tree.probability).to.equal(4);
        expect(tree.rightNode.symbol).to.equal("t");
        expect(tree.rightNode.probability).to.equal(2);
        expect(tree.leftNode.probability).to.equal(2);
        expect(tree.leftNode.leftNode.symbol).to.equal("e");
        expect(tree.leftNode.leftNode.probability).to.equal(1);
        expect(tree.leftNode.rightNode.symbol).to.equal("s");
        expect(tree.leftNode.rightNode.probability).to.equal(1);
    });

    it("generateDictionary() should generate dictionary with pairs <symbol, code>: ", function () {
        var string = "test";
        var tree = compresser.buildTree(compresser.createPriorityQueue(compresser.countOccurences(string)));
        var dictionary = compresser.generateDictionary(tree, "");
        expect(dictionary.has("t")).to.equal(true);
        expect(dictionary.has("e")).to.equal(true);
        expect(dictionary.has("s")).to.equal(true);
        expect(dictionary.get("t")).to.equal("1");
        expect(dictionary.get("e")).to.equal("00");
        expect(dictionary.get("s")).to.equal("01");
    });

    it("compressString() should return a compressed string based on existing dictionary: ", function () {
        var string = "test";
        var tree = compresser.buildTree(compresser.createPriorityQueue(compresser.countOccurences(string)));
        compresser.generateDictionary(tree, "");
        var resultString = compresser.compressString();
        expect(resultString).to.equal("100011");
    });
});

