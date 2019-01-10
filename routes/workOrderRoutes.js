const express = require("express");
const db = require("../db/dbConfig");

const router = express.Router();

router.use(express.json());

//will place a work order

router.post("/work_orders", (req, res) => {
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

router.get("/work_orders", (req, res) => {
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

  module.exports = router;