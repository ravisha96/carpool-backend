import mongoose = require('mongoose');
import driverModel = require('./models/driver.register.schema');

class Router {
	
	constructor (public db:any) {
		this.db = db;
	}
	
	public RegisterDriver = (req, res) => {
		var driver = this.db.model('driver', new driverModel().DriverSchema());
		res.sendStatus(200).json(driver);
	}
	
}

export = Router;