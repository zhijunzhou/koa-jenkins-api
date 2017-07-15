const axios = require('axios')
const util = require('util');
const qs = require('querystring')
const config = require('../config');

// request interceptor 
axios.interceptors.request.use(function (config) {
	return config;
}, function (error) {
	return Promise.reject(error);
});

// response interceptor 
axios.interceptors.response.use(function (response) {
	return response;
}, function (error) {
	error.status = error.response.status;
	error.headers = error.response.headers;
	error.body = error.response.data;
	return Promise.reject(error);
});

const build_url = function (command) {
	let url = util.format.call(this, command, config.jenkins_host);
	let args = Array.prototype.slice.call(arguments).slice(1);
	if (arguments.length == 1) {
		return url;
	}
	args.unshift(url);
	url = util.format.apply(this, args);
	return url;
};

/**
 * list all jobs
 */
const allJobs = axios.get(build_url(config.jenkins_api.LIST));

/**
 * inspect job information or check if a job is existed
 * @param {*} jobName 
 */
const jobInfo = (jobName) => axios.get(build_url(config.jenkins_api.JOBINFO, jobName));

/**
 * create a job by job xml config
 * @param {*} jobName 
 * @param {*} jobConfig 
 */
const createJob = (jobName, jobConfig) => axios({
	method: 'POST',
	url: build_url(config.jenkins_api.NEWJOB, jobName),
	data: jobConfig,
	headers: {
		"content-type": "text/xml"
	}
});

/**
 * build a job
 * @param {*} jobName 
 */
const buildJob = (jobName) => axios({
	method: 'POST',
	url: build_url(config.jenkins_api.BUILD, jobName)
})

/**
 * delete a job
 * @param {*} jobName 
 */
const delJob = (jobName) => axios({
	method: 'POST',
	url: build_url(config.jenkins_api.DELETE, jobName)
})

module.exports = {
	allJobs,
	jobInfo,
	createJob,
	buildJob,
	delJob
}
