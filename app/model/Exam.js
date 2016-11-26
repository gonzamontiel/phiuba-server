var mongoose = require('mongoose');
var Course = require('./Course.js');

/* To convert non Iso dates like 19/02/2017
* Correct ways are either 02/19/2017 or 2017/02/19
*/
function toIsoDate(dateString) {
    var splitted = dateString.split("/");
    return new Date(splitted[2], splitted[1] - 1, splitted[0]);
}

/**
* Stores info about exam dates by year, course and turn/call.
*/
var Schema = mongoose.Schema;
var examSchema = new Schema({
    year: Number,
    turn: String,
    courseCode: String,
    courseName: String,
    dates: [
        {
            name: {type: String},
            date: {type: Date},
            type: {type: String},
            inscriptionStartDate: {type: Date},
            inscriptionEndDate: {type: Date}
        }
    ]
});
examSchema.index({courseCode: 1, year: 1, turn: 1}, {unique: true}); // To search by code

examSchema.statics.normalize = function(values) {
    let dates = values.dates.map(function(element) {
        element.date = toIsoDate(element.date);
        element.inscriptionEndDate = toIsoDate(element.inscriptionEndDate);
        element.inscriptionStartDate = toIsoDate(element.inscriptionStartDate);
        return element;
    });
    values.dates = dates;
    values.courseCode = Course.convertToDotNotation(values.courseCode);
    return values;
};

examSchema.methods.getConditions = function() {
    return {'courseCode': this.courseCode, 'year': this.year, 'turn': this.turn};
};

module.exports = mongoose.model('Exam', examSchema);
