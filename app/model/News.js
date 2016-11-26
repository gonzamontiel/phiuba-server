var mongoose = require('mongoose');

/**
 * Representa una noticia de la página principal de la FIUBA
 */
var Schema = mongoose.Schema;
var newsSchema = new Schema({
    title: {type: String, default: 'notitle'},
    created: String,
    thumbnail: String,
    text: String,
    img: String,
    link: String
});
newsSchema.index({link: 1}, {unique: true}); // To avoid duplicates
newsSchema.index({title: 1}); // To search by title
newsSchema.index({created: 1}); // To search by date

newsSchema.methods.getConditions = function() {
    return {'link': this.link};
};

module.exports = mongoose.model('News', newsSchema);
