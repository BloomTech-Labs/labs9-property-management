const express = require('express');
const db = require('../db/dbConfig');

const router = express.Router();

router.use(express.json());

// Get the tenant's property info
router.get('/', (req, res) => {
  const { uid } = req.body;

  db('tenants as t')
    .where('tenant_uid', uid)
    .join('house_properties as h', 'h.house_id', 't.house_id')
    .join('users as u', 'u.uid', 't.tenant_uid')
    .select(
      'h.address',
      'h.office_ph',
      'h.maintenance_ph',
      'u.mobile',
      't.house_id',
      't.tenant_id'
    )
    .then(property => {
      res.status(200).json(property);
    })
    .catch(error => res.status(500).json(error));
});

// Manually update tenant house_id in order to test other views that require the house_id info
router.put('/update', (req, res) => {
  const { uid, house_id } = req.body;
  const house = { house_id: house_id };

  db('tenants as t')
    .where('t.tenant_uid', uid)
    .update(house)
    .then(tenant => {
      if (!tenant) {
        res.status(401).json({ message: 'Tenant does not exist' });
        return;
      } else res.status(200).json(tenant);
    })
    .catch(err => console.log('Error:', err));
});

module.exports = router;
