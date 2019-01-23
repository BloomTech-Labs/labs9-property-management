const express = require('express');
const router = express.Router();

router.use(express.json());

// receive auth code from stripe from the redirect url (route on our server that will be receiving the code from stripe)
router.get('/', (req, res) => {
  console.log(req.body);
});

// ask for account info via post request to stripes access_token_url: https://connect.stripe.com/oauth/token

module.exports = router;
