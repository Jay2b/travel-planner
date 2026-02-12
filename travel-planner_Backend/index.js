const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./database");
const PORT = 3000;

// middleware for JSON
app.use(express.json());

app.use(cors());

//Test endpoint
app.get("/", (req, res) => {
  res.send("Travel Planner API is running");
});

//GET All the trips
app.get("/trips", (req, res) => {
  const sql = "SELECT * FROM trips";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
});
//GET Single Trip
app.get("/trips/:id", (req, res) => {
  const id = Number(req.params.id);
  const sql = "SELECT * FROM trips WHERE id = ?";

  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: "Record not found" });
    }
    return res.json(row);
  });
});

// POST /trips
app.post("/trips", (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Name and description are required" });
  }

  const sql = `
    INSERT INTO trips (name, description)
    VALUES (?, ?)
  `;

  const params = [name, description];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(201).json({
      id: this.lastID,
      name,
      description,
    });
  });
});
// Update trip
app.put("/trips/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Name and description are required" });
  }

  const sql = `UPDATE trips
    SET name = ?, description = ?
    WHERE id = ?`;

  const params = [name, description, id];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Record not found" });
    }
    return res.json({ message: "Trip updated" });
  });
});
//DELETE Trip
app.delete("/trips/:id", (req, res) => {
  const id = Number(req.params.id);
  const sql = `DELETE FROM trips WHERE id = ?`;

  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: "Trip not found" });
    }
    return res.status(200).json({ message: "Trip deleted" });
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
