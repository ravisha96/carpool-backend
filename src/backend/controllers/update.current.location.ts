/**
 * UpdateCurrentLocationController class will update the drivers current location
 * using push notification service.
 */
interface IUpdateLocation{
    uid: String,
    lat: Number,
    lng: Number
}

class UpdateCurrentLocationController {
        
    constructor(public socket, public UpdateCurrentLocationModel) {
        this.UpdateCurrentLocationModel = require('./../models/update.current.location.schema');
        this.socket.emit('location:update:waiting');
        this.socket.on('location:update', this.updateLocation);
    }
    
    /**
     * Update the current users location in DB.
     */
    private updateLocation = (data: IUpdateLocation) => {
        var condition = {uid: data.uid},
            update = {lat: data.lat, lng: data.lng};
        console.log('updating :' + this.UpdateCurrentLocationModel);
        this.UpdateCurrentLocationModel.update(condition, update, (err, numberAffected, response) => {
            this.socket.emit('location:updated', numberAffected);
        });
    }
}

module.exports = UpdateCurrentLocationController;