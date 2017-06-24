var Database = require('app/db/Database.js');
var strings = require('app/lib/strings');

var db = new Database();
var Course = require('app/model/Course.js');

var ROOT_CODE = "63.01";
var PLANCODE = "INFORMA86";

var total = [];

function printCorrelatives(code) {
    Course.find({'correlatives': {$in: [code]}, 'planCode': PLANCODE}, {}, {multi: true}, function(err, docs) {
        total.concat(docs.map(function(d) {return d.code}));
        console.log(code + " opens " + docs.map(function(d) {return d.code}).join(","));
        docs.forEach(function(doc) {
            printCorrelatives(doc.code)
        });
    });
}

printCorrelatives(ROOT_CODE);
