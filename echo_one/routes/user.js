// routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const imageUpload = require('../middleware/imageUpload');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/gallery', auth, userController.getGallery);
router.post('/upload', auth, imageUpload.single('image'), userController.uploadImage);
router.delete('/delete/:imageId', auth, userController.deleteImage);
router.get('/image/:filename', auth, userController.getImage);

module.exports = router;
