#!/usr/bin/env bash
set -e

# Installiere dependencies
npm install express
npm install --save-dev nodemon

# Erstelle server.js
cat > server.js << 'EOF'
const express = require("express");
const app = express();
const port = 3000;

const orders = [
{ id: 1, name: "Anna", pizza: "Salami" },
{ id: 2, name: "Susi", pizza: "Tomato" },
{ id: 3, name: "Fritz", pizza: "Broccoli" },
{ id: 4, name: "Andrea", pizza: "Poison" },
{ id: 5, name: "Thomas", pizza: "Ruccola" },
{ id: 6, name: "Verena", pizza: "Diavolo" },
{ id: 7, name: "Marion", pizza: "Speck" },
{ id: 8, name: "Karl", pizza: "Mais" },
{ id: 9, name: "Hans", pizza: "Schinken" },
{ id: 10, name: "Barbara", pizza: "Paprika" }
];

app.get("/", (req, res) => {
res.send("Hello, World from Express!");
});

app.get("/orders", (req, res) => {
res.json(orders);
});

app.get("/orders/:id", (req, res) => {
const id = parseInt(req.params.id);
const order = orders.find(o => o.id === id);

if (!order) {
return res.status(404).json({ error: "Order not found" });
}

res.json(order);
});

app.listen(port, () => {
console.log(`Server running at http://localhost:${port}`);
});
EOF

# start npm im hintergrund
npm start &

sleep 3

curl -I http://localhost:3000

echo "Check http://localhost:3000/orders/5 if there is an output you are good to go."
