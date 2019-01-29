const express = require('express');
const db = require('../db/dbConfig');
const router = express.Router();
const axios = require('axios');

router.use(express.json());

/* frontend makes a post to /api/stripe-connect with stripe auth code, backend makes a post to stripes oauth token url
and passes in the auth code received from the frontend post request */
router.post('/', (req, res) => {
  const { uid } = req.body;
  axios
    .post('https://connect.stripe.com/oauth/token', {
      grant_type: 'authorization_code',
      client_id: process.env.STRIPE_CLIENT_ID,
      client_secret: process.env.STRIPE_SECRET_KEY,
      code: req.body.computedCode,
    }) // stripes response object is an object called data, here we pull off the stripe_user_id provided
    .then(response => {
      const { stripe_user_id } = response.data;
      // store the stripe_user_id provided in an object formatted for insertion into DB - we could use desructuring here but in this case it not as readable
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

// retrieve the stripe user id from the owner to determine if owner has connect stripe account
router.get('/', (req, res) => {
  const { uid } = req.body;
  db('owners')
    .select('owners.stripe_user_id', 'owners.owner_uid')
    .where('owners.owner_uid', uid)
    .then(stripeUID => {
      console.log('Stripe', stripeUID[0].stripe_user_id);
      if (!stripeUID[0].stripe_user_id) {
        res.status(200).json({ hasStripeID: false });
      } else res.status(200).json({ hasStripeID: true });
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;
