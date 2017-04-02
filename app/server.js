var express = require('express');
var bodyParser = require('body-parser');
var strings = require('./lib/strings.js');
var Database = require('./db/Database.js');
var Course = require('./model/Course.js');
var Cathedra = require('./model/Cathedra.js');
var Department = require('./model/Department.js');
var News = require('./model/News.js');
var Event = require('./model/Event.js');
var Plan = require('./model/Plan.js');
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

function success(payload) {
    return JSON.stringify({'error': false, 'msg': payload});
}

function jsonError(msg) {
    return JSON.stringify({'error': true, 'msg': msg});
}

// Server
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
            res.send(jsonError(failed + " documents failed to be updated/inserted."));
        } else {
            res.send(jsonError(succeded + " documents were updated/inserted."));
        }
    } catch (err) {
        console.error(err);
        res.send(jsonError('Something bad happened.'));
    }
});

app.get('/api/courses', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    if (req.query.search) {
        let query = searchAndReplaceNumbers(req.query.search);
        Course.find(
            {planCode: req.query.planCode, $text: { $search: query} },
            {score: { $meta: "textScore"}})
            .sort({ score: { $meta: "textScore" } })
            .exec(function (error, result) {
                if (error) Logger.error(error);
                res.send(JSON.stringify(result));
            });
    } else if (req.query.depCode) {
        Course.find({'depCode': req.query.depCode}, {}, {sort: {name: 1}}, function(error, results) {
            if (error) res.send(jsonError('Could not find data.'));
            res.send(JSON.stringify(results));
        });
    } else {
        Course.find({'planCode': req.query.planCode}, {}, {sort: {name: 1}}, function(error, results) {
            if (error) res.send(jsonError('Could not find data.'));
            res.send(JSON.stringify(results));
        });
    }
});

app.get('/api/cathedras', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Cathedra.find({'courseCode': req.query.courseCode}, {}, function(error, results) {
        if (error) res.send(jsonError('Could not find data.'));
        res.send(JSON.stringify(results));
    });
});

app.get('/api/news', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var query = {};
    if (req.query.search) {
        // Search by text in all news
        query = { $text: { $search: req.query.search.toLowerCase() } };
    }
    News.find(query, {}, {sort: {created: -1}}, function(error, results) {
        if (error) res.send(jsonError('Could not find data.'));
        res.send(JSON.stringify(results));
    });
});

app.get('/api/events', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var query = {};
    if (req.query.search) {
        // Search by text in all news
        query = { $text: { $search: req.query.search.toLowerCase() } };
    } else if (req.query.onlyIncoming == true) {
        query = {'end': { $gte : new Date() }}
    }
    Event.find(query, {}, {sort: {parsedDate: -1}}, function(error, results) {
        if (error) res.send(jsonError('Could not find data.'));
        res.send(JSON.stringify(results));
    });
});

app.get('/api/departments', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Department.find({}, {}, function(error, results) {
        if (error) res.send(jsonError('Could not find data.'));
        res.send(JSON.stringify(results));
    });
});

app.get('/api/department', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    if (!req.query.code) {
        res.send(jsonError("The department code must be specified in the query."));
    } else {
        Department.find({code: req.query.code}, {}).limit(1).exec(
            function(error, result) {
               if (error || result.length == 0) res.send(jsonError('Could not find data.'));
               res.send(JSON.stringify(result[0]));
           }
       );
    }
});

app.get('/api/plans', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Plan.aggregate(
        {
            $group: {
                _id: "$code",
                name: {$first: "$name"},
                link: {$first: "$link"},
                code: { $first: "$code" }
            }
        },
        function(error, results) {
            if (error) res.send(jsonError('Could not find data.'));
            res.send(JSON.stringify(results));
        }
    );
});

app.get('/test', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(success("OK"))
});

app.listen(
    config.get('server.port'),
    function () {
        Logger.info('Listening connections on port ' + config.get('server.port'));
        Logger.info('Will list available routes');
        app._router.stack.forEach(function(layer) {
            if (layer.route) {
                Logger.info(layer.route.path);
            }
        });
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
