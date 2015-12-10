/// <reference path="../../typings/tsd.d.ts" />

import express = require('express');
import path = require('path');
var viewRenderingEngine = require('ejs-mate');

var app : express.Express = express();

app.engine('html', viewRenderingEngine);
app.set('view engine', 'html'); // so you can render('index') 

app.get('/', (req, res) => {
	res.render('index');  
}); 

app.get('/api/coolresource', (req, res) => {
	res.send({
		"isApiWorking": false,
		"name": "Maximilian Alexander"
	});
});

var port: number = process.env.PORT || 3000;
var server = app.listen(port, () => {
	var listeningPort: number = server.address().port;
	console.log('The server is listening on port: ' + listeningPort);
});
