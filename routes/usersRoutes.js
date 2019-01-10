const express = require("express");
const db = require("../db/dbConfig");

const router = express.Router();

router.post("/register", (req, res) => {
  const creds = req.body;
  db.insert(creds)
    .into("users")
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => res.status(500).json({ errorMessage: "ERROR" }));
});

router.get("/", (req, res) => {
  res
    .send("Getting users")
    .catch(err =>
      res.status(500).json({ errorMessage: "Data could not be retrieved." })
    );
});

module.exports = router;
