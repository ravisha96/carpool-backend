import mongoose = require('mongoose');

class Router {

    private DriverModel = require('./models/driver.register.schema');
    private LoginModel = require('./models/user.login.schema');
    private PassengerModel = require('./models/passenger.register.schema');
    private UpdateCurrentLocationModel = require('./models/update.current.location.schema');
    private SearchNearestDriversCtrl = require('./controllers/search.nearest.driver');
    private Promise = require('q');
    private async = require('async');


    constructor(public db: any) {
        this.db = db;
    }

    public Authenticate = (req, res) => {
        this.LoginModel.findOne({ username: req.body.username, password: req.body.password }, (err: String, results: Object) => {
            res.send(results);
        });
    }

    public LoginDriver = (req, res) => {
        this.LoginModel.findOne(req.body, (err: String, results: Object) => {
            res.send(results);
        });
    }

    public RegisterDriver = (req, res, next) => {

        console.log(req);
        var driverQueryDetails,
            savedUserDetails;
        this.async.series([
            (callback) => {
                var driver: IDriverRegistration = req.body,
                    driverSchema = new this.DriverModel(driver);

                driverSchema.save((err, result): void => {
                    driverQueryDetails = result;
                    callback();
                });
            },

            (callback) => {
                this.LoginModel.findOne({ '_id': req.body.uid }, (err: String, result: Object) => {
                    savedUserDetails = result;
                    callback();
                });
            },

            (callback) => {
                var driver: IDriverRegistration = req.body,
                    currentLocationSchema = new this.UpdateCurrentLocationModel({
                        uid: driver.uid,
                        lat: driver.from.lat,
                        lng: driver.from.lng,
                        departureTime: driver.startTime,
                        firstName: savedUserDetails.firstName,
                        lastName: savedUserDetails.lastName
                    });
                currentLocationSchema.save((err, result) => {
                    callback();
                });
            }
        ], (err, result) => {
            console.log(err);
            console.log(result);
            if (err) return next(err);
            res.send(result);
        })

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

        new this.SearchNearestDriversCtrl(req.body).fetchDriversLocation().then((data) => {
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