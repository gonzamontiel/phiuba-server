var mongoose = require('mongoose');

/**
 * Representa un departamento
 */
var Schema = mongoose.Schema;
var cathedraSchema = new Schema({
    courseCode: String,
    teachers: String,
    seats: Number,
    availablePlans: String,
    schedule: [{
        day: {type: String},
        from: {type: String},
        to: {type: String},
        type: {type: String},
        clasroomCode: {type: String}
    }]
});
cathedraSchema.index({courseCode: 1}); // To search by code

cathedraSchema.methods.getConditions = function(this) {
    return {courseCode: this.courseCode};
};

module.exports = mongoose.model('Cathedra', cathedraSchema);
