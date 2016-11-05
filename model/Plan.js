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

planSchema.methods.fromValue = function(value) {
    this.code = value.code;
    this.name = value.name;
    this.link = value.link;
};

var Plan = mongoose.model('Plan', planSchema);
module.exports = Plan;
