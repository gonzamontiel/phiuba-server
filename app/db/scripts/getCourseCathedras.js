/*jshint loopfunc: true */

var request = require('request');
var jsonfile = require('jsonfile');
var Course = require("app/model/Course.js");
var Cathedra = require("app/model/Cathedra.js");
var Database = require('app/db/Database.js');

var database = new Database();

const HOST = "http://www.mli-fiuba.com.ar"; // Cómo habrán conseguido la data, no sé, pero ya viene en formato Json así que voila
const VERSION = "1.0";
const API = "/eqac/v2.0/?v="+VERSION;
const MATQS = "&m=";

database.getDistinct(Course, 'code', function(courses) {
    for (let i = 0; i < courses.length; i++) {
        var codeWithDot = courses[i];
        var url = HOST + API + MATQS + Course.convertToSimpleNotation(codeWithDot);
        request.get(
            url,
            function (error, response, body) {
                console.log("Parsing response for... " + response.request.href);
                if (!error && response.statusCode == 200) {
                    jsonfile.writeFileSync("catedras.json", body, {spaces: 2, flag: 'a+'});
                    let code = response.request.uri.query.replace(/.*m\=(.*)$/, "$1");
                    code = Course.convertToDotNotation(code);
                    addCathedras(code, body);
                } else {
                    console.log(error);
                }
            }
        );
    }
});

function addCathedras(code, body) {
    let result;
    try {
        result = JSON.parse(body);
        for (let curso in result.cursos) {
            var cathedra = {
                courseCode: code,
                teachers: result.cursos[curso].docentes,
                seats: result.cursos[curso].vacantes,
                availablePlans: result.cursos[curso].carreras,
                schedule: []
            };
            result.cursos[curso].horarios.forEach(function(horario) {
                cathedra.schedule.push({
                    "day": horario.dia,
                    "from": horario.desde,
                    "to": horario.hasta,
                    "type": horario.tipo,
                    "classroomCode": horario.aula
                });
            });
            let cathModel = new Cathedra(cathedra);
            console.log("Inserting " + cathedra.courseCode);
            cathModel.save(function(err, sarasa) {
                if (err) console.error(err);
            });
        }
    } catch(e) {
        console.error("Skipping. Reason: " + e.name);
    }
}
