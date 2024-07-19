// models/photo.js
const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  title: String,
  alttitle: String,
  imageBase64: String, // Store the image as a Base64 string
  category: String,
  subCategory: String
});

module.exports = mongoose.model('Photo', photoSchema);