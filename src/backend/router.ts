import mongoose = require('mongoose');
var driverModel = require('./models/driver.register.schema');
var loginModel = require('./models/user.login.schema');

class Router {
	
	constructor (public db:any) {
		this.db = db;
	}
	
	public RegisterDriver = (req, res) => {
		var driverSchema = new driverModel(req.body);
		driverSchema.save(function () {
			res.send(driverSchema);
		});
	}
	
	public LoginDriver = (req, res) => {
		var loginSchema = new loginModel(req.body);
		loginSchema.save(function () {
			res.send(loginSchema);
		});
	}
	
	public Login = (req, res) => {
		var loginSchema = new loginModel(req.body);
		loginSchema.save(function () {
			res.send(loginSchema);
		});
	}
	
}

export = Router;