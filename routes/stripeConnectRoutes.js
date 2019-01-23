const express = require('express');
const router = express.Router();
const axios = require('axios');

router.use(express.json());

// receive auth code from stripe from the redirect url (route on our server that will be receiving the code from stripe)
router.post('/', (req, res) => {
  console.log(req.body, 'UID');
  axios
    .post('https://connect.stripe.com/oauth/token', {
      grant_type: 'authorization_code',
      client_id: process.env.STRIPE_CLIENT_ID,
      client_secret: process.env.STRIPE_SECRET_KEY,
      code: req.body.computedCode,
    })
    .then(response => console.log('RESPONSE:', response))
    .catch(err => console.log('ERROR:', err));
});

// ask for account info via post request to stripes access_token_url: https://connect.stripe.com/oauth/token

module.exports = router;
