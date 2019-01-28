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

/* REFERENCE CODE https://stripe.com/docs/connect/direct-charges#collecting-fees
  stripe.charges.create({
  amount: 1000,
  currency: "usd",
  source: "tok_visa",
  application_fee: 123,
}, {
  stripe_account: "{CONNECTED_STRIPE_ACCOUNT_ID}",
}).then(function(charge) {
  // asynchronously called
});

Object.assign({}, someOb, { hey: 'sup'})
vs
{...someOb, hey: 'sup'}
*/

router.post('/', (req, res) => {
  // here we also need to make some db queries to get the associated owner stripe ID
  // see above reference code about passing the connected stripe account id
  // req will contain uid of tenant
  // select from houses table where
  const { uid } = req.body;
  db('tenants as t')
    .where('t.tenant_uid', uid)
    .join('house_properties as h', 'h.house_id', 't.house_id')
    .join('owners as o', 'o.owner_uid', 'h.owner_uid')
    .select('o.owner_uid', 'o.stripe_user_id')
    .then(stripeID => {
      console.log(stripeID);
    });
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd',
  };
  stripe.charges.create(body, stripeChargeCallback(res));
});

module.exports = router;
