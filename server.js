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

server.use("/api", usersRoutes);
server.use("/api", propertyRoutes);
server.use("/api", workOrderRoutes);

//==== TESTING API END POINT ====
server.get("/", (req, res) => {
  res
    .send("API Running...")
    .catch(err =>
      res.status(500).json({ errorMessage: "Data could not be retrieved." })
    );
});

server.post("/fakeruser", (req, res) => {
  const User = {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    mobile: faker.phone.phoneNumber(),
    password: faker.internet.password(),
    user_type: "admin"
  };

  console.log(User);
  db.insert(User)
    .into("users")
    .then(id => {
      console.log("User: " + id);
      res.status(200).json({ message: "User created!" });
    })
    .catch(err =>
      res.status(500).json({ errorMessage: "Error creating users" })
    );
});

server.post("/fakerproperty", (req, res) => {
  const Property = {
    address:
      faker.address.streetAddress() +
      faker.address.city() +
      faker.address.country(),
    bedrooms: faker.random.number({
      min: 1,
      max: 6
    }),
    bathrooms: faker.random.number({
      min: 1,
      max: 4
    }),
    max_occupants: faker.random.number({
      min: 1,
      max: 12
    }),
    square_footage: faker.random.number({
      min: 100,
      max: 1500
    }),
    year_built: faker.random.number({
      min: 1940,
      max: 2019
    }),
    owner_id: faker.random.number({
      min: 1,
      max: 50
    })
  };

  db.insert(Property)
    .into("properties")
    .then(id => {
      console.log("Property: " + id);
      res.status(200).json({ message: "Property created!" });
    })
    .catch(err =>
      res.status(500).json({ errorMessage: "Error creating property" })
    );
});

module.exports = server;
