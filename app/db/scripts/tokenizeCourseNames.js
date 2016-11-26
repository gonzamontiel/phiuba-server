var Course = require("app/model/Course.js");
var Database = require('app/db/Database.js');
var tokenize = require('app/lib/strings.js').tokenize;

var db = Database.start();

var cursor = Course.find().cursor();

cursor.on('data', function (doc) {
    doc.indexableTokens = tokenize(doc.name);
    doc.save(function(err) {
        if (err) console.error(err)
    });
}).on('error', function (err) {
    console.error(err)}
).on('close', function () {
});
