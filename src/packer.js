

var DataPacker = function(aesKey) {
	
	this.aesKey = aesKey;
	
	this.pack = function() {
		return "#$%";
	};
	
	this.unpack = function(rawData) {
		return rawData;
	};

	return this;
};

var AuthKeyPacker = function(key, private = false) {
	
	function hasKey(obj, key) {
		return obj.hasOwnProperty(key);
	}

	this.hasPrivateKey = private;
	this.key = key;


	this.canEncrypt = function() {
		return key !== null && hasKey(key, "E")
			&& hasKey(key, "N");
	};

	this.canDecrypt = function() {
		return this.hasPrivateKey && this.canEncrypt()
			&& hasKey(key, "P") && hasKey(key, "Q")
			&& hasKey(key, "D") && hasKey(key, "F");
	};
}


exports.AuthKeyPacker = AuthKeyPacker;
exports.DataPacker = DataPacker;