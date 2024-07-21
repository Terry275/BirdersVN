const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  _id: String,
  subCategories: [String]
});

module.exports = mongoose.model('Category', categorySchema);
