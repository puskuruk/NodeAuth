var home = require(__dirname + "/../app/controllers/home");
var auth = require(__dirname + "/../app/controllers/auth");
var user = require(__dirname + "/../app/controllers/user");

module.exports = function (app) {
	app.post("/",home.index);
	app.post("/auth/register",auth.register);
	app.post("/auth/login",auth.login);
	app.post("/user/remove",user.remove);
};