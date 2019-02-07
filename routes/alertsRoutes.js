const express = require('express');
const db = require('../db/dbConfig');

const router = express.Router();

router.use(express.json());

router.get('/owner', (req, res) => {
  const { uid } = req.body;

  db('alerts')
    .where('uid', uid)
    .then(data => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  const { uid, message, date } = req.body;
  let alert = { message: message, date: date };

  db('tenants as t')
    .join('house_properties as h', 't.house_id', 'h.house_id')
    .join('owners as o', 'h.owner_uid', 'o.owner_uid')
    .where('t.tenant_uid', uid)
    .select('o.owner_uid', 't.')
    .then(data => {
      console.log(data);
      db.insert(alert)
        .into('alerts')
        .then(data => {
          console.log(data);
          res.status(201).json(data);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
