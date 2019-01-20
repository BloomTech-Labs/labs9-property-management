const express = require('express');
const db = require('../db/dbConfig');

const router = express.Router();

// Check if user exists in DB and return their role
router.get('/verifyregistration', (req, res) => {
  const { uid } = req.body;

  db('users')
    .where({ uid: uid })
    .then(user => {
      res.status(200).json({ role: user.role });
    })
    .catch(error => {
      res.status(200).json({ role: null });
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

module.exports = router;
