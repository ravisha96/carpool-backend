import mongoose = require('mongoose');
var DriverModel = require('./models/driver.register.schema');
var LoginModel = require('./models/user.login.schema');
var PassengerModel = require('./models/passenger.register.schema');
var updateCurrentLocation = require('./controllers/update.current.location');
var UpdateCurrentLocationModel = require('./models/update.current.location.schema');

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
    
    public RegisterPassenger = (req, res) => {
        var passengerSchema = new PassengerModel(req.body);
        passengerSchema.save( (): void => {
           res.send(passengerSchema); 
        });
    }
    
    public UpdateCurrentLocation = (req, res) => {
        // var schema = new UpdateCurrentLocationModel(req.body);
        // schema.save( (): void => {
        //     res.send(schema);
        // });
    }

	
}

export = Router;