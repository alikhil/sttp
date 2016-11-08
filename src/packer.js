

var DataPacker = function(aes_key) {
	
	this.aesKey = aes_key;
	
	this.pack = function() {
		return "#$%";
	};
	
	this.unpack = function(rawData) {
		return rawData;
	};

	return this;

}




exports.DataPacker = DataPacker;