var express = require('express');
var strings = require('./lib/strings.js');
var Database = require('./lib/Database.js');
var Course = require('./model/Course.js');
var config = require('config');

const application_root = __dirname;
var app = express();
var database = new Database();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/api/:apiname/:entity/(:?filters)', function (req, res) {
    res.send(req.params);
});

app.post('/api/load_courses', function (req, res) {
    res.send("Ok");
});

app.get('/api/get_all_courses', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    database.get(Course, function(results) {
        res.send(JSON.stringify(results));
    });
});

app.get('/api/search_courses', function (req, res) {
    if (req.query.search) {
        res.setHeader('Content-Type', 'application/json');
        var re = new RegExp('.*' + strings.sanitize(req.query.search) + '.*',"gi");
        database.search({'name' : re}, Course, function(results) {
            res.send(JSON.stringify(results));
        });
    }
});

app.listen(
    config.get('server.port'),
    function () {
        console.log('Listening connections on port ' + config.get('server.port'));
    }
);
