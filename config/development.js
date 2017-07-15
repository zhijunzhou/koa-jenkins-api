module.exports = {
	env: 'development',
	port: 3001,
	docker_url: 'http://192.168.99.100/',
	jenkins_host: 'http://username:password@192.168.99.100:8080',
	jenkins_api: {
		NEWJOB: '%s/createItem?name=%s',
		DELETE: '%s/job/%s/doDelete',
		BUILD: '%s/job/%s/build',
		BUILDWITHPARAMS: '%s/job/%s/buildWithParameters',
		LIST: '%s/api/json',
		JOBINFO: '%s/job/%s/api/json'
	}
}