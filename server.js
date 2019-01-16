const express = require("express");
const helmet = require("helmet");
const server = express();
const cors = require("cors");
const morgan = require("morgan");
const db = require("./db/dbConfig");
const faker = require("faker");
var twilio = require("twilio");
const dotenv = require("dotenv");
dotenv.load();

//====TWILIO CODE==============================
var accountSid = process.env.twilio_accountSid; // Your Account SID from www.twilio.com/console
var authToken = process.env.twilio_authToken; // Your Account token from www.twilio.com/console

var twilio = require("twilio");
var client = new twilio(accountSid, authToken);

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan());

//==== ROUTES ====
const usersRoutes = require("./routes/usersRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const workOrderRoutes = require("./routes/workOrderRoutes");
const tenantRoutes = require("./routes/tenantRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

server.use("/api/users", usersRoutes);
server.use("/api/properties", propertyRoutes);
server.use("/api/work-orders", workOrderRoutes);
server.use("/api/tenants", tenantRoutes);
server.use("/api/payments", paymentRoutes);

//==== TESTING API END POINT ====
server.get("/", (req, res) => {
  res
    .send("API Running...")
    .catch(err =>
      res.status(500).json({ errorMessage: "Data could not be retrieved." })
    );
});

server.get("/text", (req, res) => {

  const { receiver, text} = req.query;
  //sends the texts to number
  client.messages
    .create({
      body: "Work order status updated",
      to: "+13123207318", // Text this number
      from: "+12245058863" // From a valid Twilio number
    })
    .then(message => console.log(message.sid))
    .done();
});

module.exports = server;
