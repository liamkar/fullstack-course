const mongoose = require('mongoose')

const Blog = mongoose.model('Blog', {
    author: String,
    title: String,
    url: String,
    votes: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [String]
  })

module.exports = Blog