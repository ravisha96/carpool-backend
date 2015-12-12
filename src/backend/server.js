define(["require", "exports", 'express', 'mongoose'], function (require, exports, express, db) {
    var viewRenderingEngine = require('ejs-mate');
    var bodyParser = require('body-parser');
    var app = express();
    db.connect('mongodb://nagarro:carpool@ds035014.mongolab.com:35014/heroku_55xgjmp3');
    var CordinateSchema = new db.Schema({
        name: String,
        lng: Number,
        lat: Number
    });
    var AdminSchema = new db.Schema({
        uid: Number,
        name: String,
        from: CordinateSchema,
        to: CordinateSchema,
        boardingPoints: [CordinateSchema],
        startTime: Date,
        returnTime: Date,
        price: Number,
        seats: Number,
        catType: String,
        remarks: String,
        routeId: String,
        createdOn: { type: Date, default: Date.now }
    });
    db.model('Admin', AdminSchema);
    app.engine('html', viewRenderingEngine);
    app.set('view engine', 'html'); // so you can render('index')
    app.use(bodyParser.json());
    app.get('/', function (req, res) {
        res.render('index');
    });
    app.get('/api/register', function (req, res) {
        res.send({
            "isApiWorking": false,
            "name": "Maximilian Alexander"
        });
    });
    var port = process.env.PORT || 3000;
    var server = app.listen(port, function () {
        var listeningPort = server.address().port;
        console.log('The server is listening on port: ' + listeningPort);
    });
});
//# sourceMappingURL=server.js.map