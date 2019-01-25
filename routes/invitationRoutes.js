const express = require('express');
const db = require('../db/dbConfig');
const Promise = require('bluebird');

const router = express.Router();

router.use(express.json());

// Invitation is created by owner
router.post('/admin', (req, res) => {
  const { email, lease_start, lease_end, uid, house_id } = req.body;

  const invitation = {
    lease_start_date: lease_start,
    lease_end_date: lease_end,
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
  db('invitations')
    .where('owner_uid', req.body.uid)
    .then(data => {
      console.log(data);
      res.status(200).json(data);
    });
});

module.exports = router;
