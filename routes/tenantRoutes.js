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

// ====== get tenant info for dashboard view ======
router.get('/dashboard', (req, res) => {
  const { uid } = req.body;
  console.log('Tenant UID', uid);

  db('tenants as t')
    .join('house_properties as h', 'h.house_id', 't.house_id')
    .join('users as u', 'h.owner_uid', 'u.owner_uid')
    .select(
      'h.address',
      'h.city',
      'h.state',
      'h.zip_code',
      'u.email',
      'h.office_ph',
      'h.maintenance_ph'
    )
    .where('t,tenant_uid', uid)
    .then(tenantInfo => {
      res.status(200).json(tenantInfo);
    })
    .catch(err =>
      res.status(500).json({ errorMessage: 'Could not retrieved data.' })
    );
});

// ====== get tenant info for Tenant Maintenance View ======
router.get('/maintenanceView', (req, res) => {
  const { uid } = req.body;
  console.log('Tenant UID', uid);

  db('tenants as t')
    .join('house_properties as h', 'h.house_id', 't.house_id')
    .select(
      'h.address',
      'h.city',
      'h.state',
      'h.zip_code',
      'h.office_ph',
      'h.maintenance_ph'
    )
    .where('t.tenant_uid', uid)
    .then(tenantInfo => {
      res.status(200).json(tenantInfo);
    })
    .catch(err =>
      res.status(500).json({ errorMessage: 'Could not retrieved data.' })
    );
});

module.exports = router;
