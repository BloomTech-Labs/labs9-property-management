const express = require('express');
const helmet = require('helmet');
const server = express();
const cors = require('cors');
const morgan = require('morgan');
const db = require('./db/dbConfig');

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan());

//==== ROUTES ====
const usersRoutes = require('./routes/usersRoutes');
const propertyRoutes = require('./routes/propertyRoutes');

server.use('/api', usersRoutes);
server.use('/api', propertyRoutes);

//==== TESTING API END POINT ====
server.get('/', (req, res) => {
  res
    .send('API Running...')
    .catch(err =>
      res.status(500).json({ errorMessage: 'Data could not be retrieved.' })
    );
});

module.exports = server;
