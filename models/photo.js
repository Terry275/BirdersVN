// models/photo.js
const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  title: String,
  alttitle: String,
  imageUrl: String,
  category: String,
  subCategory: String
});

module.exports = mongoose.model('Photo', photoSchema);
