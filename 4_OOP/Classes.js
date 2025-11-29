class Person {
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
}

const person1 = new Person("Anna", 33);

console.log(person1.name + " ist so alt: " + person1.age);

// Getter Setter

class Person {
  constructor(name) {
    this._name = name; // das Unterstrich-Attribut ist eine Konvention für "intern"
  }

  // Getter: wird aufgerufen, wenn man person.name schreibt
  get name() {
    return this._name;
  }

  // Setter: wird aufgerufen, wenn man person.name = "..." schreibt
  set name(newName) {
    if (newName.length < 2) {
      console.log("Name ist zu kurz!");
    } else {
      this._name = newName;
    }
  }
}

const person = new Person("Anna");

console.log(person.name);  // → Anna   (ruft Getter auf)
person.name = "Li";        // → Name ist zu kurz!
person.name = "Maria";     // Setter erlaubt Änderung
console.log(person.name);  // → Maria

// Inheritance

class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} macht ein Geräusch.`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} bellt.`);
  }
}

const dog = new Dog("Bello");
dog.speak();  // → Bello bellt.

// Encapsulation hashtag

class Konto {
  #saldo = 0; // private Eigenschaft (seit ES2022)

  einzahlen(betrag) {
    this.#saldo += betrag;
  }

  get saldo() {
    return this.#saldo;
  }
}

const konto = new Konto();
konto.einzahlen(100);
console.log(konto.saldo); // → 100
// konto.#saldo = 1000; ❌ Fehler: privat!

// Polymorphismus
class Tier {
  sprich() {
    console.log("Ein Tier macht ein Geräusch.");
  }
}

class Katze extends Tier {
  sprich() {
    console.log("Miau!");
  }
}

class Hund extends Tier {
  sprich() {
    console.log("Wuff!");
  }
}

const tiere = [new Hund(), new Katze(), new Tier()];
tiere.forEach(tier => tier.sprich());

// Abstraction
class Fahrzeug {
  fahre() {
    throw new Error("Die Methode 'fahre()' muss überschrieben werden!");
  }
}

class Auto extends Fahrzeug {
  fahre() {
    console.log("Das Auto fährt los!");
  }
}

const a = new Auto();
a.fahre(); // → Das Auto fährt los!

// Statics
class Mathe {
  static add(a, b) {
    return a + b;
  }
}

console.log(Mathe.add(5, 3)); // → 8