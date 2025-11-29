const express = require("express");
const app = express();
const port = 3000;

const orders = [
  { id:  1, name: "Anna",    pizza: "Salami" },
  { id:  2, name: "Susi",    pizza: "Tomato" },
  { id:  3, name: "Fritz",   pizza: "Broccoli" },
  { id:  4, name: "Andrea",  pizza: "Poison" },
  { id:  5, name: "Thomas",  pizza: "Ruccola" },
  { id:  6, name: "Verena",  pizza: "Diavolo" },
  { id:  7, name: "Marion",  pizza: "Speck" },
  { id:  8, name: "Karl",    pizza: "Mais" },
  { id:  9, name: "Hans",    pizza: "Schinken" },
  { id: 10, name: "Barbara", pizza: "Paprika" }
];

app.get("/", (req, res) => {
  res.send("Hello, World from Express!");
});

// **NEW** GET all Students as json
app.get("/orders", (req, res) => {
  res.json(orders);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});