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
 * @param keysArray array of symbols
 * @param valuesArray array of probabilities
 */
function QuickSort(keysArray, valuesArray) {

	/**
	 * This function should be called twice, for both arrays, when swap is needed
	 * @param array
	 * @param indexA
	 * @param indexB
	 */
	function swap(array, indexA, indexB) {
		var temp = array[indexA];
		array[indexA] = array[indexB];
		array[indexB] = temp;
	}

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
			if(valuesArray[i] < pivotValue) {
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
        qSort: qSort,
        swap: swap,
        partition: partition
    };
}

/**
 * Function that returns sorted array of Nodes that is sorted by priority, which is probability
 * @param occurrencesMap - map < symbol, count >
 * @returns {*[]} sorted array of Nodes
 */
function createPriorityQueue(occurrencesMap) {
	// After that create an array of Nodes and sort it by Probability value and return this array
	var queue = [occurrencesMap.count()];
	var keysArray = occurrencesMap.keys();
	var valuesArray = occurrencesMap.values();
	QuickSort(keysArray, valuesArray).qSort(0, valuesArray.length - 1);
	for (var i = 0; i < occurrencesMap.count(); i++) {
		queue[i] = new Node(keysArray[i], valuesArray[i]);
	}
	return queue;
}

exports.compress = compress;
exports.decompress = decompress;
exports.countOccurences = countOccurrences;
exports.createPriorityQueue = createPriorityQueue;
exports.quickSort = QuickSort;