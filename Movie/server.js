// server.js
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

const movies = [
  { id:  1, title: "Dracula", year: 2010 },
  { id:  2, title: "Harry Potter", year: 2005 },
  { id: 3, title: "Anna Meier", year: 2003 }
];

app.get("/", (req, res) => {
  res.send("Hello, Thomas, Andrea and World from Express!");
});

app.get("/movies", (req, res) => {
  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const title = movies.find(o => o.id === id)

  if (!order) {
    return res.status(404).json({ error: "Movie not found" });
  }

  res.json(order);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});