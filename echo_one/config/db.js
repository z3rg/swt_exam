// config/db.js
const mysql = require('mysql2');

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'secure_image_app'
});

dbConnection.connect((err) => {
    if (err) {
        console.error('Database connection failed: ', err);
    } else {
        console.log('Database connected successfully');
    }
});

module.exports = dbConnection;
