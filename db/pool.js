const { Pool } = require("pg");
require("dotenv").config();

// Localhost database
module.exports = new Pool({
  host: "localhost",
  user: process.env.USERNAME,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
});
