var util = require('util');
var qs = require('querystring')
var jenkins = require('jenkins-api')
var request = require('request');
var config = require('../config');

var build_url = function (command) {
	var url = util.format.call(this, command, config.jenkins_host);
	var args = Array.prototype.slice.call(arguments).slice(1);
	if (arguments.length == 1) {
		return url;
	}
	args.unshift(url);
	url = util.format.apply(this, args);
	return url;
};

function isValidStatusCode(error, response) {
	if (error || (response.statusCode < 200 && response.statusCode > 302)) {
		return false;
	}
	return true;
}

/**
 * 
 * @param {string} jobName 
 * @param {xml file} jobConfig 'You can get it from /job/@jobName/config.xml'
 * @param {*} cb 
 */
function createJob(jobName, jobConfig, cb) {
	request(
		{
			method: 'POST',
			url: build_url(config.jenkins_api.NEWJOB, jobName),
			body: jobConfig,
			headers: {
				"content-type": "text/xml"
			}
		},
		function (error, response, body) {
			if (isValidStatusCode(error, response)) {
				cb(error, response);
				return;
			}
			cb(null, body);
		}
	);
}

/**
 * 
 * @param {*} jobName 
 * @param {*} cb 
 */
function delJob(jobName, cb) {
	request({ method: 'POST', url: build_url(config.jenkins_api.DELETE, jobName) }, function (error, response, body) {
		if (isValidStatusCode(error, response)) {
			cb(error, response);
			return;
		}
		cb(null, body);
	});
}

function build(jobName, params, cb) {
	var buildurl;
	if (!params) {
		buildurl = build_url(config.jenkins_api.BUILD, jobName);
	} else {
		buildurl = build_url(config.jenkins_api.BUILDWITHPARAMS + "?" + qs.stringify(params), jobname)
	}

	request({ method: 'POST', url: buildurl }, function (error, response) {
		if (isValidStatusCode(error, response)) {
			cb(error, response);
			return;
		}
		var data = {
			message: "job is executed",
			location: response.headers["Location"] || response.headers["location"]
		};
		cb(null, data);
	});
}

/**
 * 
 * @param {*} cb 
 */
function allJobs(cb) {
	request({ method: 'GET', url: build_url(config.jenkins_api.LIST) }, function (error, response, body) {
		if (isValidStatusCode(error, response)) {
			cb(error, response);
			return;
		}
		var data = JSON.parse(body.toString()).jobs;
		cb(null, data);
	});
}

module.exports = {
	allJobs,
	build,
	createJob,
	delJob
}
