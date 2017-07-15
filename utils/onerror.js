const assert = require('assert');

// custom error handler
const onerror = (app) => {
	app.context.onerror = function(err) {
		if(null == err) return;

		err.status = err.status || 500
		// emit this error to koa
		this.app.emit('error', err, this);

		this.status = err.status || 500;
		this.statusText = err.statusText;

		this.set(err.headers);

		this.body = err.body;
		// send the error to client
		this.res.end(this.body);
	}
}

module.exports = onerror