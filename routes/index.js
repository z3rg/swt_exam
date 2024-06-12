// routes/index.js
const express = require('express');
const router = express.Router();
const path = require('path');

// Route to serve the index.html
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

// Route to serve the register.html
router.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/register.html'));
});

// Route to serve the login.html
router.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

// Route to serve the gallery.html
router.get('/gallery.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/gallery.html'));
});

// Route to serve the gallery.html
router.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/gallery.html'));
});

module.exports = router;
