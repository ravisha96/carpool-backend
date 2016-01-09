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
        res.header("Access-Control-Request-Headers", "authorization");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        next();
    }
	
	/**
	 * Auth method check request header for authorized token.
	 * Token is then validated and matched from DB.
	 */
    public Auth = (req, res, next) => {
        var LoginModel = require('./models/user.login.schema');
        if (req.method === 'OPTIONS') {
            next();
            return;
        } else {
            if (req.headers.authorization) {
                LoginModel.findOne({ '_id': req.headers.authorization }, (err, results) => {
                    if (err) {
                        res.status(404).send('user does not exist');
                        return;
                    }
                    next();
                });
            } else {
                res.status(401).send('user not authorized');
                return;
            }
        }
    }
}

export = Interceptor;