/**
 * Created by alpuysal on 10/02/16.
 */

var User = mongoose.model('User');
var sha512 = require('js-sha512').sha512;
var randomToken = require('rand-token');

module.exports = {
	register: function (req, res) {
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
	login: function (req, res) {

		User.findOne({
			'uname': req.body.username,
			'pwd': sha512(req.body.password)
		}).exec()

			.then(function (user) {
				if (user) {
					var cookieToken = req.cookies['token'];
					console.log(cookieToken);
					var userToken = user.tokens.pop(user.tokens.length - 1);
					if (cookieToken === userToken) {
						res.json({
							"err":false,
							"token":cookieToken,
							"msg":"Login Success"
						});
					} else {
						var createToken = randomToken.generate(32);
						user.tokens.push(createToken);
						return user.save()
							.then(function (userAfterSave) {
								res.cookie("token", createToken).json({
									"err": false,
									"token": createToken
								});
							});
					}
				} else {
					res.status(404).json({
						"err": true,
						"msg": "User not found."
					});
				}
			})

			.then(null, function (err) {
				res.json({
					err: true,
					msg: err.name + " " + err.message
				});
			});
	}
};