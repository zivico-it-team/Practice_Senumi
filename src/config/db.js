const mysql = require('mysql2');
require('dotenv').config();

// MySQL Connection Pool එක සෑදීම
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Promises භාවිතා කළ හැකි පරිදි export කිරීම
module.exports = pool.promise();