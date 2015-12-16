module.exports.setting = (function () {
	
	var environment:string = process.env.NODE_ENV || 'development';
	
	return {
		db: {
			config: (environment === 'development') ? 'localhost:27017/carpool' : 'mongodb://nagarro:carpool@ds033255.mongolab.com:33255/heroku_sgtzfsk1'
		}
	}
	
})();
