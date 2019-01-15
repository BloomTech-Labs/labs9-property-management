const express = require("express");
const db = require("../db/dbConfig");

const router = express.Router();

// tenant properties
router.post("/", (req, res) => {
  db.insert(req.body)
    .into("tenants")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});

// get tenants
router.get("/", (req, res) => {
  db("tenants")
    .then(tenant => {
      res.status(200).json(tenant);
    })
    .catch(err =>
      res
        .status(500)
        .json({ errorMessage: "The properties could not be retrieved." })
    );
});

module.exports = router;
