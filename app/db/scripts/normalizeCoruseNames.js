var Database = require('app/db/Database.js');
var strings = require('app/lib/strings');

var db = new Database();
var Course = require('app/model/Course.js');

function isSpecialLetter(str) {
    return str === "A" ||
    str === "B" ||
    str === "C" ||
    str === "D";
}

function betterName(str) {
    var res =str.split(' ').map(function (s) {
        if (strings.isRoman(s) || isSpecialLetter(s) ) {
            return s;
        } else if (s.length <= 3) {
            return s.toLowerCase();
        } else {
            return s.slice(0, 1).toUpperCase() + s.slice(1).toLowerCase();
        }
    }).join(' ');
    console.log(res);
    return  res !== '' &&
            res !== null &&
            res !== undefined ? res : str;
}

Course.find({}, {}, {multi:true}, function(err, docs) {
    docs.forEach(function(doc) {
        if (doc.name) {
            doc.name = betterName(doc.name);
            doc.save(function(err) {
                if (err) console.error(err);
            });
        }
    })
});
