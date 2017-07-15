const dev_env = require('./development')
const test_env = require('./test')

module.exports = {
	development: dev_env,
	test: test_env
}[process.env.NODE_ENV || 'development']