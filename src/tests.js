var compressor = require("./compress.js")
var aes = require("./aes");
var fs = require("fs");

var aesKey = "0000111122224444";

var file = fs.readFile("test.txt","utf8", function (err, text) {
	 
	 var compressed = compressor.compress(text);  

	 console.log("compressed length : " + compressed.length);
	 console.log("initial length:" + text.length);

	 var encrypted = aes.encryptAES(compressed, aesKey);
	 var data = {data: encrypted};
	 var json = "{ 'data' : '" + escape(encrypted) + "' }"; 
	 console.log(json.length);
	 console.log("encrypted length: "+ encrypted.length);
});