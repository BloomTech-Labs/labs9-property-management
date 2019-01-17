const express = require('express');
const db = require('../db/dbConfig');
const Promise = require('bluebird');

const router = express.Router();

router.use(express.json());

// Get all the properties
router.get('/', (req, res) => {
  db('house_properties')
    .then(properties => {
      res.status(200).json(properties);
    })
    .catch(err =>
      res
        .status(500)
        .json({ errorMessage: 'The properties could not be retrieved.' })
    );
});

// Get the specified property
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('house_properties')
    .where('house_properties.house_id', id)
    .first()
    .then(property => {
      if (!property) {
        res.status(401).json({ message: 'Cannot find property with that ID' });
        return;
      } else res.status(200).json(property);
    })
    .catch(err => res.status(500).json(err));
});

// Add a property
router.post('/', (req, res) => {
  db.insert(req.body)
    .into('properties')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});

// Delete a property
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('house_properties')
    .where({ id })
    .del()
    .then(count => {
      if (count === 0) {
        res
          .status(404)
          .json({ message: 'Cannot delete property that does not exist.' });
        return;
      }
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

// Returns Properties that a specific admin owns
router.get('/admin/:id', (req, res) => {
  const { id } = req.params;
  let results = [];

  db('house_properties')
    .where('owner_id', id)
    .select()
    .then(properties => {
      res.status(200).json(properties);
    })
    .catch(error => res.status(500).json(error));
});

// get properties by owner id with their tenants using bluebird nesting
router.get('/:id/properties/tenants', (req, res) => {
  const { id } = req.params;
  console.log(id);

  db('house_properties as h')
    .join('users', 'user_id', 'h.owner_id')
    .select(
      'h.owner_id',
      'h.house_id',
      'h.address',
      'h.bedrooms',
      'h.max_occupants',
      'h.square_footage',
      'h.year_built',
      'h.house_image_url'
    )
    .where('h.owner_id', id)
    .then(function(rows) {
      const promises = rows.map(function(element) {
        return db
          .table('tenants as t')
          .join('users as u', 't.tenant_id', 'u.user_id')
          .select(
            't.tenant_id',
            'u.first_name as tenant_first_name',
            'u.last_name as tenant_last_name',
            't.get_texts',
            't.get_emails',
            't.leased_start_date',
            't.end_date'
          )
          .where('house_id', element.house_id)
          .then(function(tenantUsers) {
            element['tenants'] = tenantUsers;
            return element;
          });
      });
      return Promise.all(promises);
    })
    .then(function(elements) {
      res.json(elements);
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
