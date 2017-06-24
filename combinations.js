var math = require('mathjs');

var conjuntos = [
    ['A1', 'A2', 'A3'],
    ['B1', 'B2', 'B3'],
    ['C1',  'C2', 'C3']
];

var combinaciones = [];
var ancho = conjuntos[0].length;
var alto = conjuntos.length;

function perm(fila, j) {
    var filaNueva = [];
    for (var col = j; col < ancho + j; col++) {
        filaNueva.push(fila[(col + 1) % (ancho)]);
    }
    return filaNueva;
}

// Para cada fila, para cada elemento, recorrer la submatriz sin esa fila
function agregarCombinaciones(matriz) {
    for (var col = 0; col < ancho; col++) {
        var combi = "";
        for (var fila = 0; fila < alto; fila++) {
            if (matriz[fila][col] === 0) {
                break;
            }
            combi += matriz[fila][col];
        }
        combinaciones.push(combi);
    }
    return combinaciones.length < ancho^alto;
}

var count = 1;
var matriz = conjuntos.slice(0);
for (var i = 0; i < alto; i++) {
    matriz = conjuntos.slice(0);
    for (var j = 0; j < ancho; j++) {
        matriz[i] = perm(conjuntos[i], j);
        // console.log("Matriz en iteracion " + (count++) + ". Fila " + i + ". Col: " + j);
        // console.log(matriz);
        if (!agregarCombinaciones(matriz)) {
            break;
        }
    }
}

console.log(combinaciones);

// A1B1C1, A2B1C1, A3B1C1, A1B2C1, A2B2C1, A3B2C1
