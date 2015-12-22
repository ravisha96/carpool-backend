/**
 * UpdateCurrentLocationController class will update the drivers current location
 * using push notification service.
 */
class UpdateCurrentLocationController {

    public io = require('socket.io');

    constructor(public req, public res, public app) {
        
        /**
         * Heroku won't actually allow us to use WebSockets so we have to setup polling instead.
         * https://devcenter.heroku.com/articles/using-socket-io-with-node-js-on-heroku
         */
        // this.io.configure((): void => {
        //     this.io.set("transports", ["xhr-polling"]);
        //     this.io.set("polling duration", 20);
        // });

        this.io.on('connection', (socket) => {

            console.log('connected');

            socket.emit('location:update:waiting');

        });
    }




}

module.exports = UpdateCurrentLocationController;