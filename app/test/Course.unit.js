var Course = require('app/model/Course.js');

var codeWithDot = "63.01";
var codeWithoutDot = "6301";

console.log("with dot: " + Course.convertToDotNotation(codeWithoutDot));
console.log("without dot: " + Course.convertToSimpleNotation(codeWithDot));
