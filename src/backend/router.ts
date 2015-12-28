import mongoose = require('mongoose');
var DriverModel = require('./models/driver.register.schema');
var LoginModel = require('./models/user.login.schema');
var PassengerModel = require('./models/passenger.register.schema');
var UpdateCurrentLocationModel = require('./models/update.current.location.schema');


var SearchNearestDriversCtrl = require('./controllers/search.nearest.driver'); 

class Router {
	
	constructor (public db:any) {
		this.db = db;
	}
    
    public Authenticate = (req, res) => {
		var loginSchema = new LoginModel(req.body);
		loginSchema.save( (): void => {
			res.send(loginSchema);
		});
	}
    
    public LoginDriver = (req, res) => {
		LoginModel.findOne(req.body, (err: String, results: Object) => {
			res.send(results);
		});
	}
	
	public RegisterDriver = (req, res) => {
		var driverSchema = new DriverModel(req.body);
        
        var locationSchema = new UpdateCurrentLocationModel({
            uid: req.body.uid,
            lat: req.body.from.lat,
            lng: req.body.from.lng, 
        });
        
		driverSchema.save( (): void => {
            locationSchema.save( (): void => {
               res.send(driverSchema);
            });
		});
	}
    
    /**
     * Method will register the searched query in DB and will send a response
     * to the nearest/closest driver.
     */
    public SearchNearestDrivers = (req, res) => {
        var passengerSchema = new PassengerModel(req.body);
        passengerSchema.save( (): void => {
           res.send(new SearchNearestDriversCtrl(req.body));
        });
    }
    
    public UpdateCurrentLocation = (req, res) => {
        var condition = {uid: req.body.uid}, update = {lat: req.body.lat, lng: req.body.lng};
        UpdateCurrentLocationModel.update(condition, update, (err, numberAffected, response) => {
            res.send(req.body);
        });
    }
	
}

export = Router;