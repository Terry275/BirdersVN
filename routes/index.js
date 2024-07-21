const express = require('express');
const router = express.Router();
const multer = require('multer');
const Photo = require('../models/photo');
const Article = require('../models/article');

// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Home route
router.get('/', async (req, res) => {
  try {
    const categories = await Photo.aggregate([
      { $group: { _id: '$category', subCategories: { $addToSet: '$subCategory' } } }
    ]);

    const photosVietnam = await Photo.find({ category: 'Chim Việt Nam' }).limit(12);
    const photosWorld = await Photo.find({ category: 'Chim Thế Giới' }).limit(12);
    const photosAll = await Photo.find().limit(12);

    const articles = await Article.find();

    res.render('index', { 
      categories, 
      photosVietnam, 
      photosWorld, 
      photosAll, 
      articles, 
      category: null,  // Add category as null or any default value
      subCategory: null  // Add subCategory as null or any default value
    });
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
    const articles = await Article.find();
    const photosAll = await Photo.find().limit(12); // Fetch photos for demonstration

    res.render('dev/main', { categories, articles, photosAll });
  } catch (err) {
    console.error('Error fetching dev data:', err.message);
    res.status(500).render('error', { message: err.message });
  }
});


// routes/index.js

router.post('/add-category', async (req, res) => {
  try {
    const { category, subCategory } = req.body;

    // Check if the category already exists
    const existingCategory = await Photo.findOne({ category });

    if (existingCategory) {
      // Ensure subCategory is always an array
      if (!Array.isArray(existingCategory.subCategory)) {
        existingCategory.subCategory = [existingCategory.subCategory];
      }
      if (!existingCategory.subCategory.includes(subCategory)) {
        existingCategory.subCategory.push(subCategory);
      }
      await existingCategory.save();
    } else {
      await new Photo({ category, subCategory: [subCategory] }).save();
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
