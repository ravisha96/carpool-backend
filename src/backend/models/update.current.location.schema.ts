interface IUpdateCurrentLocation {
    uid: String,
    lat: Number,
    lng: Number,
    departureTime: Date
} 

class UpdateCurrentLocation {
    public db = require('mongoose');
    public schema = this.db.Schema;
    
    constructor () {
        
    }
    
    public LocationSchema = new this.schema({
       uid: {type: String, unique: true},
       lat: Number,
       lng: Number,
       departureTime: {type: Date},
       updatedOn: {type: Date, default: Date.now}
    });
    
}

var UpdateCurrentLocationSchema = new UpdateCurrentLocation();
module.exports = UpdateCurrentLocationSchema.db.model('CurrentLocation', UpdateCurrentLocationSchema.LocationSchema);