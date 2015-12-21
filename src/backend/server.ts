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
var io = require('socket.io');
// Connecting to mongodb.
db.connect(setting.db.config);

var routes = new router(db);

var port: number = process.env.PORT || 8904;
var server = app.listen(port, () => {
    var listeningPort: number = server.address().port;
    console.log('The server is listening on port: ' + listeningPort);
});

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
// app.post('/api/updateCurrentLocation', routes.UpdateCurrentLocation);
app.post('/api/updateCurrentLocation', (req, res) => {

    io.configure((): void => {
        io.set("transports", ["xhr-polling"]);
        io.set("polling duration", 20);
    });

    io.on('connection', (socket) => {

        console.log('connected');

        socket.emit('location:update:waiting');

    });
});

io.listen(server);