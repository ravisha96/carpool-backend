import mongoose = require('mongoose');

class Router {

    private DriverModel = require('./models/driver.register.schema');
    private LoginModel = require('./models/user.login.schema');
    private PassengerModel = require('./models/passenger.register.schema');
    private UpdateCurrentLocationModel = require('./models/update.current.location.schema');
    private SearchNearestDriversCtrl = require('./controllers/search.nearest.driver');
    private Promise = require('q');


    constructor(public db: any) {
        this.db = db;
    }
    
    public Authenticate = (req, res) => {
        this.LoginModel.findOne(req.body, (err: String, results: Object) => {
            res.send(results);
        });
        // var loginSchema = new this.LoginModel(req.body);
        // loginSchema.save((): void => {
        //     res.send(loginSchema);
        // });
    }

    public LoginDriver = (req, res) => {
        this.LoginModel.findOne(req.body, (err: String, results: Object) => {
            res.send(results);
        });
    }

    public RegisterDriver = (req, res) => {

        var driver: IDriverRegistration = req.body;
        var driverSchema = new this.DriverModel(driver);

        var locationSchema = new this.UpdateCurrentLocationModel({
            uid: driver.uid,
            lat: driver.from.lat,
            lng: driver.from.lng,
            departureTime: driver.startTime
        });

        driverSchema.save((err, results): void => {
            locationSchema.save((): void => {
                res.send(results);
            });
        });
    }
    
    /**
     * 
     */
    public RegisterDevice = () => {
        
    }
    
    /**
     * Method will register the searched query in DB and will send a response
     * to the nearest/closest driver.
     */
    public SearchNearestDrivers = (req, res) => {
        var passengerSchema = new this.PassengerModel(req.body);
        
        new this.SearchNearestDriversCtrl(req.body).fetchDriversLocation()
            .then((data) => {
                res.send(data);
            });
    }

    public UpdateCurrentLocation = (req, res) => {
        var condition = { uid: req.body.uid }, update = { lat: req.body.lat, lng: req.body.lng };
        this.UpdateCurrentLocationModel.update(condition, update, (err, numberAffected, response) => {
            res.send(req.body);
        });
    }

}

export = Router;