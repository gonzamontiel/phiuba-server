var G = require('generatorics');
var math = require('mathjs');


var menu_orig = {
    "entrada": [ "omelette", "sopa"],
    "plato": ["lasagna", "ravioles", "bondiola"],
    "postre": ["marquisse", "volcan"]
};

var combinaciones = {};
var count = 0;
var combCount = 0;
function combinar(elemento, menu, count, nodoAnterior) {
    // console.log("-----------");
    // console.log(count);
    console.log(elemento);
    console.log(menu);
    if (elemento !== "") {
        nodoAnterior.push(elemento);
    }
    // chequear si está vacío
    for (var categoria in menu) {
        count++;
        var subMenu = Object.assign({}, menu);
        delete subMenu[categoria];
        combCount++;
        for (let i = 0; i < menu[categoria].length; i++){
            combinaciones[combCount] = [];
            combinar(menu[categoria][i], subMenu, count++, combinaciones[combCount]);
        }
        menu = subMenu;
    }
}

combinar("", menu_orig, 0)
console.log(combinaciones);
