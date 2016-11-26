var Department = require('app/model/Department.js');

var testValue = {
    "contacto": "Contacto:\nAv. Las Heras 2214 - PB - C1127AAR - Buenos Aires - Argentina\nTel.: (54-11) 4514-3006.\nE-mail: construc@fi.uba.ar \nHorario de atención: de 9.00 a 21.00.",
    "mailto": "construc@fi.uba.ar",
    "autoridades": "Novedades acerca de cursos y propuestas docentes en la Cartelera del Departamento o vía Twitter a través de @cyeFiuba.",
    "CA-docentes": "Directora: Dra. Inga. Paula Folino (pfolino@fi.uba.ar)",
    "CA-auxiliares": "--",
    "CA-graduados": "Secretaria: Ing. Claudia Mabel Traiber",
    "CA-alumnos": "Representantes Profesores ante el Consejo Asesor:\nTitulares:\nIng. Victorio Santiago Díaz\nIng. Raúl Husni\nIng. Horacio P. Mac Donnell\nSuplentes:\nIng. Alejandro Juan Sarubbi\nIng. Rogelio Daniel Percivati Franco\nIng. Pablo Luis Dieguez\nIng. Jorge Alberto Luzardi",
    "name": "Construcciones y Estructuras"
  };

  var testDepartment = new Department(testValue);
  console.log(testDepartment.name);
  console.log(testDepartment["CA-docentes"]);
