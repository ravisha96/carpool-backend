/// <reference path="../../typings/tsd.d.ts" />

import express = require('express');
import path = require('path');
import db = require('mongoose');
import router = require('./router');
import interceptor = require('./interceptor');

var UpdateCurrentLocation = require('./controllers/update.current.location'),
    RegisterDriver = require('./controllers/register.driver.request'),
    pushNotification = require('./controllers/push.notification'),
    setting = require('./config').setting,
    viewRenderingEngine = require('ejs-mate'),
    bodyParser = require('body-parser'),
    app: express.Express = express(),
    jwt = require('jsonwebtoken');      // used to create, sign and verify tokens.
// Connecting to mongodb.
db.connect(setting.db.config);


var routes = new router(db);
var port: number = process.env.PORT || 3000;
var server = app.listen(port);
var io = require('socket.io').listen(server);


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

app.post('/api/registerDevice', pushNotification.registerDevice);
app.get('/api/pushNotification', pushNotification.start);
app.post('/api/registerDriver', RegisterDriver);
app.post('/api/searchNearestDrivers', routes.SearchNearestDrivers);
app.post('/api/authenticate', routes.Authenticate);
app.post('/api/updateCurrentLocation', routes.UpdateCurrentLocation);
io.of('/api/updateCurrentLocation').on('connection', UpdateCurrentLocation);