/// <reference path="../../typings/tsd.d.ts" />

import express = require('express');
import path = require('path');
import db = require('mongoose');
import router = require('./router');
var setting = require('./config').setting;
var viewRenderingEngine = require('ejs-mate');
var bodyParser = require('body-parser');
var app: express.Express = express();
db.connect(setting.db.config);
var routes = new router(db);
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

app.post('/login', routes.LoginDriver);
app.post('/register', routes.RegisterDriver); 

var port: number = process.env.PORT || 800;
var server = app.listen(port, () => {
	var listeningPort: number = server.address().port;
	console.log('The server is listening on port: ' + listeningPort);
});
