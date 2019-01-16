const express = require("express");
const db = require("../db/dbConfig");

const router = express.Router();

router.use(express.json());

//will place a work order
router.post("/", (req, res) => {
  const required = req.body;
  const { address, description } = req.body;
  if (!address || !description) {
    res
      .status(400)
      .json({ errorMessage: "Please enter adress and description" });
    return;
  }
  db.insert(required)
    .into("work_orders")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});

//will get list of all work orders
router.get("/", (req, res) => {
  db("work_orders")
    .then(work_orders => {
      res.status(200).json(work_orders);
    })
    .catch(err =>
      res
        .status(500)
        .json({ errorMessage: "Work orders could not be retrieved." })
    );
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);

  db("users")
    .where("user_id", id)
    .where("is_admin", 1)
    .join("house_properties", "house_properties.owner_id", "users.user_id")
    .join("work_orders", "work_orders.house_id", "house_properties.house_id")
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
