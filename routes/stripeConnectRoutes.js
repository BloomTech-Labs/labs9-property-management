const express = require('express');
const router = express.Router();

router.use(express.json());

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
