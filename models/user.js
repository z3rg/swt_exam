// models/user.js
const dbConnection = require('../config/db');
const bcrypt = require('bcryptjs');

async function registerUser(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    return new Promise((resolve, reject) => {
        dbConnection.query(sql, [username, email, hashedPassword], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

async function findUserByUsername(username) {
    const sql = 'SELECT * FROM users WHERE username = ?';
    return new Promise((resolve, reject) => {
        dbConnection.query(sql, [username], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result[0]);
            }
        });
    });
}

async function verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
    registerUser,
    findUserByUsername,
    verifyPassword
};
