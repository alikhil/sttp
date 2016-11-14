var LZString = require("lz-string");
var HashMap = require("hashmap");
var dictionary = new HashMap();
var inputString = "";

function compress(jsonData) {
    return LZString.compress(jsonData);
}

function decompress(compressed) {
    return LZString.decompress(compressed);
}

/**
 * Function that counts number of symbols occurrences in string and returns
 * @param input string that is expected to be JSON (but not a mandatory)
 * @returns {*} a map < symbol, count >
 */
function countOccurrences(input) {
    inputString = input;
    var occurrencesMap = new HashMap();
    for (var i = 0; i < input.length; i++) {
        var currentChar = input.charAt(i);
        if (occurrencesMap.has(currentChar)) {
            var charCount = occurrencesMap.get(currentChar);
            charCount++;
            occurrencesMap.set(currentChar, charCount);
        } else {
            occurrencesMap.set(currentChar, 1);
        }
    }
    return occurrencesMap;
}

/**
 * "Class" Node that will build a Huffman tree later on.
 * @param symbol - char from an input string
 * @param probability - number of occurrences of this symbol in a string
 * @constructor creates a new object of type Node
 */
function Node(symbol, probability) {
    this.symbol = symbol;
    this.probability = probability;
    this.leftNode = null;
    this.rightNode = null;
}

/**
 * Function that just swaps two elements of an array
 * @param array of elements
 * @param firstIndex first element to swap
 * @param secondIndex second element to swap
 */
function swap(array, firstIndex, secondIndex) {
    var temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
}

/**
 * Quick qSort algorithm for probability of Nodes.
 * Why not to use Array.prototype.qSort()?
 * Because I also need to swap elements in keysArray in the same order as valuesArray.
 * So, swap function is always called twice
 * @param keysArray array of symbols
 * @param valuesArray array of probabilities
 */
function quickSort(keysArray, valuesArray) {

    /**
     * @param pivot - index of the pivot
     * @param left - index of leftmost element
     * @param right - index of rightmost element
     */
    function partition(pivot, left, right) {
        var storeIndex = left,
            pivotValue = valuesArray[pivot];

        swap(keysArray, pivot, right);
        swap(valuesArray, pivot, right);

        for (var i = left; i < right; i++) {
            if (valuesArray[i] < pivotValue) {
                swap(keysArray, i, storeIndex);
                swap(valuesArray, i, storeIndex);
                storeIndex++;
            }
        }

        swap(keysArray, right, storeIndex);
        swap(valuesArray, right, storeIndex);
        return storeIndex;
    }

    function qSort(left, right) {
        var pivot = null;

        if (typeof left !== "number") {
            left = 0;
        }

        if (typeof right !== "number") {
            right = valuesArray.length - 1;
        }

        if (left < right) {
            pivot = left + Math.ceil((right - left) * 0.5);
            var newPivot = partition(pivot, left, right);

            qSort(left, newPivot - 1);
            qSort(newPivot + 1, right);
        }
    }

    return {
        qSort,
        partition
    };
}

/**
 * Function that returns sorted array of Nodes that is sorted by priority, which is probability
 * @param occurrencesMap - map < symbol, count >
 * @returns {*[]} sorted array of Nodes
 */
function createPriorityQueue(occurrencesMap) {
    // After that create an array of Nodes and qSort it by Probability value and return this array
    var queue = [occurrencesMap.count()];
    var keysArray = occurrencesMap.keys();
    var valuesArray = occurrencesMap.values();
    quickSort(keysArray, valuesArray).qSort(0, valuesArray.length - 1);
    for (var i = 0; i < occurrencesMap.count(); i++) {
        queue[i] = new Node(keysArray[i], valuesArray[i]);
    }
    return queue;
}

/**
 * Function for sorting queue after adding a new node.
 * Using selection sort right now. In future will make upper qsort more generic.
 * @param queue of Nodes
 * @returns {*} array of sorted Nodes
 */
function selectionSort(queue) {
    var length = queue.length, min;

    for (var i = 0; i < length; i++) {
        min = i;

        for (var j = i + 1; j < length; j++) {
            if (queue[j].probability < queue[min].probability) {
                min = j;
            }
        }

        if (i !== min) {
            swap(queue, i, min);
        }
    }
    return queue;
}

/**
 * Functions is building a Huffman tree that is going to be used to uniquely decode an input
 * @param queue sorted array of Nodes
 * @returns {*} root Node for a tree
 */
function buildTree(queue) {

    var newNode;
    while (queue.length > 1) {
        newNode = new Node(null, queue[0].probability + queue[1].probability);
        newNode.leftNode = queue[0];
        newNode.rightNode = queue[1];
        queue[0] = null;
        queue[1] = newNode;
        queue = queue.slice(1, queue.length);
        queue = selectionSort(queue);
    }
    return newNode;
}

/**
 * Function that generates a dictionary from a given root node of a Huffman tree.
 * @param node root of the tree
 * @param codeString string that will be applied to symbol
 * @returns {*} dictionary with pair <symbol, code>
 */
function generateDictionary(node, codeString) {
    if (node.symbol != null) {
        dictionary.set(node.symbol, codeString);
    }
    if (node.leftNode != null) {
        generateDictionary(node.leftNode, codeString + "0");
    }
    if (node.rightNode != null) {
        generateDictionary(node.rightNode, codeString + "1");
    }
    return dictionary;
}

/**
 * Function that compress the input string and return compressed value
 * @returns {string} encoded string
 */
function compressString() {
    var resultString = "";
    for (var i = 0; i < inputString.length; i++) {
        resultString += dictionary.get(inputString.charAt(i));
    }
    return resultString;
}

exports.compress = compress;
exports.decompress = decompress;
exports.countOccurences = countOccurrences;
exports.createPriorityQueue = createPriorityQueue;
exports.quickSort = quickSort;
exports.swap = swap;
exports.selectionSort = selectionSort;
exports.buildTree = buildTree;
exports.Node = Node;
exports.generateDictionary = generateDictionary;
exports.compressString = compressString;