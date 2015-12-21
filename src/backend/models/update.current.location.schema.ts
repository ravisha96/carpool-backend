class UpdateCurrentLocation{
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