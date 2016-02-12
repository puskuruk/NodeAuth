/**
 * Created by alpuysal on 11/02/16.
 */

var User = mongoose.model('User');
var sha512 = require('js-sha512').sha512;
var randomToken = require('rand-token');

module.exports = {
	create: function (req, res) {
		User.findOne({'uname': {$eq: req.body.username}}).exec()
			.then(function (user) {
				if (!user) {
					var user = new User();

					user.uname = req.body.username;
					user.pwd = sha512(req.body.password);
					user.tokens.push(randomToken.generate(32));

					return user.save().then(function (userAfterSave) {
						res.json({
							err: false,
							data: {_id: userAfterSave._id}
						});
					});
				} else {
					res.json({
						err: true,
						msg: "Already Registered"
					});
				}
			})
			.then(null, function (err) {
				res.json({
					err: true,
					msg: err.name + " " + err.message
				});
			});
	},
	update: function (req, res) {},
	remove: function (req, res) {
		var id = req.body.id;

		User.remove({_id: id}).exec()
			.then(function (userAfterRemove){
				res.json({
					err	: false,
					msg	:	"Delete Done !"
				});
			})
			.then(null, function (err) {
				res.json({
					err: true,
					msg: err.name + " " + err.message
				});
			})
	}
};
