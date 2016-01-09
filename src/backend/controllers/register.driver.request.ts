/**
 * RegisterDriverRequest
 */
class RegisterDriverRequest {

    public driverQueryDetails;
    public savedUserDetails;
    public async = require('async');

    constructor(public req: any, public res: any, public next: Function) {

        this.async.series([
            this.updateInsertDriverRequest,
            this.getDriverInformation,
            this.updateInsertDriverLocation
        ], (err, result) => {
            if (err) return next(err);
            this.res.send(JSON.stringify(req.body));
        })

    }

    private updateInsertDriverRequest = (callback) => {
        var driverModel = require('../models/driver.register.schema');
        driverModel.update({ uid: this.req.body.uid }, { $set: this.req.body }, { upsert: true }, (err, nAffected, result): void => {
            this.driverQueryDetails = this.req.body;
            callback();
        });
    }

    private getDriverInformation = (callback) => {
        var loginModel = require('../models/user.login.schema')
        loginModel.findById(this.req.body.uid, (err: String, result: Object) => {
            this.savedUserDetails = result;
            callback();
        });
    }

    private updateInsertDriverLocation = (callback) => {
        var updateCurrentLocationModel = require('../models/update.current.location.schema'),
            driver: IDriverRegistration = this.req.body,
            update = {
                uid: driver.uid,
                lat: driver.from.lat,
                lng: driver.from.lng,
                departureTime: driver.startTime,
                firstName: this.savedUserDetails.firstName,
                lastName: this.savedUserDetails.lastName
            };

        updateCurrentLocationModel.update({ uid: driver.uid }, { $set: update }, { upsert: true }, (err, nAffected, result) => {
            callback();
        });
    }
}

module.exports = RegisterDriverRequest;