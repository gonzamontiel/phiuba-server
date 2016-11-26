var Event = require('app/model/Event.js');
var Database = require('app/db/Database.js');

var db = new Database();

var testValue =   {
    "title": "Inscripción al CBC",
    "start": "2016-10-04 14:45",
    "end": "2016-11-24 18:45",
    "extra": {
      "image": "http://www.fi.uba.ar/sites/default/files/field/image/Campa%C3%B1aCBC-01-03-04.jpg",
      "info": "La Facultad de Ingeniería de la UBA informa que del 5 de octubre al 24 de noviembre se realizará la inscripción al ciclo lectivo 2017 del Ciclo Básico Común. \nLa convocatoria está únicamente destinada a aspirantes que todavía no se hayan inscripto en el CBC. \n:: Fechas de inscripción (por inicial de apellido) \nA-B: 5 y 6 de octubre / 3 y 4 de noviembre\nC-D: 7, 11 y 12 de octubre / 7 y 8 de noviembre\nE-F-G: 13, 14 y 17 de octubre / 9 y 10 de noviembre\nH-I-J-K-L: 18 y 19 de octubre / 11 y 14 de noviembre\nM-N-Ñ-O: 20, 21 y 24 de octubre / 15 y 16 de noviembre\nP-Q-R: 25, 26 y 27 de octubre / 17 y 18 de noviembre\nS-T: 28 y 31 de octubre / 21 y 22 de noviembre\nU-V-W-X-Y-Z: 1, 2, 23 y 24 de noviembre\nMás datos sobre las condiciones de ingreso a la UBA en el website del CBC"
    },
    "parsedDate": "2016-11-03"
  };


var testEvent = new Event(testValue);
testEvent.save(function(err, result) {
    if (err) console.log(err);
});
