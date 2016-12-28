"use strict";

/**
 * Created by Kevin Khanda on 25.10.2016.
 */
var chai = require("chai");
var expect = chai.expect;
var compresser = require("./../src/compress");
var array1 = [1, 2, 3, 4];
var array2 = [5, 8, 2, 6]; // this one should be sorted
var qsort = compresser.quickSort(array1, array2);

describe("Sorting", function () {
	it("partition() should return a store index for a new pivot: ", function () {
		var left = 0, right = array2.length - 1;
		var pivot = left + Math.ceil((right - left) * 0.5);
		var newPivot = qsort.partition(pivot, left, right);
		expect(newPivot).to.equal(0);
	});

	it("qSort() should return a sorted array: ", function () {
		qsort.qSort(0, array2.length - 1);
		expect(array2[0]).to.equal(2);
		expect(array2[1]).to.equal(5);
		expect(array2[2]).to.equal(6);
		expect(array2[3]).to.equal(8);
	});
});
