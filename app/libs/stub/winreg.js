'use strict';

function Stub(options) {

}

Stub.prototype.get = function get (name, cb) {
	cb(null, {
		value : '/var;/tmp'
	})
}

module.exports = Stub;
