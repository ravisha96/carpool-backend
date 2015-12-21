import mongoose = require('mongoose');
var driverModel = require('./models/driver.register.schema');
var loginModel = require('./models/user.login.schema');
var passengerModel = require('./models/passenger.register.schema');

class Router {
	
	constructor (public db:any) {
		this.db = db;
	}
	
	public RegisterDriver = (req, res) => {
		var driverSchema = new driverModel(req.body);
		driverSchema.save( (): void => {
			res.send(driverSchema);
		});
	}
	
	public LoginDriver = (req, res) => {
		loginModel.findOne(req.body, (err: String, results: Object) => {
			res.send(results);
		});
	}
	
	public Authenticate = (req, res) => {
		var loginSchema = new loginModel(req.body);
		loginSchema.save( (): void => {
			res.send(loginSchema);
		});
	}
    
    public RegisterPassenger = (req, res) => {
        var passengerSchema = new passengerModel(req.body);
        passengerSchema.save( (): void => {
           res.send(passengerSchema); 
        });
    }
	
}

export = Router;