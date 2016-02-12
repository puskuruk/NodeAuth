global.mongoose = require('mongoose');
var fs = require('fs');

module.exports = function (callback) {
	mongoose.connect('', {
			user: "",
			pass: ""
		},
		function (err) {
			if (err) {
				console.log('connection error', err);
			} else {
				console.log('connection successful');
			}
		});

	fs.readdirSync(__dirname + '/../app/models').forEach(function (file) {
		file.indexOf('.js') != -1 ? require(__dirname + '/../app/models/' + file) : false;
	});
	callback();
};