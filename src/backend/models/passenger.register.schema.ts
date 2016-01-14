class PassengerRegistration {
    public db = require('mongoose');
    public schema = this.db.Schema;
    
    constructor() {
        
    }
    
    private CordinateSchema = new this.schema({
        name: String,
        lng: String,
        lat: String
    });
    
    public PassengerSchema = new this.schema({
        boarding: this.CordinateSchema,
        destination: this.CordinateSchema,
        drivers: Array,
        uid:  {type: String, unique: true}
    });
}

var PassengerRegistrationSchema = new PassengerRegistration();
module.exports = PassengerRegistrationSchema.db.model('Passenger', PassengerRegistrationSchema.PassengerSchema);