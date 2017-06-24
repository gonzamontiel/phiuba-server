var config = require('config');
var request = require('request');
var jsonfile = require('jsonfile');
var Plan = require('app/model/Plan.js')
var Course = require('app/model/Course.js')
var Database = require('app/db/Database.js');
var fs = require('fs');

var database = new Database();

const FILES_PATH = __dirname + "/app/data/json/";

var excludes = ".old";
fs.readdirSync(FILES_PATH).forEach(function(file) {
    console.log("Reading " + file);
    if (file.match("plans.json") !== null && !file.match(excludes)) {
        var data = jsonfile.readFileSync(FILES_PATH + file);
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            var values = data[i];
            Plan.findOneAndUpdate(
                {"code": values.code},
                values,
                {upsert: true, setDefaultsOnInsert: true},
                function updateCallback(err, result) {
                    console.log(err);
                }
            );
        }
    } else if (!file.match(excludes)) {
        // var data = jsonfile.readFileSync(FILES_PATH + file);
        // for (let i = 0; i < data.length; i++) {
        //     var values = data[i];
        //     Course.findOneAndUpdate(
        //         {"code": values.code, "depCode": values.depCode},
        //         {"credits": values.credits},
        //         {upsert: true, setDefaultsOnInsert: true},
        //         function updateCallback(err, result) {
        //             console.log(err);
        //         }
        //     );
        // }
    }
});
