const express = require('express');
const db = require('../db/dbConfig');
const router = express.Router();
const axios = require('axios');

router.use(express.json());

// receive auth code from stripe from the redirect url (route on our server that will be receiving the code from stripe)
router.post('/', (req, res) => {
  const { uid } = req.body;
  axios
    .post('https://connect.stripe.com/oauth/token', {
      grant_type: 'authorization_code',
      client_id: process.env.STRIPE_CLIENT_ID,
      client_secret: process.env.STRIPE_SECRET_KEY,
      code: req.body.computedCode,
    })
    .then(response => {
      const { stripe_user_id } = response.data;
      const stripe_info = { stripe_user_id: stripe_user_id };
      /*console.log('RESPONSE:', response.data, req.body.uid)*/
      db.insert(stripe_info)
        .into('owners')
        .where('owners.owner_uid', uid)
        .then(owner => {
          if (!owner) {
            res.status(401).json({ message: 'Owner does not exist' });
            return;
          } else res.status(200).json(owner);
        });
    })
    .catch(err => console.log('ERROR:', err));
});

// ask for account info via post request to stripes access_token_url: https://connect.stripe.com/oauth/token

module.exports = router;
