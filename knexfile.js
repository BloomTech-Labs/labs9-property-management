// Update with your config settings.
require("dotenv").config();
const localPg = {
  host: "localhost",
  database: "propmgmt",
  user: process.env.USER,
  password: process.env.PASSWORD
};

const dbConnection = process.env.DATABASE_URL || localPg;

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./db/propmgmt.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./db/migrations"
    }
  },

  production: {
    client: "pg",
    connection: dbConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./db/migrations"
    },
    useNullAsDefault: true
  }
};
