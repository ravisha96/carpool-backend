import mongoose = require('mongoose');

class Router {

    private UserModel = require('./models/user.login.schema');
    private PassengerModel = require('./models/passenger.register.schema');
    private UpdateCurrentLocationModel = require('./models/update.current.location.schema');
    private SearchNearestDriversCtrl = require('./controllers/search.nearest.driver');


    constructor(public db: any) {
        this.db = db;
    }

    public Authenticate = (req, res) => {
        this.UserModel.findOne({ username: req.body.username, password: req.body.password }, (err: String, results: Object) => {
            res.send(err || results);
        });
    }

    public LoginDriver = (req, res) => {
        this.UserModel.findOne(req.body, (err: String, results: Object) => {
            res.send(err || results);
        });
    }
    
    /**
     * RegisterDevice method register users device and update the login table.
     */
    public RegisterDevice = (req, res) => {
        var condition = { '_id': req.headers.authorization },
            update = req.body;
            console.log(update);
        this.UserModel.update(condition, update, { upsert: true }, (err, results) => {
            res.send(err || results);
        });
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
            res.send(err || req.body);
        });
    }

}

export = Router;