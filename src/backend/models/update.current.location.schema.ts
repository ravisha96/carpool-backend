interface IUpdateCurrentLocation {
    uid: String,
    lat: String,
    lng: String,
    departureTime: Date
} 

class UpdateCurrentLocation {
    public db = require('mongoose');
    public schema = this.db.Schema;
    
    constructor () {
        
    }
    
    public LocationSchema = new this.schema({
       uid: {type: String, unique: true},
       lat: String,
       lng: String,
       firstName: String,
       lastName: String,
       phone: String,
       departureTime: {type: Date},
       updatedOn: {type: Date, default: Date.now}
    });
    
}

var UpdateCurrentLocationSchema = new UpdateCurrentLocation();
module.exports = UpdateCurrentLocationSchema.db.model('CurrentLocation', UpdateCurrentLocationSchema.LocationSchema);