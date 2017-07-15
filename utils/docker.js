var Docker = require('dockerode');
var docker = new Docker({host: '192.168.99.100', port: 2376});

var container = docker.getContainer('6755c77649f7');
// console.log(docker)
// console.log(container);

container.inspect(function (err, data) {
  console.log(data);
});