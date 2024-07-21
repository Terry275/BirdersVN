// models/photo.js
const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  title: String,
  alttitle: String,
  imageBase64: String,
  category: String,
  subCategory: [String] // Make this an array
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;