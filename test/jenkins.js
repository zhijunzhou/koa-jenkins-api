var jenkins = require('../utils/jenkins');

console.log(jenkins)
// test

/**
var config =
`
<project>
	<description/>
	<keepDependencies>false</keepDependencies>
	<properties/>
	<scm class="hudson.scm.NullSCM"/>
	<canRoam>true</canRoam>
	<disabled>false</disabled>
	<blockBuildWhenDownstreamBuilding>false</blockBuildWhenDownstreamBuilding>
	<blockBuildWhenUpstreamBuilding>false</blockBuildWhenUpstreamBuilding>
	<triggers/>
	<concurrentBuild>false</concurrentBuild>
	<builders/>
	<publishers/>
	<buildWrappers/>
</project>`;

jenkins.createJob('test', config, function (err, data) {
	if (err) {
		console.log('error');
		return;
	}
	console.log(data);
})

jenkins.allJobs(function(err, data) {
	if(err) {
		console.log('error');
		return;
	}
	console.log(data);
})
delJob('job0', function (err, data) {
	if (err) {
		console.log('error');
		return;
	}
	console.log(data);
})
jenkins.build('test', null, function(err, data) {
	if (err) {
		console.log('error');
		return;
	}
	console.log(data);
})
*/


