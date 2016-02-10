'use strict';

var parseString = function(string) {
	if (typeof string !== 'string') {
		return null;
	}

	return string.split(";");
};

var parseArray = function(array) {
	if (typeof array !== 'object' || Object.prototype.toString.call(array) !== '[object Array]') {
		return null;
	}
	var stringImploded = '';

	var length = array.length;
	for (var i = 0; i < length; i++) {
		if (typeof array[i] !== 'string' || array[i].indexOf(";")  > -1) {
			throw "Error : " + typeof array[i] + array[i].indexOf(";");
		}
		stringImploded += i > 0 ? ';' : '';
		stringImploded += array[i];
	}
	return stringImploded;
};

var addCarat = function(string) {
	var regex = /(%)([^\\;]+)(%)/g;

	return string.replace(regex, "$1$2^$3");
};


exports.parseString = parseString;
exports.parseArray 	= parseArray;
exports.addCarat 	= addCarat;
