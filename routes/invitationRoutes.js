const express = require('express');
const db = require('../db/dbConfig');
const Promise = require('bluebird');

const router = express.Router();

router.use(express.json());

// Invitation is created by owner
router.post('/admin', (req, res) => {
  const { email, lease_start_date, lease_end_date, uid, house_id } = req.body;

  const invitation = {
    lease_start_date: lease_start_date,
    lease_end_date: lease_end_date,
    owner_uid: uid,
    house_id: house_id,
  };

  console.log('req', req.body);
  db('tenants as t')
    .join('users as u', 't.tenant_uid', 'u.uid')
    .where('u.email', email)
    .select('t.tenant_uid')
    .then(data => {
      invitation.tenant_uid = data[0].tenant_uid;

      db.insert(invitation)
        .into('invitations')
        .then(response => {
          res.status(201).json(response[0]);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: 'error' });
    });
});

// Owner recieves pending invitations
router.get('/admin', (req, res) => {
  db('invitations as i')
    .where('i.owner_uid', req.body.uid)
    .join('tenants as t', 'i.tenant_uid', 't.tenant_uid')
    .join('users', 't.tenant_uid', 'users.uid')
    .join('house_properties as h', 'i.house_id', 'h.house_id')
    .select(
      'i.id',
      'users.email',
      'i.lease_start_date',
      'i.lease_end_date',
      'h.property_name'
    )
    .then(data => {
      console.log(data);
      res.status(200).json(data);
    });
});

// Tenant recieves invites from owners
router.get('/tenant', (req, res) => {
  db('invitations as i')
    .where('i.tenant_uid', req.body.uid)
    .join('owners as o', 'i.owner_uid', 'o.owner_uid')
    .join('users', 'o.owner_uid', 'users.uid')
    .join('house_properties as h', 'i.house_id', 'h.house_id')
    .select(
      'i.id',
      'users.display_name',
      'i.lease_start_date',
      'i.lease_end_date',
      'h.property_name'
    )
    .then(data => {
      console.log(data);
      res.status(200).json(data);
    });
});

module.exports = router;
