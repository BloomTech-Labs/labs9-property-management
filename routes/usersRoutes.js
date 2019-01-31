const express = require('express');
const db = require('../db/dbConfig');

const router = express.Router();

// Check if user exists in DB and return their role
router.get('/verifyregistration', (req, res) => {
  const { uid } = req.body;

  db('users')
    .where({ uid: uid })
    .then(users => {
      if (!users[0]) {
        res.status(200).json({ role: null });
      } else {
        res.status(200).json({ role: users[0].role });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
});

// Register user
router.post('/register', (req, res) => {
  const data = req.body;
  db.insert(data)
    .into('users')
    .then(id => {
      if (data.role === 'owner') {
        db.insert({ owner_uid: data.uid })
          .into('owners')
          .then(data => {
            console.log('Owner registered');
          });
        res.status(201).json(id);
      } else {
        db.insert({ tenant_uid: data.uid })
          .into('tenants')
          .then(data => {
            console.log('Tenant registered');
          });
        res.status(201).json(id);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'Could not register the user!' });
    });
});

// Retrieve the tenants under an owner
router.get('/tenants', (req, res) => {
  const { uid } = req.body;

  db('users as u')
    .join('tenants as t', 'u.uid', 't.tenant_uid')
    .join('house_properties as h', 't.house_id', 'h.house_id')
    .where('h.owner_uid', uid)
    .select(
      't.tenant_id',
      'u.display_name',
      'h.property_name',
      't.lease_start_date',
      't.lease_end_date'
    )
    .then(results => {
      res.status(200).json(results);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get all owners in owners table
router.get('/owners', (req, res) => {
  db('owners')
    .select()
    .then(results => {
      res.status(200).json(results);
    });
});

module.exports = router;
