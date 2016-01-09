/**
 * Interceptor
 */
class Interceptor {
    constructor() {
    }
	
	/**
	 * EnableCORS method enables the CORS plicy for all request.
     * Currently we are accepting the request for all('*') URLs.
     * We are also accepting an 'authorization' headers from frontend.
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
	 * Token is then validated against DB.
	 */
    public Auth = (req, res, next) => {
        var LoginModel = require('./models/user.login.schema');
        /**
         * Cross-browser request are preflighted, hence OPTIONS request are send 
         * before the actual request in order to determine wheather the actual request is safe to send.
         * Hence, we are approving the preflighted(OPTIONS) as these request will not have the headers.
         * 
         * Authorization key is only checked if user make a api call. Else it will validate and other
         * middlewares will be triggered with next().
         */
        if (req.method === 'OPTIONS' || !req.originalUrl.match('/api/')) {
            next();
            return;
        } else {
            /**
             * Condition check for all serive calls having the requied authorization key.
             * On confirmation it checks against the DB on success it calls other middlewares.
             * 
             * On failure it will send the response with 401 invalid permission.
             */
            if (req.headers.authorization) {
                LoginModel.findOne({ '_id': req.headers.authorization }, (err, results) => {
                    if (err) {
                        res.status(401).send('user not authorized');
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