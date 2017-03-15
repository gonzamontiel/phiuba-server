var mongoose = require('mongoose');
var tokenize = require('app/lib/strings.js').tokenize;

/**
 * Representa un departamento
 */
var Schema = mongoose.Schema;
var departmentSchema = new Schema({
    'code': String,
    'altCode': String,
    'contacto': String,
    'name': String,
    'indexableTokens': String,
    'mailto': String,
    'CA-docentes': String,
    'CA-auxiliares': String,
    'CA-graduados': String,
    'CA-alumnos': String
},
{
    toJSON: {
        transform: function(doc, ret) {
            delete ret.indexableTokens;
            delete ret._id;
        }
    }
});
departmentSchema.index({code: 1}); // To search by code
departmentSchema.index({altCode: 1}); // To search by alternative code
departmentSchema.index({'indexableTokens': "text"});

departmentSchema.methods.getConditions = function() {
    return {code: this.code};
};

departmentSchema.pre('save', true, function(next, done) {
    // calling next kicks off the next middleware in parallel
    next();
    this.indexableTokens = tokenize(this.name);
    done();
});

module.exports = mongoose.model('Department', departmentSchema);
