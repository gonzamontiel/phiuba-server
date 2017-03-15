var mongoose = require('mongoose');
var tokenize = require('app/lib/strings.js').tokenize;

/**
 * Representa una noticia de la página principal de la FIUBA
 */
var Schema = mongoose.Schema;
var newsSchema = new Schema({
    'title': {type: String, default: 'notitle'},
    'created': Date,
    'indexableTokens': String,
    'thumbnail': String,
    'text': String,
    'img': String,
    'link': String
},
{
    toJSON: {
        transform: function(doc, ret) {
            delete ret.indexableTokens;
            delete ret._id;
        }
    }
});

newsSchema.index({link: 1}, {unique: true}); // To avoid duplicates
newsSchema.index({ "indexableTokens": "text", "text": "text" }, {name: "newsTextIndex"}); // To search by text in title and description
newsSchema.index({created: -1}); // To search by date

newsSchema.methods.getConditions = function() {
    return {'link': this.link};
};

newsSchema.pre('save', true, function(next, done) {
    // calling next kicks off the next middleware in parallel
    next();
    this.indexableTokens = tokenize(this.title);
    done();
});

module.exports = mongoose.model('News', newsSchema);
