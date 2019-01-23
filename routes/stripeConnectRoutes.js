const express = require('express');
const db = require('../db/dbConfig');
const router = express.Router();
const axios = require('axios');

router.use(express.json());

// frontend makes a post to /api/stripe-connect with stripe auth code, backend makes a post to stripes oauth token url
// and passes in the auth code received from the frontend post request
router.post('/', (req, res) => {
  const { uid } = req.body;
  axios
    .post('https://connect.stripe.com/oauth/token', {
      grant_type: 'authorization_code',
      client_id: process.env.STRIPE_CLIENT_ID,
      client_secret: process.env.STRIPE_SECRET_KEY,
      code: req.body.computedCode,
    }) // stripes response object is an object called data, here we pull of the stripe_user_id provided
    .then(response => {
      const { stripe_user_id } = response.data;
      // store the stripe_user_id provided in an object formatted for insertion into DB
      const stripe_info = { stripe_user_id: stripe_user_id };
      // get the owners table and the right owner, then pass in stripe_info object
      db('owners')
        .where('owners.owner_uid', uid)
        .update(stripe_info)
        .then(owner => {
          if (!owner) {
            res.status(401).json({ message: 'Owner does not exist' });
            return;
          } else res.status(200).json(owner);
        });
    })
    .catch(err => console.log('ERROR:', err));
});

module.exports = router;
