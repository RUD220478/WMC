const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

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

app.get("/orders", (req, res) => {
  res.json(orders);
});

// GET
app.get("/orders/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const order = orders.find(o => o.id === id);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  res.json(order);
});

// POST
app.post("/orders", (req, res) => {
  const { name, pizza } = req.body;

  if (!name || !pizza) {
    return res.status(400).json({ error: "Name and Pizza are required!" });
  }
  
  const newId = orders.length ? orders[orders.length - 1].id + 1 : 1;
  const newOrder = { id: newId, name, pizza };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// PUT
app.put("/orders/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, pizza } = req.body;

  if (!name || !pizza) {
    return res.status(400).json({ error: "Name and pizza are required!" });
  }

  // Returns the index of the order with the id.
  const pos = orders.findIndex(o => o.id === id);
  if (pos === -1) {
    return res.status(404).json({ error: "Order not found" });
  }

  // update an existing order; replace the object
  orders[pos] = { id, name, pizza };
  res.json(orders[pos]);
});

// PATCH
app.patch("/orders/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, pizza } = req.body;

  const order = orders.find(o => o.id === id);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  if (name !== undefined) order.name = name;
  if (pizza !== undefined) order.pizza = pizza;

  res.json(order);
});

// DELETE
app.delete("/orders/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pos = orders.findIndex(o => o.id === id);

  if (pos === -1) {
    return res.status(404).json({ error: "Order not found" });
  }

  // Removes the order at the pos position
  orders.splice(pos, 1);
  // No content is returned 
  return res.status(204).send(); // No Content
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});