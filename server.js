const express = require('express');
const helmet = require('helmet');
const server = express();
const cors = require('cors');
const morgan = require('morgan');
var twilio = require('twilio');
const dotenv = require('dotenv');
dotenv.load();

//====TWILIO CODE==============================
var accountSid = process.env.twilio_accountSid; // Your Account SID from www.twilio.com/console
var authToken = process.env.twilio_authToken; // Your Account token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan());

//==== Firebase Admin ====
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url:
      process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  }),
  databaseURL: process.env.FIREBASE_DB_URL,
});

// Verify the Firebase token
server.use(async (req, res) => {
  const idToken = req.headers.authorization;

  // Unprotect this route for testing
  if (req.path == '/anyRoute') {
    return req.next();
  }

  try {
    await admin
      .auth()
      .verifyIdToken(idToken)
      .then(decodedToken => {
        req.body.uid = decodedToken.uid;
        return req.next();
      });
  } catch (e) {
    return res.status(401).send('You are not authorized!');
  }
});

//==== ROUTES ====
const usersRoutes = require('./routes/usersRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const workOrderRoutes = require('./routes/workOrderRoutes');
const tenantRoutes = require('./routes/tenantRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const tenantDash = require('./routes/tenantDashboard');

server.use('/api/users', usersRoutes);
server.use('/api/properties', propertyRoutes);
server.use('/api/work-orders', workOrderRoutes);
server.use('/api/tenants', tenantRoutes);
server.use('/api/payments', paymentRoutes);
server.use('/api/tenant-dash', tenantDash);

//==== TESTING STRIPE CONNECT ====
server.get('/anyRoute', (req, res) => {
  console.log(req);
});

//==== TESTING API END POINT ====
server.get('/', (req, res) => {
  res.send('API Running...');
});
//======TWILO TEXT CODE============
server.get('/text', (req, res) => {
  const { receiver, text } = req.query;
  //sends the texts to number
  client.messages
    .create({
      body: 'Work order status updated',
      to: '+13123207318', // Text this number
      from: '+12245058863', // From a valid Twilio number
    })
    .then(message => console.log(message.sid))
    .done();
});

// server.post('/verify', (req, res) => {});
module.exports = server;
