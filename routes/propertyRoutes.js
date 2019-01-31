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

// Add a property: Called by owners
router.post('/', (req, res) => {
  const {
    property_name,
    address,
    city,
    state,
    zip_code,
    bedrooms,
    bathrooms,
    max_occupants,
    square_footage,
    year_built,
    office_ph,
    maintenance_ph,
    // owner_id,  // ====== USING FOR TESTING
    uid, // <-- This is not supposed to be owner_uid!
  } = req.body;

  const property = {
    property_name: property_name,
    address: address,
    city: city,
    state: state,
    zip_code: zip_code,
    bedrooms: bedrooms,
    bathrooms: bathrooms,
    max_occupants: max_occupants,
    square_footage: square_footage,
    year_built: year_built,
    office_ph: office_ph,
    maintenance_ph: maintenance_ph,
    // owner_id: owner_id,  // ====== USING FOR TESTING
    owner_uid: uid,
  };

  db.insert(property)
    .into('house_properties')
    .then(id => {
      console.log('POST property result: ', id[0]);
      res.status(201).json(id);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete a property
router.delete('/:house_id', (req, res) => {
  const { house_id } = req.params;

  db('house_properties')
    .where('house_id', house_id)
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
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Returns Properties that a specific admin owns
router.get('/admin', (req, res) => {
  const { uid } = req.body;

  db('house_properties as h')
    .join('owners as o', 'o.owner_uid', 'h.owner_uid')
    .select('h.property_name', 'h.house_id')
    .where('o.owner_uid', uid)
    .then(properties => {
      res.status(200).json({ properties });
    })
    .catch(error => res.status(500).json(error));
});

// get properties that an admin owns along with tenants using bluebird nesting
router.get('/admin/alldata', (req, res) => {
  const { uid } = req.body;

  db('house_properties as h')
    .join('owners as o', 'o.owner_uid', 'h.owner_uid')
    .select(
      'h.property_name',
      'h.house_id',
      'h.address',
      'h.city',
      'h.state',
      'h.zip_code',
      'h.bedrooms',
      'h.max_occupants',
      'h.square_footage',
      'h.year_built',
      'h.maintenance_ph',
      'h.office_ph'
    )
    .where('o.owner_uid', uid)
    .then(function(rows) {
      const promises = rows.map(function(element) {
        return db
          .table('tenants as t')
          .join('users as u', 't.tenant_uid', 'u.uid')
          .select('u.display_name', 't.lease_start_date', 't.lease_end_date')
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
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

module.exports = router;
