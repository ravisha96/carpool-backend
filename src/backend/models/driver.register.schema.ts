class DriverRegistration {
	public db = require('mongoose');
	public schema = this.db.Schema;
	
	constructor() {
		
	}
	
	private CordinateSchema = new this.schema({
		name: String,
		lng: Number,
		lat: Number
	});
	
	public DriverSchema = new this.schema({
		uid: String,
		name: String,
		from: this.CordinateSchema,
		to: this.CordinateSchema,
		boardingPoints: [this.CordinateSchema],
		startTime: Date,
		returnTime: Date,
		price: Number,
		seats: Number,
		carType: String,
		remarks: String,
		routeId: String,
		createdOn: { type: Date, default: Date.now }
	});

}

var DriverRegistrationSchema = new DriverRegistration();
module.exports = DriverRegistrationSchema.db.model('Driver', DriverRegistrationSchema.DriverSchema);