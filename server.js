const express = require("express");
const helmet = require("helmet");
const server = express();
const cors = require("cors");
const morgan = require("morgan");
const db = require("./db/dbConfig");
const faker = require("faker");

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
