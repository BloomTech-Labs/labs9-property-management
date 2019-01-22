const express = require('express');
const db = require('../db/dbConfig');

const router = express.Router();

router.use(express.json());

// Get the tenant's property info
router.get('/', (req, res) => {
  const { uid } = req.body;

  db('tenants as t')
    .where('tenant_uid', uid)
    .join('house_properties as h', 'house_id', 't.house_id')
    .select('h.address', 'h.office_ph', 'h.maintenance_ph')
    .then(property => {
      res.status(200).json(property);
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;
