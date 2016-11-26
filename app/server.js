var express = require('express');
var bodyParser = require('body-parser');
var strings = require('./lib/strings.js');
var Database = require('./db/Database.js');
var Course = require('./model/Course.js');
var News = require('./model/News.js');
var ModelFactory = require('./model/Factory.js');
var Logger = require('./Logger.js');
var config = require('config');

const application_root = __dirname;

var database = new Database();
var app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(function(err, req, res, next) {
  Logger.error(err.stack);
  res.status(500).send(JSON.stringify(error('That was an error')));
});

// Server
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/api/load/:collection', function (req, res) {
    var failed = 0, succeded = 0;
    function updateCallback(err, result) {
        if (err) {
            console.error(err);
            failed++;
        } else {
            succeded++;
        }
    }
    try {
        for (var i = 0; i < req.body.length; i++) {
            let values = req.body[i];
            let ModelClass = ModelFactory[req.params.collection];
            if (typeof ModelClass.normalize === "function") {
                values = ModelClass.normalize(values);
            }
            let model = new ModelClass(values);
            ModelClass.findOneAndUpdate(
                model.getConditions(),
                values,
                {upsert: true, setDefaultsOnInsert: true},
                updateCallback
            );
        }
        if (failed > 0) {
            res.send(error(failed + " documents failed to be updated/inserted."));
        } else {
            res.send(error(succeded + " documents were updated/inserted."));
        }
    } catch (err) {
        console.error(err);
        res.send(error('Something bad happened.'));
    }
});

app.get('/api/get_courses', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Course.find({'planCode': req.query.planCode}, function(results) {
        res.send(JSON.stringify(results));
    });
});

app.get('/api/search_courses', function (req, res) {
    if (req.query.search) {
        res.setHeader('Content-Type', 'application/json');
        let query = searchAndReplaceNumbers(req.query.search);
        console.log("Search \"" + query + "\" for plan " + req.query.planCode);
        Course.find(
            { planCode: req.query.planCode, $text: { $search: query} },
            {score: { $meta: "textScore"}})
            .sort({ score: { $meta: "textScore" } })
            .exec(function (error, result) {
                if (error) Logger.error(error);
                res.send(JSON.stringify(result));
            });
    } else {
        res.status(500).send(error("Bad request"));
    }
});

app.listen(
    config.get('server.port'),
    function () {
        console.log('Listening connections on port ' + config.get('server.port'));
    }
);

function searchAndReplaceNumbers(str) {
    var romanNumerals = {
        1: "I",
        2: "II",
        3: "III",
        4: "IV",
        5: "V",
    };
    return str.replace(/(\d{1})/, function(match) {
        if (match) {
            return romanNumerals[match];
        }
    });
}

function success(payload) {
    return JSON.stringify({'error': false, 'msg': payload});
}

function error(msg) {
    return JSON.stringify({'error': true, 'msg': msg});
}