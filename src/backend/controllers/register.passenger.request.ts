/**
 * RegisterPassenger
 */
interface IRegisterPassengerCtrl {
    saveNewCarPoolRequest(data: Object, uid: String): Object
}

class RegisterPassengerCtrl {

    private Promise = require('q');
    private PassengerModel = require('../models/passenger.register.schema');

    constructor(parameters) {

    }
    
    /**
     * insert/update passenger request.
     */
    public saveNewCarPoolRequest(data, uid) {
        var defer = this.Promise.defer(),
            condition = { uid: data.uid }, update = data;
        this.PassengerModel.update(condition, { $set: update, $addToSet: { drivers: { $each: [uid] } } }, { upsert: true }, (err, numberAffected, response) => {
            if (err) {
                defer.reject(err)
            } else {
                defer.resolve(numberAffected, response);
            }
        });

        return defer.promise;
    }

}

module.exports = RegisterPassengerCtrl;