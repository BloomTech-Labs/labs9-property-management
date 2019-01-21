const express = require('express');
const db = require('../db/dbConfig');

const router = express.Router();

// Check if user exists in DB and return their role
router.get('/verifyregistration', (req, res) => {
  const { uid } = req.body;

  db('users')
    .where({ uid: uid })
    .then(users => {
      console.log(users);
      if (!users[0]) {
        res.status(200).json({ role: null });
      } else {
        res.status(200).json({ role: users[0].role });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// Register user
router.post('/register', (req, res) => {
  console.log(req.body);
  const creds = req.body;
  db.insert(creds)
    .into('users')
    .then(id => {
      console.log(id);
      res.status(201).json(id);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'Could not register the user!' });
    });
});

// Basic Login User
router.post('/login', (req, res) => {
  const creds = req.body;
  db('users')
    .where({ email: creds.email, password: creds.password })
    .first()
    .then(user => {
      if (user) {
        // returning user information
        res.status(200).send(user);
      } else {
        res.status(401).json({ errorMessage: 'Wrong credentials!' });
      }
    })
    .catch(err => res.status(500).send(err));
});

// Admin Settings info
router.get('/:id/settings', (req, res) => {
  const { id } = req.params;
  db('users as u')
    .where('u.user_id', id)
    .select('u.first_name', 'u.last_name', 'u.email', 'u.mobile')
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
