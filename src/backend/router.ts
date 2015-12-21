import mongoose = require('mongoose');
var driverModel = require('./models/driver.register.schema');
var loginModel = require('./models/user.login.schema');
var passengerModel = require('./models/passenger.register.schema');
var updateCurrentLocationModel = require('./models/update.current.location.schema');

class Router {
	
	constructor (public db:any) {
		this.db = db;
	}
    
    public Authenticate = (req, res) => {
		var loginSchema = new loginModel(req.body);
		loginSchema.save( (): void => {
			res.send(loginSchema);
		});
	}
    
    public LoginDriver = (req, res) => {
		loginModel.findOne(req.body, (err: String, results: Object) => {
			res.send(results);
		});
	}
	
	public RegisterDriver = (req, res) => {
		var driverSchema = new driverModel(req.body);
        var locationSchema = new updateCurrentLocationModel({
            uid: req.body.uid,
            lat: req.body.from.lat,
            lng: req.body.from.lng, 
        });
		driverSchema.save( (): void => {
            locationSchema.save((): void => {
               res.send(driverSchema);
            });
		});
	}
    
    public RegisterPassenger = (req, res) => {
        var passengerSchema = new passengerModel(req.body);
        passengerSchema.save( (): void => {
           res.send(passengerSchema); 
        });
    }
    
    public UpdateCurrentLocation = (req, res) => {
        var schema = new updateCurrentLocationModel(req.body);
        schema.save( (): void => {
            res.send(schema);
        });
    }

	
}

export = Router;