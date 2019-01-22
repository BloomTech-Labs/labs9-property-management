const express = require('express');
const router = express.Router();

router.use(express.json());

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// receive auth code from stripe

// ask for account info via post request to stripes access_token_url: https://connect.stripe.com/oauth/token
