/// <reference path="../../typings/tsd.d.ts" />
import express = require('express');
import path = require('path');
import db = require('mongoose');
var viewRenderingEngine = require('ejs-mate');
var bodyParser = require('body-parser');
var app: express.Express = express();


db.connect('mongodb://nagarro:carpool@ds035014.mongolab.com:35014/heroku_55xgjmp3');

var CordinateSchema = new db.Schema({
	name: String,
	lng: Number,
	lat: Number
});

var DriverSchema = new db.Schema({
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

var Driver = db.model('Driver', DriverSchema);

app.engine('html', viewRenderingEngine);
app.set('view engine', 'html'); // so you can render('index')

/** MIDDLEWARES */

// parse all request and response in json.
app.use(bodyParser.json());

// Enable CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
});

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/register', (req, res) => {
	// var newDriver = new Driver({
	// 	uid: 1001,
	// 	name: 'Ravi Kumar Sha',
	// 	from: {
	// 		name: 'Gurgaon, Sector-57',
	// 		lng: 28.4880432,
	// 		lat: 77.0622027
	// 	},
	// 	to: {
	// 		name: 'Nagarro, Sector-18',		
	// 		lng: 28.490027,
	// 		lat: 77.0255228
	// 	},
	// 	boardingPoints: [],
	// 	startTime: new Date(),
	// 	price: 20,
	// 	seats: 3,
	// 	catType: 'Hatchback',
	// 	remarks: 'Hello World',
	// 	routeId: 'PG4#$L1',
	// 	createdOn: {type: Date, default: Date.now}
	// });
	
	res.send('Hello World');
	
	// newDriver.save(function (err) {
	// 	res.status(200).json(newDriver);
	// });
});

var port: number = process.env.PORT || 3000;
var server = app.listen(port, () => {
	var listeningPort: number = server.address().port;
	console.log('The server is listening on port: ' + listeningPort);
});
