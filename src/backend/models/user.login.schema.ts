/**
 * UserLogin
 */
class UserLogin {
	
	public db = require('mongoose');
	public schema = this.db.Schema;
	
	constructor() {}
	
	public UserSchema = new this.schema({
		firstName: String,
		lastName: String,
		username: String,
		password: String,
		isVerified: {type: Boolean, default: true},
		status: {type: String, default: 'enable'},
		createdOn: {type: Date, default: Date.now}
	});
	 
}

var userLoginSchema = new UserLogin(); 
module.exports = userLoginSchema.db.model('Login', userLoginSchema.UserSchema);