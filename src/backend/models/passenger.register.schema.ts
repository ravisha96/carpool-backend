class PassengerRegistration {
    public db = require('mongoose');
    public schema = this.db.Schema;
    
    constructor() {
        
    }
    
    private CordinateSchema = new this.schema({
        name: String,
        lng: Number,
        lat: Number
    });
    
    public PassengerSchema = new this.schema({
        boarding: this.CordinateSchema,
        destination: this.CordinateSchema,
        uid:  String
    });
}

var PassengerRegistrationSchema = new PassengerRegistration();
module.exports = PassengerRegistrationSchema.db.model('Passenger', PassengerRegistrationSchema.PassengerSchema);