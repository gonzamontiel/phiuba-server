var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tokenize = require('app/lib/strings.js').tokenize;

/**
 * Course representa una materia dado una versión de plan de estudios.
 */
var courseSchema = new Schema({
    code: String,
    depCode: String,
    planCode: String,
    name: String,
    alias: String,
    indexableTokens: String,
    link: String,
    depto: String,
    required: Boolean,
    correlatives: [Schema.Types.Mixed], // Array of another courses code
    mtime: {type: Date, default: Date.now}
},
{
    toJSON: {
        transform: function(doc, ret) {
                delete ret.indexableTokens;
                delete ret._id;
                delete ret.mtime;
        }
    }
});

courseSchema.index({planCode: 1, indexableTokens: "text"}); // Common case, search by name and plan code
courseSchema.index({planCode: 1, code: 1}, {unique: true, dropDups: true}); // Unique index for plan and code
courseSchema.index({depCode: 1}); // To search by department and/or by full code

courseSchema.statics.convertToDotNotation = function(code) {
    var matches = code.match(/^(\d{2})(\d{2})$/);
    if (matches !== null) {
        return matches[1] + "." + matches[2];
    }
    return code;
};

courseSchema.statics.convertToSimpleNotation = function(code) {
    var matches = code.match(/^(\d{2})\.(\d{2})$/);
    if (matches !== null) {
        return matches[1] + matches[2];
    }
    return code;
};

courseSchema.statics.normalize = function(values) {
    values.code = courseSchema.statics.convertToDotNotation(values.code);
    values.indexableTokens = string.tokenize(values.name);
};

courseSchema.methods.codeWithoutDot = function() {
    return courseSchema.statics.convertToSimpleNotation(this.code);
};

courseSchema.methods.getConditions = function() {
    return {code: this.code};
};

courseSchema.pre('save', true, function(next, done) {
    // calling next kicks off the next middleware in parallel
    next();
    this.indexableTokens = tokenize(this.name);
    done();
});

var Course = mongoose.model('Course', courseSchema);
Course.on('index', function(err) {
    if (err) {
        console.error('User index error: %s', err);
    } else {
        console.info('User indexing complete');
    }
});

module.exports = Course;
