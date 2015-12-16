class DriverRegistration {
	public db = require('mongoose');	
	constructor() {
		
	}
	
	private CordinateSchema = (): void => {
		return new this.db.Schema({
			name: String,
			lng: Number,
			lat: Number
		});
	}
	
	public DriverSchema = (): void => {
		return new this.db.Schema({
			uid: Number,
			name: String,
			from: this.CordinateSchema(),
			to: this.CordinateSchema(),
			boardingPoints: [this.CordinateSchema()],
			startTime: Date,
			returnTime: Date,
			price: Number,
			seats: Number,
			catType: String,
			remarks: String,
			routeId: String,
			createdOn: { type: Date, default: Date.now }
		});
	}		
}

export = DriverRegistration;

// module.exports = DriverRegistration;