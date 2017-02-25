var mongoose = require('mongoose');

/**
 * Representa un departamento
 */
var Schema = mongoose.Schema;
var departmentSchema = new Schema({
    'code': String,
    'altCode': String,
    'contacto': String,
    'name': String,
    'mailto': String,
    'CA-docentes': String,
    'CA-auxiliares': String,
    'CA-graduados': String,
    'CA-alumnos': String
});
departmentSchema.index({code: 1}); // To search by code
departmentSchema.index({altCode: 1}); // To search by alternative code

departmentSchema.methods.getConditions = function() {
    return {code: this.code};
};

module.exports = mongoose.model('Department', departmentSchema);
