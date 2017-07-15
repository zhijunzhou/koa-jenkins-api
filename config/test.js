module.exports = {
	env: 'test',
	port: 3002,
	docker_url: '',
	jenkins_host: '',
	jenkins_api: {
		NEWJOB: '%s/createItem?name=%s',
		DELETE: '%s/job/%s/doDelete',
		BUILD: '%s/job/%s/build',
		BUILDWITHPARAMS: '%s/job/%s/buildWithParameters',
		LIST: '%s/api/json',
		JOBINFO: '%s/job/%s/api/json'
	}
}