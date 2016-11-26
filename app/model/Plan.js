var mongoose = require('mongoose');

/**
 * Representa un plan de estudios por carrera y año de
 * redacción.
 */
var Schema = mongoose.Schema;
var planSchema = new Schema({
    code: String,
    name: String,
    link: String
});
planSchema.index({code: 1}); // To search by code

module.exports = mongoose.model('Plan', planSchema);
