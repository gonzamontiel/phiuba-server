var Exam = require('app/model/Exam.js');
var Database = require('app/db/Database.js');

var db = new Database();

var testValue = {
    "year": "2016",
    "turn": "DICIEMBRE-FEBRERO",
    "courseCode": "6103",
    "courseName": "ANALISIS MATEMATICO II A",
    "dates": [
      {
        "name": "Mesa 1",
        "date": "06/12/2016",
        "type": "Libres y regulares",
        "inscriptionStartDate": "01/11/2016",
        "inscriptionEndDate": "04/12/2016"
      },
      {
        "name": "MESA 2",
        "date": "13/12/2016",
        "type": "Libres y regulares",
        "inscriptionStartDate": "01/11/2016",
        "inscriptionEndDate": "11/12/2016"
      },
      {
        "name": "MESA 3",
        "date": "20/12/2016",
        "type": "Libres y regulares",
        "inscriptionStartDate": "01/11/2016",
        "inscriptionEndDate": "18/12/2016"
      },
      {
        "name": "MESA 4",
        "date": "14/02/2017",
        "type": "Libres y regulares",
        "inscriptionStartDate": "01/01/2017",
        "inscriptionEndDate": "12/02/2017"
      },
      {
        "name": "MESA 5",
        "date": "21/02/2017",
        "type": "Libres y regulares",
        "inscriptionStartDate": "01/01/2017",
        "inscriptionEndDate": "19/02/2017"
      }
    ]
  };

var testExam = new Exam(Exam.normalize(testValue));
console.log(testExam);

Exam.findOneAndUpdate(
    testExam.getConditions(),
    testValue,
    {upsert: true, setDefaultsOnInsert: true},
    function(error) {
        if (error) console.error(error.message);
    }
);
