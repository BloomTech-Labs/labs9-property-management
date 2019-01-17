const express = require('express');
const db = require('../db/dbConfig');

const router = express.Router();

// add a tenant
router.post('/', (req, res) => {
  db.insert(req.body)
    .into('tenants')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});

// get tenants
router.get('/', (req, res) => {
  db('tenants')
    .then(tenants => {
      res.status(200).json(tenants);
    })
    .catch(err =>
      res
        .status(500)
        .json({ errorMessage: 'The tenants could not be retrieved.' })
    );
});

// get specific tenant info
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('tenants')
    .where('tenants.tenant_id', id)
    .join('users', 'user_id', 'tenants.tenant_id')
    .then(tenant => {
      if (!tenant) {
        res.status(401).json({ message: 'Tenant does not exist' });
        return;
      } else res.status(200).json(tenant);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
