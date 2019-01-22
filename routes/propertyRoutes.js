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

/*// Get the specified property
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
*/

// Add a property: Called by admins
router.post('/', (req, res) => {
  const {
    uid,
    name,
    address,
    bedrooms,
    bathrooms,
    maxOccupants,
    squareFootage,
    yearBuilt,
  } = req.body;

  const property = {
    owner_uid: uid,
    property_name: name,
    address: address,
    bedrooms: bedrooms,
    bathrooms: bathrooms,
    max_occupants: maxOccupants,
    square_footage: squareFootage,
    year_built: yearBuilt,
  };

  db.insert(property)
    .into('house_properties')
    .then(id => {
      console.log('POST property result: ', id[0]);
      res.status(201).json(id);
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
router.get('/admin', (req, res) => {
  const { uid } = req.body;

  db('house_properties')
    .where('owner_uid', uid)
    .select()
    .then(properties => {
      res.status(200).json(properties);
    })
    .catch(error => res.status(500).json(error));
});

// get properties that an admin owns along with tenants using bluebird nesting
router.get('/admin/alldata', (req, res) => {
  const { uid } = req.body;
  console.log(uid);

  db('house_properties as h')
    .join('users', 'uid', 'h.owner_uid')
    .select(
      'h.owner_uid',
      'h.house_id',
      'h.address',
      'h.bedrooms',
      'h.max_occupants',
      'h.square_footage',
      'h.year_built',
      'h.house_image_url'
    )
    .where('h.owner_uid', uid)
    .then(function(rows) {
      const promises = rows.map(function(element) {
        return db
          .table('tenants as t')
          .join('users as u', 't.tenant_id', 'u.uid')
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
