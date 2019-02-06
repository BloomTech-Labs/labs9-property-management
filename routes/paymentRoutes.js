const express = require('express');
const db = require('../db/dbConfig');
const router = express.Router();

router.use(express.json());

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const stripeChargeCallback = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
};

router.get('/', (req, res) => {
  res.send({
    message: 'Hello Stripe checkout server!',
    timestamp: new Date().toISOString(),
  });
});

router.post('/', (req, res) => {
  // here we also need to make some db queries to get the associated owner stripe ID
  // see above reference code about passing the connected stripe account id
  const { uid } = req.body;
  db('tenants as t')
    .where('t.tenant_uid', uid)
    .join('house_properties as h', 'h.house_id', 't.house_id')
    .join('owners as o', 'o.owner_uid', 'h.owner_uid')
    .select('o.owner_uid', 'o.stripe_user_id')
    .then(stripeUID => {
      stripe.charges.create(
        {
          amount: req.body.amount,
          source: req.body.token.id,
          currency: 'usd',
          source: 'tok_visa',
          application_fee: 1000,
        },
        {
          stripe_account: stripeUID[0].stripe_user_id,
        },
        stripeChargeCallback(res)
      );
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

module.exports = router;
