/**
 * Created by alpuysal on 11/02/16.
 */
var User = mongoose.model('User');

module.exports = {
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
