var Course = require("app/model/Course.js");
var Event = require("app/model/Event.js");
var Department = require("app/model/Department.js");
var News = require("app/model/News.js");
var Database = require('app/db/Database.js');
var tokenize = require('app/lib/strings.js').tokenize;

var db = Database.start();

class Tokenizer {
    constructor(collection, fieldName) {
        this.collection = collection;
        this.fieldName = fieldName;
    }

    run() {
        var cursor = this.collection.find().cursor();
        var me = this;
        cursor.on('data', function (doc) {
            console.log(doc);
            doc.indexableTokens = tokenize(doc[me.fieldName]);
            doc.save(function(err) {
                if (err) console.error(err)
            });
        }).on('error', function (err) {
            console.error(err)
        }).on('close', function () {
            console.log("Finished")
        });
    }
}

// var toks = [
//     // new Tokenizer(Course, 'name'),
//     new Tokenizer(Department, 'name'),
//     new Tokenizer(News, 'title'),
//     new Tokenizer(Event, 'title'),
// ];
//
// toks.forEach(function(tok) {
//     tok.run();
// })
