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
  db.insert(req.body)
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

// Returns Properties that a specific admin owns
router.get("/admin/:id", (req, res) => {
  const { id } = req.params;
  let results = [];

  db("properties")
    .where("owner_id", id)
    .select()
    .then(properties => {
      res.status(200).json(properties);
    })
    .catch(error => res.status(500).json(error));
});

router.get("/:id/tenants", (req, res) => {
  const { id } = req.params;
  console.log(id);
  db("users")
    .innerJoin("properties", "properties.id", "users.property_id")
    .where("properties.id", id)
    .select("users.first_name", "users.last_name", "users.mobile")
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => res.status(500).json(error));
});

// get properties by owner id with their tenants

router.get("/:id/proptens", (req, res) => {
  const { id } = req.params;
  db("house_properties")
    .where("owner_id", id)
    .join("tenants", "house_properties.house_id", "tenants.house_id")
    .join("users", "tenants.tenant_id", "users.user_id")
    .select(
      "house_properties.address",
      "users.last_name",
      "house_properties.house_id",
      "house_properties.owner_id"
    )
    .then(properties => {
      res.status(200).json(properties);
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;
