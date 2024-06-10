const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'SawitPro',
  password: process.env.DB_PASS || 'SawitPro@2024',
  database: process.env.DB_NAME || 'secure_image_app'
});

module.exports = pool.promise();