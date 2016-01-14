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
    private message;

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
     * getDeviceId method get the device of the driver who will be notified.
     * This device id is update when driver/passenger create any new ride request,
     *  and saved against the user table.
     */
    private getDeviceId = (uid) => {
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
     * 
     */
    private getPassengerDetails = (req) => {
        var defer = this.Promise.defer();
        this.UserModel.find
    }
    
    /**
     * createMessage method create message that will be send to drivers
     * while notifying for new passenger request.
     */
    private createMessage = () => {
        this.message = new this.gcm.Message();
        this.message.addData('title', 'Share Ride');
        this.message.addData('message', '');
        this.message.addData('sound', 'notification');
        
        return this.message;
    }
    
    /**
     * payload
     */
    private payload = () => {
        return {
            state: this.const.pushNotification.url.confirmPassenger
        }
    }

    private notify = (deviceToken: String) => {
        this.sender.send(this.createMessage(), deviceToken, this.retryTimes, (result) => {
            console.log(result);
        });
    }
    
    /**
     * start method initiate the process of notifying the driver about new request
     * from passenger. It also insert the passenger query in the passenger table.
     */
    public start = (req, res, next) => {
        this.sender = new this.gcm.Sender(this.api);
        this.getDeviceId(req.body.uid).then((response) => {

            new this.registerPassenger().saveNewCarPoolRequest(req.body.passenger, req.body.uid).then((numberAffected, update) => {
                this.notify(response.deviceToken);
                res.send({ success: this.const.messages.passenger.onSuccessPushNotification });
            }, function() {
                res.send({ error: this.const.messages.passenger.onFailRegistration });
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