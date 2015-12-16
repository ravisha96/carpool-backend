module.exports.setting = (function () {
	
	var environment:string = process.env.NODE_ENV || 'development';
	
	return {
		db: {
			config: (environment === 'development') ? 'localhost:27017/carpool' : 'mongodb://carpool:nagarro@ds035014.mongolab.com:35014/heroku_55xgjmp3'
		}
	}
	
})();
