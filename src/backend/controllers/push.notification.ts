/**
 * PushNotification controller handle the services for registing new device and
 * sharing the notification to and fro between client and server.
 */
class PushNotification {

    private gcm = require('node-gcm');
    private Promise = require('q');
    private UserModel = require('../models/user.login.schema');
    private api: String = 'AIzaSyC9N9RtiwTIU0hA4c9jLVICxXMGeChT23s';
    private registerPassenger = require('./register.passenger.request');
    private und = require('underscore');
    private constant = require('./constant');
    private retryTimes: Number = 4;
    private sender;
    private deviceToken: Array<String> = [];
    private reqBody;

    public const: IConstants = this.constant;

    constructor() { }
    
    /**
     * Method register deviceId against the user table.
     */
    public registerDevice = (req, res, next) => {
        var condition = { '_id': req.headers.authorization },
            update = req.body;

        this.UserModel.update(condition, update, (err, result) => {
            res.send(err || result);
        });
    }
    
    /**
     * getUsersDetails method get the device of the driver who will be notified.
     * This device id is update when driver/passenger create any new ride request,
     *  and saved against the user table.
     */
    private getUsersDetails = (uid) => {
        var defer = this.Promise.defer();
        this.UserModel.findById(uid, (err, result) => {
            if (result) {
                defer.resolve(result);
                return;
            }

            defer.reject(err);
        });

        return defer.promise;
    }
   
    
    /**
     * createMessage method create message that will be send to drivers
     * while notifying for new passenger request.
     */
    private createMessage = () => {
        var defer = this.Promise.defer();

        this.getPassengersCoords().then((coords) => {
            this.getUsersDetails(this.reqBody.passenger.uid).then((user) => {
                var customeMsg = (user.firstName + ' ' + user.lastName + ' wants to share your ride.');
                var message = new this.gcm.Message();
                message.timeToLive = 3000,           // Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks when not specified.
                    message.priority = 'high',
                    message.addData({
                        'title': 'Share Ride',
                        'soundname': '',        //Sound to play upon notification receipt put in the www folder in app   
                        'message': customeMsg,
                        'sound': 'notification',
                        'icon': ''         //icon to display put in the www folder in app
                    });

                defer.resolve(message);
            }, (error)=> {
                defer.reject(error);
            });
        }, (error) => {
            defer.reject(error);
        });


        return defer.promise;
    }
    
    /**
     * getPassengersCoords method fetch the coordinates of the passenger 
     */
    private getPassengersCoords = () => {
        var passenger = require('../models/passenger.register.schema'),
            defer = this.Promise.defer();

        passenger.findOne({ uid: this.reqBody.passenger.uid }, (err, result) => {
            if (err) {
                defer.reject(err);
                return;
            }

            defer.resolve(result);
        });

        return defer.promise;
    }
    
    /**
     * notify method trigger the push notification to the specific device.
     * It also retry for sending the push notification 4 times in case of failure.
     * @param deviceToken - specific id of the device.
     */
    private notify = (deviceToken: String) => {
        this.createMessage().then((msg) => {
            this.sender.send(msg, deviceToken, this.retryTimes, (result) => {
                console.log(result);
            });
        });
    }
    
    
    /**
     * start method initiate the process of notifying the driver about new request
     * from passenger. It also insert the passenger query in the passenger table.
     */
    public start = (req, res, next) => {
        this.reqBody = req.body;
        this.sender = new this.gcm.Sender(this.api);
        this.getUsersDetails(req.body.uid).then((response) => {

            new this.registerPassenger().saveNewCarPoolRequest(req.body.passenger, req.body.uid).then((numberAffected, update) => {
                this.notify(response.deviceToken);
                res.send({ success: this.const.messages.passenger.onSuccessPushNotification });
                this.reqBody = null;
            }, function() {
                res.send({ error: this.const.messages.passenger.onFailRegistration });
                this.reqBody = null;
            });
        }, function(err) {
            res.send(err);
        });
    }
}
var pushNotification = new PushNotification;
module.exports = {
    registerDevice: pushNotification.registerDevice,
    start: pushNotification.start
}