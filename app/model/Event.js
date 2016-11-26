var mongoose = require('mongoose');

/**
 * Representa un evento del calendario
 */
var Schema = mongoose.Schema;
var eventSchema = new Schema({
    title: String,
    start: Date,
    end: Date,
    parsedDate: Date,
    extra: {
      image: String,
      info: String
    }
});
eventSchema.index({title: 1}, {unique: true}); // To search by title
eventSchema.index({start: 1, end: 1}); // To search by title

eventSchema.methods.getConditions = function() {
    if (this.title !== undefined) {
        return {title: this.title};
    }
    return this;
};

module.exports = mongoose.model('Event', eventSchema);
