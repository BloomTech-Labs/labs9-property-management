const express = require('express');
const db = require('../db/dbConfig');
const Promise = require('bluebird');

const router = express.Router();

router.use(express.json());

// Place a work order
router.post('/', (req, res) => {
  // const required = req.body;
  const {
    description,
    property_access,
    tenant_id,
    house_id,
    work_order_status,
    work_order_image,
  } = req.body;
  const workOrder = {
    description: description,
    property_access: property_access,
    tenant_id: tenant_id,
    house_id: house_id,
    work_order_image: work_order_image,
    work_order_status: work_order_status,
  };
  if (!description) {
    res
      .status(400)
      .json({ errorMessage: 'Please enter address and description' });
    return;
  }
  db.insert(workOrder)
    .into('work_orders')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});

// Get list of all work orders
router.get('/', (req, res) => {
  db('work_orders')
    .then(work_orders => {
      res.status(200).json(work_orders);
    })
    .catch(err =>
      res
        .status(500)
        .json({ errorMessage: 'Work orders could not be retrieved.' })
    );
});

// Returns all work orders for the owner
router.get('/owner', (req, res) => {
  const { uid } = req.body;

  db('house_properties as h')
    .join('owners as o', 'o.owner_uid', 'h.owner_uid')
    .where('o.owner_uid', uid)
    .join('work_orders as w', 'w.house_id', 'h.house_id')
    .join('users as u', 'u.uid', 'h.owner_uid')
    .select(
      'h.address',
      'w.description',
      'property_access',
      'work_order_status',
      'u.mobile',
      'w.work_order_id',
      'w.work_order_image'
    )
    .then(orders => {
      res.status(200).json({ orders });
    })
    .catch(error => res.status(500).json(error));
});

// Returns all work orders for the tenant maintenance view
router.get('/maintenance', (req, res) => {
  const { uid } = req.body;

  db('work_orders as w')
    .join('tenants as t', 't.tenant_id', 'w.tenant_id')
    .where('t.tenant_uid', uid)
    .join('house_properties as h', 'h.house_id', 'w.house_id')
    .select(
      'w.work_order_id',
      'w.description',
      'w.work_order_status',
      'h.property_name'
    )
    .then(orders => {
      res.status(200).json({ orders });
    })
    .catch(error => res.status(500).json(error));
});

// update the status of a work order
router.put('/update', (req, res) => {
  const { work_order_id, work_order_status } = req.body;
  const status = { work_order_status: work_order_status };
  db('work_orders as w')
    .where('w.work_order_id', work_order_id)
    .update(status)
    .then(order => {
      if (!order) {
        res.status(401).json({ message: 'Work order does not exist' });
        return;
      } else res.status(200).json(order);
    })
    .catch(err => {
      console.log('Error: ', err);
      res.status(500).json(err);
    });
});

// Retrieve all workorders for a given owner organized by property
router.get('/:id/workOrdersByProp', (req, res) => {
  const { id } = req.params;
  console.log(id);

  db('house_properties as h')
    .join('users as u', 'u.user_id', 'h.owner_id')
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
    .where({ 'h.owner_id': id })
    .then(function(rows) {
      const promises = rows.map(function(element) {
        return db
          .table('work_orders as w')
          .join('users as u', 'w.tenant_id', 'u.user_id')
          .select(
            'w.work_order_id',
            'u.first_name as tenant_name',
            'u.last_name as tenant_last_name',
            'u.mobile',
            'w.description as work_order_description',
            'w.property_access',
            'w.work_order_status',
            'w.work_order_image'
          )
          .where('house_id', element.house_id)
          .then(function(workOrders) {
            element['work_orders'] = workOrders;
            return element;
          });
      });
      return Promise.all(promises);
    })
    .then(function(elements) {
      res.json(elements);
    })
    .catch(err =>
      res
        .status(500)
        .send({ errorMessage: 'Access denied: You are not an admin!' })
    );
});

module.exports = router;
