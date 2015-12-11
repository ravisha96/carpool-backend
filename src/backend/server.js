define(["require", "exports", 'express'], function (require, exports, express) {
    var viewRenderingEngine = require('ejs-mate');
    var app = express();
    app.engine('html', viewRenderingEngine);
    app.set('view engine', 'html'); // so you can render('index') 
    app.get('/', function (req, res) {
        res.render('index');
    });
    app.get('/api/coolresource', function (req, res) {
        res.send({
            "isApiWorking": false,
            "name": "Maximilian Alexander"
        });
    });
    var port = process.env.PORT || 3000;
    var server = app.listen(8000, function () {
        var listeningPort = server.address().port;
        console.log('The server is listening on port: ' + listeningPort);
    });
});
//# sourceMappingURL=server.js.map