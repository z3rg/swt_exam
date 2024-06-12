// controllers/userController.js
const userModel = require('../models/user');
const imageModel = require('../models/image');
const jwt = require('jsonwebtoken');
const config = require('../config');
const fs = require('fs');
const path = require('path');

async function register(req, res) {
    const { username, email, password } = req.body;
    try {
        const user = await userModel.findUserByUsername(username);
        if (user) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        await userModel.registerUser(username, email, password);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function login(req, res) {
    const { username, password } = req.body;
    try {
        const user = await userModel.findUserByUsername(username);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await userModel.verifyPassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function getGallery(req, res) {
    try {
        const images = await imageModel.getImagesByUserId(req.user.id);
        res.json(images);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function uploadImage(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        await imageModel.uploadImage(req.user.id, req.file.filename);
        res.status(201).json({ message: 'File uploaded successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function deleteImage(req, res) {
    const { imageId } = req.params;
    try {
        await imageModel.deleteImageById(imageId, req.user.id);
        res.json({ message: 'File deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function getImage(req, res) {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../uploads', filename);
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ message: 'File not found' });
        }
        res.sendFile(filePath);
    });
}

module.exports = {
    register,
    login,
    getGallery,
    uploadImage,
    deleteImage,
    getImage
};
