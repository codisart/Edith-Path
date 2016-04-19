'use strict';

function Stub(options) {

}

Stub.prototype.get = function get (name, cb) {
	cb(null, {
		value : '/var;/temp'
	});
};

module.exports = Stub;
