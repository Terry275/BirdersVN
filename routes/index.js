// routes/index.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Photo = require('../models/photo');
const fs = require('fs');
const Article = require('../models/article'); 

// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Home route
router.get('/', async (req, res) => {
  try {
    // Fetch distinct categories and sub-categories
    const categories = await Photo.aggregate([
      {
        $group: {
          _id: '$category',
          subCategories: { $addToSet: '$subCategory' }
        }
      }
    ]);

    // Fetch a few example photos for each category
    const photosVietnam = await Photo.find({ category: 'Chim Việt Nam' }).limit(12);
    const photosWorld = await Photo.find({ category: 'Chim Thế Giới' }).limit(12);
    const photosAll = await Photo.find().limit(12); // General photo gallery

    // Fetch articles for the sidebar
    const articles = await Article.find();

    res.render('index', { categories, photosVietnam, photosWorld, photosAll, articles });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Gallery route
router.get('/gallery', async (req, res) => {
  let filter = {};
  let category = 'All Photos';
  let subCategory = '';

  if (req.query.category) {
    filter.category = req.query.category;
    category = req.query.category;
  }
  if (req.query.subCategory) {
    filter.subCategory = req.query.subCategory;
    subCategory = req.query.subCategory;
  }

  const photos = await Photo.find(filter);
  res.render('gallery', { photos, category, subCategory });
});


// About route
router.get('/about', (req, res) => {
  res.render('about');
});


// Dev route
router.get('/dev', async (req, res) => {
  try {
    const categories = await Photo.aggregate([
      { $group: { _id: '$category', subCategories: { $addToSet: '$subCategory' } } }
    ]);

    res.render('dev/main', { categories });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/admin', async (req, res) => {
  const categories = await Category.find().exec();
  const articles = await Article.find().exec();
  res.render('dev/main', { categories, articles });
});


// Route to handle adding a category
router.post('/add-category', async (req, res) => {
  try {
    const { category, subCategory } = req.body;

    const existingCategory = await Photo.aggregate([
      { $match: { category: category } },
      { $group: { _id: '$category', subCategories: { $addToSet: '$subCategory' } } }
    ]);

    if (existingCategory.length > 0) {
      await Photo.updateMany({ category: category }, { $addToSet: { subCategory: subCategory } });
    } else {
      await new Photo({ category: category, subCategory: subCategory }).save();
    }

    res.redirect('/dev');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Route to handle image uploads
router.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    const imageBase64 = req.file.buffer.toString('base64');
    const { title, alttitle, category, subCategory } = req.body;

    const newPhoto = new Photo({
      title,
      alttitle,
      imageBase64,
      category,
      subCategory
    });

    await newPhoto.save();
    res.redirect('/dev');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Route to handle adding an article link
router.post('/add-article', async (req, res) => {
  try {
    const { title, url } = req.body;

    const newArticle = new Article({
      title,
      url
    });

    await newArticle.save();
    res.redirect('/dev');
  } catch (err) {
    res.status(500).send(err.message);
  }
});


module.exports = router;
