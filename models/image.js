// models/image.js
const dbConnection = require('../config/db');

async function uploadImage(userId, filename) {
    const sql = 'INSERT INTO images (user_id, filename) VALUES (?, ?)';
    return new Promise((resolve, reject) => {
        dbConnection.query(sql, [userId, filename], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

async function getImagesByUserId(userId) {
    const sql = 'SELECT * FROM images WHERE user_id = ?';
    return new Promise((resolve, reject) => {
        dbConnection.query(sql, [userId], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

async function deleteImageById(imageId, userId) {
    const sql = 'DELETE FROM images WHERE id = ? AND user_id = ?';
    return new Promise((resolve, reject) => {
        dbConnection.query(sql, [imageId, userId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = {
    uploadImage,
    getImagesByUserId,
    deleteImageById
};
