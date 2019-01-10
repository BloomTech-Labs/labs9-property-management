const express = require("express");
const db = require("../db/dbConfig");

const router = express.Router();

router.use(express.json());

// Get all the properties

router.get("/", (req, res) => {
  db("properties")
    .then(properties => {
      res.status(200).json(properties);
    })
    .catch(err =>
      res
        .status(500)
        .json({ errorMessage: "The properties could not be retrieved." })
    );
});

// Get the specified property

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("properties")
    .where({ id: id })
    .first()
    .then(property => {
      if (!property) {
        res.status(401).json({ message: "Cannot find property with that ID" });
        return;
      } else res.status(200).json(property);
    })
    .catch(err => res.status(500).json(err));
});

// Add a property

router.post("/", (req, res) => {
  const newProp = req.body;
  const { ownerName, ownerEmail } = req.body;
  if (!ownerName || !ownerEmail) {
    res
      .status(400)
      .json({ errorMessage: "The owner name and email are required" });
    return;
  }
  db.insert(newProp)
    .into("properties")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});

// Delete a property

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("properties")
    .where({ id })
    .del()
    .then(count => {
      if (count === 0) {
        res
          .status(404)
          .json({ message: "Cannot delete property that does not exist." });
        return;
      }
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
