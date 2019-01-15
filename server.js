const express = require("express");
const helmet = require("helmet");
const server = express();
const cors = require("cors");
const morgan = require("morgan");
const db = require("./db/dbConfig");
const faker = require("faker");
var twilio = require('twilio');

//====TWILIO CODE==============================
var accountSid = 'ACe248433955612d15f21279b5c533591a'; // Your Account SID from www.twilio.com/console
var authToken = 'eb38dcd8c7df7d7e93d58f953627ac79';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'Hello from Node',
    to: '+13125040020',  // Text this number
    from: '+13125040020' // From a valid Twilio number
})
.then((message) => console.log(message.sid));

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan());

//==== ROUTES ====
const usersRoutes = require("./routes/usersRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const workOrderRoutes = require("./routes/workOrderRoutes");
const tenantRoutes = require("./routes/tenantRoutes");

server.use("/api/users", usersRoutes);
server.use("/api/properties", propertyRoutes);
server.use("/api/work-orders", workOrderRoutes);
server.use("/api/tenants", tenantRoutes);

//==== TESTING API END POINT ====
server.get("/", (req, res) => {
  res
    .send("API Running...")
    .catch(err =>
      res.status(500).json({ errorMessage: "Data could not be retrieved." })
    );
});


module.exports = server;
