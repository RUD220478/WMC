// normal function
function compa(x, y){
  console.log(x + y);
}
compa(1, 7);
// alternative output
const summe = compa(1, 7);

// assign function to variable
let variableFunction = function compat(x, y){
    return x + y;
}
console.log(variableFunction(1, 9) + " addiert");

// re-assign for multiplication
variableFunction = function compat(x, y){
    return x * y;
}
console.log(variableFunction(1, 9) + " multipliziert");

// timeout - das ist kein wait!
setTimeout(function() {
  console.log("This will be very delayed.");
  console.log(variableFunction(3, 4));
}, 2000);

// asynchron
console.log("Bitte warten.");

// andere Schreibweise für Funktion
let add = (a, b) => a + b;
console.log(add(7,23));

// multiple commands
add = (a, b) => {
    console.log("Hello, I'm counting!");
    return a + b;
}
console.log(add(12,74));

// for each
let fruits = [{name: "Apfel", anzahl: 5},
              {name: "Banane", anzahl: 0},
              {name: "Kirsche", anzahl: 5}];

fruits.forEach(fruit => console.log(fruit.name + " " + fruit.anzahl + " Stück"));