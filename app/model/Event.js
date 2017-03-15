var mongoose = require('mongoose');
var tokenize = require('app/lib/strings.js').tokenize;

/**
 * Representa un evento del calendario
 */
var Schema = mongoose.Schema;
var eventSchema = new Schema({
    'title': String,
    'indexableTokens': String,
    'start': Date,
    'end': Date,
    'parsedDate': Date,
    'extra': {
        'image': String,
        'info': String
    }
},
{
    toJSON: {
        transform: function(doc, ret) {
            delete ret.indexableTokens;
            delete ret._id;
        }
    }
});
eventSchema.index({title: 1}, {unique: true}); // To search by title
eventSchema.index({start: 1, end: 1}); // To search by dates
eventSchema.index({"indexableTokens": "text", "extra.info": "text"}); // Search by text

eventSchema.methods.getConditions = function() {
    if (this.title !== undefined) {
        return {title: this.title};
    }
    return this;
};

eventSchema.pre('save', true, function(next, done) {
    // calling next kicks off the next middleware in parallel
    next();
    this.indexableTokens = tokenize(this.title);
    done();
});

module.exports = mongoose.model('Event', eventSchema);
