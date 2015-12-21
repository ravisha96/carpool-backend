class UpdateCurrentLocation {
    public db = require('mongoose');
    public schema = this.db.Schema;
    
    constructor () {
        
    }
    
    public LocationSchema = new this.schema({
       uid: String,
       lat: Number,
       lng: Number
    });
    
}

var UpdateCurrentLocationSchema = new UpdateCurrentLocation();
module.exports = UpdateCurrentLocationSchema.db.model('CurrentLocation', UpdateCurrentLocationSchema.LocationSchema);