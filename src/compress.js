var LZString = require("lz-string");
var HashMap = require("hashmap");

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

function swap(queue, firstIndex, secondIndex) {
    var temp = queue[firstIndex];
    queue[firstIndex] = queue[secondIndex];
    queue[secondIndex] = temp;
}

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

function buildTree(queue) {

    var newNode;
    while (queue.length > 1) {
        newNode = new Node(null, queue[0].probability + queue[1].probability);
        newNode.leftNode = queue[0];
        newNode.rightNode = queue[1];
        queue[0] = null;
        queue[1] = null;
        queue[1] = newNode;
        queue = queue.slice(1, queue.length);
        queue = selectionSort(queue);
    }
    return newNode;
}

exports.compress = compress;
exports.decompress = decompress;
exports.countOccurences = countOccurrences;
exports.createPriorityQueue = createPriorityQueue;
exports.quickSort = quickSort;
exports.swap = swap;
exports.selectionSort = selectionSort;
exports.buildTree = buildTree;