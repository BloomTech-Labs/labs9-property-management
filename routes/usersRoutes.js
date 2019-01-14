const express = require("express");
const db = require("../db/dbConfig");

const router = express.Router();

// Register user
router.post("/register", (req, res) => {
  const creds = req.body;
  db.insert(creds)
    .into("users")
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err =>
      res.status(500).json({ errorMessage: "Could not register the user!" })
    );
});

// Basic Login User
router.post("/login", (req, res) => {
  const creds = req.body;
  db("users")
    .where({ email: creds.email, password: creds.password })
    .first()
    .then(user => {
      if (user) {
        // returning user information
        res.status(200).send(user);
      } else {
        res.status(401).json({ errorMessage: "Wrong credentials!" });
      }
    })
    .catch(err => res.status(500).send(err));
});

// Get all users
router.get("/", (req, res) => {
  db("users")
    .then(users => {
      res.status(200).send(users);
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
