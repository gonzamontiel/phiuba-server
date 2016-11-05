var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Course representa una materia dado una versión de plan de estudios. Las correlativas y
 */
var courseSchema = new Schema({
    code: String,
    depCode: String,
    planCode: String,
    name: String,
    link: String,
    depto: String,
    required: Boolean,
    correlatives: [Schema.Types.Mixed], // Array of another courses codeAndNumber
    cathedras: [{
        type: String, // TO, TPO
        clasroomCode: String, // PC405, LH101, etc.

    }],
    mtime: {type: Date, default: Date.now}
});
courseSchema.index({planCode: 1, code: 1}, {unique: true}); // Unique index for plan and code
courseSchema.index({planCode: 1, name: 1}); // To search by plan and name, AKA common case
courseSchema.index({depCode: 1, name: 1}); // To search by department and name
courseSchema.index({depCode: 1, code: 1}); // To search by department and/or by full code

courseSchema.methods.fromValue = function(value) {
    this.code = value.code;
    this.number = value.number;
    this.planCode = value.planCode;
    this.name = value.name;
    this.link = value.link;
    this.depto = value.depto;
    this.required = value.required;
    this.correlatives = value.correlatives;
    this.cathedras = value.cathedras;
    this.mtime = value.mtime;
};

var Course = mongoose.model('Course', courseSchema);

module.exports = Course;
