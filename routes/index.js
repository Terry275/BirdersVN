const express = require('express');
const router = express.Router();
const Photo = require('../models/photo');

// Home route
router.get('/', (req, res) => {
  res.render('index');
});

// Gallery route
router.get('/gallery', async (req, res) => {
  const photos = await Photo.find();
  res.render('gallery', { photos });
});

// About route
router.get('/about', (req, res) => {
  res.render('about');
});

// Dev route
router.get('/dev', (req, res) => {
  res.render('dev/main');
});

module.exports = router;
