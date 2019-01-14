const express = require("express");
// const db = require("../db/dbConfig");
const userDB = require("../helpers/userDb");

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

// Get user's properties by passing the id.
router.get("/:id/properties", (req, res) => {
  userDB
    .getUserProperties(req.params.id)
    .then(users => {
      res.status(200).send(users);
    })
    .catch(err => res.status(500).send(err));
});

// TESTING USER POSTS
router.post("/registertest", (req, res) => {
  const user = req.body;

  db.insert(user)
    .into("users")
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err =>
      res.status(500).json({
        errorMessage:
          "There was an error while saving the user to the database."
      })
    );
});

module.exports = router;
