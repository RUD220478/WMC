// server.js
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

const rooms = [
  { id:  1, Raum: "B4.17MF" },
  { id:  2, Raum: "A3.11" },
  { id: 3, Raum: "B3.10MF" }
];

app.get("/", (req, res) => {
  res.send("Hello, Thomas, Andrea and World from Express!");
});

app.get("/orders", (req, res) => {
  res.json(rooms);
});

app.get("/orders/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const room = rooms.find(o => o.id === id)

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  res.json(order);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});