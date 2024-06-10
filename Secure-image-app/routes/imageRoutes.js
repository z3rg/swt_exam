const express = require('express');
const auth = require('../middleware/auth');
const imageUpload = require('../middleware/imageUpload');
const Image = require('../models/Image');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.post('/upload', auth, imageUpload.single('image'), async (req, res, next) => {
  try {
    const image = await Image.create(req.user.userId, req.file.path);
    res.send({ message: 'Image uploaded successfully' });
  } catch (error) {
    res.status(400).send({ error: 'Image upload failed' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const images = await Image.findByUserId(req.user.userId);
    res.send(images);
  } catch (error) {
    res.status(400).send({ error: 'Failed to retrieve images' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const image = await Image.deleteById(req.params.id, req.user.userId);
    if (!image.affectedRows) {
      return res.status(404).send({ error: 'Image not found' });
    }
    const imagePath = path.join(__dirname, '..', 'uploads', imagePath); 
    fs.unlinkSync(imagePath); 
    res.send({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(400).send({ error: 'Failed to delete image' });
  }
});

module.exports = router;
