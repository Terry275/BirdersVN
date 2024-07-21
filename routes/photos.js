const express = require('express');
const router = express.Router();
const Photo = require('../models/photo');

// Get all photos
router.get('/', async (req, res) => {
  try {
    const photos = await Photo.find();
    res.json(photos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new photo
router.post('/', async (req, res) => {
  const photo = new Photo({
    title: req.body.title,
    alttitle: req.body.alttitle,
    imageBase64: req.body.imageBase64,
    category: req.body.category,
    subCategory: req.body.subCategory
  });

  try {
    const newPhoto = await photo.save();
    res.status(201).json(newPhoto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get photos by category and sub-category
router.get('/:category/:subCategory', async (req, res) => {
  try {
    const photos = await Photo.find({
      category: req.params.category,
      subCategory: req.params.subCategory
    });
    res.json(photos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
