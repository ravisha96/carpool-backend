/**
 * PushNotification controller handle the services for registing new device and
 * sharing the notification to and fro between client and server.
 */
class PushNotification {

    private gcm = require('node-gcm');
    private Promise = require('q');
    private UserModel = require('../models/user.login.schema');
    private api: String = 'AIzaSyC9N9RtiwTIU0hA4c9jLVICxXMGeChT23s';
    private retryTimes: Number = 4;
    private sender;
    private deviceToken: Array<String> = [];
    private message;

    constructor() {

    }
    
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

    private getDeviceId = (req) => {
        var defer = this.Promise.defer();
        this.UserModel.findById(req.headers.authorization, (err, result) => {
            if (result) {
                defer.resolve(result);
                return;
            }

            defer.reject(err);
        });

        return defer.promise;
    }

    public start = (req, res, next) => {
        this.sender = new this.gcm.Sender(this.api);
        this.message = new this.gcm.Message();
        this.message.addData('title', 'New Notification');
        this.message.addDate('message', 'Hello! this is new notification');
        this.message.addDate('sound', 'notification');

        this.getDeviceId(req).then((response) => {
            this.deviceToken.push(response.deviceToken);
            this.sender.send(this.message, this.deviceToken, this.retryTimes, (result) => {
                console.log(result);
                console.log('push send to: '+ this.deviceToken);
                
            });
            
            res.send('ok');
        });
    }
}
var pushNotification = new PushNotification;
module.exports = {
    registerDevice: pushNotification.registerDevice,
    start: pushNotification.start
}