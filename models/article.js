const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  url: String
});

module.exports = mongoose.model('Article', articleSchema);
