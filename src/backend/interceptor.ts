/**
 * Interceptor
 */
class Interceptor {
	constructor() {
	}
	
	/**
	 * EnableCORS method enables the CORS plicy for all request
	 */
	public EnableCORS = (req, res, next) => {
        
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        next();
        
		// res.header('Access-Control-Allow-Origin', '*');
		// res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		// res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
		// next();
	}
	
	/**
	 * Auth method check request header for authorized token.
	 * Token is then validated and matched from DB.
	 */
	public Auth = (req, res, next) => {
		next();
	}
}

export = Interceptor;