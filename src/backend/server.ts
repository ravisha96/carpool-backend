/// <reference path="../../typings/tsd.d.ts" />

import express = require('express');
import path = require('path');
import db = require('mongoose');
import router = require('./router');
import interceptor = require('./interceptor');
var setting = require('./config').setting;
var viewRenderingEngine = require('ejs-mate');
var bodyParser = require('body-parser');
var app: express.Express = express();
var jwt = require('jsonwebtoken');      // used to create, sign and verify tokens.


db.connect(setting.db.config);

var routes = new router(db);
app.engine('html', viewRenderingEngine);
app.set('view engine', 'html'); // so you can render('index')

/** MIDDLEWARES */

// parse all request and response in json.
app.use(bodyParser.json());
// Enable CORS
app.use(new interceptor().EnableCORS);
app.use(new interceptor().Auth);

app.get('/', (req, res) => {
	res.render('index');
});

app.post('/api/login', routes.LoginDriver);
app.post('/api/registerDriver', routes.RegisterDriver);
app.post('/api/registerPassenger', routes.RegisterPassenger);
app.post('/api/authenticate', routes.Authenticate);

var port: number = process.env.PORT || 3803;
var server = app.listen(port, () => {
	var listeningPort: number = server.address().port;
	console.log('The server is listening on port: ' + listeningPort);
});
