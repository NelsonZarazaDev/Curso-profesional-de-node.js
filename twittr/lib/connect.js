var mysql = require("mysql2");
const config = require("../config");

var connection = mysql.createConnection({
  host: config.DBHOST,
  user: config.DBUSER,
  password: config.DBPASSWORD,
  database: config.DATABASE,
});

console.log("Connected to database");

module.exports = connection;
