var mongoose = require('mongoose');

/**
 * Representa un plan de estudios por carrera y año de
 * redacción.
 */
var Schema = mongoose.Schema;
var planSchema = new Schema({
    code: String,
    name: String,
    link: String,
    credits: Number,
    branches: [{
        "code": String,
        "name": String,
        "required": [String]
    }]
});
planSchema.index({code: 1}, {unique: true}); // To search by code

module.exports = mongoose.model('Plan', planSchema);
