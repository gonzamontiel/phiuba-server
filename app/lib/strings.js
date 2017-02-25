/**
 * Strings helper module.
 * @module strings
 */

/**
* This function is meant to normalize diacritic chars and keep only the natural language symbols
* @param {string} str The string to be sanitized.
* @return {string} The sanitized string.
*/
module.exports.sanitize = function sanitize(str) {
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    str = str.replace(/á/gim,'a');
    str = str.replace(/é/gim,'e');
    str = str.replace(/í/gim,'i');
    str = str.replace(/ó/gim,'o');
    str = str.replace(/ú/gim,'u');
    str = str.replace(/ü/gim,'u');
    return str.toLowerCase().trim();
};


/**
* This tokenizer generates substrings for each word. The generated substrings
* length will be between minChars and the whole word length.
* Note this is meant for short strings and returns a considerably larger
* string than the input.
* @param {string} str the text to be parsed (separated by spaces)
* @param {number} minChars the minimum lenght of substring
*/
const DEFAULT_TOKEN_MIN_CHARS = 3;

module.exports.tokenize = function(str, minChars) {
    var clean = str.replace(/[\(\)\-\_]/ig, "");
    var words = clean.split(" ");
    var tokens = [];
    words.forEach(function(word) {
        for (var i = minChars || DEFAULT_TOKEN_MIN_CHARS; i < word.length; i++) {
            tokens.push(word.substr(0, i));
        }
    })
    return words.concat(tokens).join(" ");
};

/**
* Returns wheter the input string is a roman numeral.
* @param {string} str the string to be evaluated
*/
module.exports.isRoman = function(str) {
    var reg = new RegExp(/(^(?=[MDCLXVI])M*(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$)/);
    return reg.test(str);
};
