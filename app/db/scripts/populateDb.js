var jsonfile = require('jsonfile');
var Database = require('app/db/Database.js');
var strings = require('app/lib/strings');

var db = new Database();
var Course = require('app/model/Course.js');
var Plan = require('app/model/Plan.js');

var input = '../../data/json/plans.json';
var plans = jsonfile.readFileSync(input);
var planCourses;

for (var i=0; i < plans.length; i++) {
    console.log("reading plan " + plans[i].name);
    //save plan
    var plan = new Plan(plans[i]);
    db.insert(plan);

    //save courses
    console.log("reading file " + "data/json/" + plans[i].code + ".json");

    planCourses = jsonfile.readFileSync("../../data/json/" + plans[i].code + ".json");

    for (var j=0; j < planCourses.length; j++) {
        var courseVal = planCourses[j];
        console.log("reading courseVal " + courseVal.name);
        courseVal.name = strings.sanitize(courseVal.name);
        var course = new Course(courseVal);
        db.insert(course);
    }
}
