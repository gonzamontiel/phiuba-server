var jsonfile = require('jsonfile');
var fs = require('fs');
var LineByLineReader = require('line-by-line');

var Course = require('./model/Course.js');
var Plan = require('./model/Plan.js');

const path = "data/json/";
const coursesFile = path + 'courses.out.json';
const plansFile = path + 'plans.out.json';

function calculateCor(value) {
    return ;
}

var plans = [];
fs.readdirSync(__dirname + '/data').forEach(function(file) {
    if (file.match(/\.*.csv$/) !== null) {
        console.log("Processing " + file);
        var planCode, jsonFileName = file.replace(/CONVERT-([^\d]*)(\d{2})\.csv/i,
            function(a, plan, year) {
                planCode = plan.substring(0,7).toUpperCase() + year;
                return path + planCode + '.json';
            }
        );
        var courses = [];
        lr = new LineByLineReader('data/' + file);
        lr.on('line', function (line) {
            var values = line.split('|');
            var code = values[1];
            var planCourseValue = {
                'required': values[0] === "OBL",
                'code': code,
                'depCode': parseInt(code.split('.')[0]),
                'planCode': planCode,
                'name': values[2],
                'credits': parseInt(values[3]),
                'correlatives': values[4] ? values[4].split('-') : []
             };
             courses.push(planCourseValue);
        });
        lr.on('end', function () {
            jsonfile.writeFileSync(jsonFileName, courses, {spaces: 2, flag: 'w+'});
        });
     }
});
