const mongoose = require('mongoose')

const Blog = mongoose.model('Blog', {
    author: String,
    title: String,
    url: String,
    votes: Number
  })

module.exports = Blog