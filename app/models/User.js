/**
 * Created by alpuysal on 11/02/16.
 */

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	tokens			:		[String],
	uname				:		{type: String},
	pwd					:		{type: String},
	createdDate :		{type: Date, default: Date.now}
});

mongoose.model('User', UserSchema);

module.exports = UserSchema;