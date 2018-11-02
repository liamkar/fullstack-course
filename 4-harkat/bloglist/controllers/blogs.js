const blogsRouter = require('express').Router()

const mongoose = require('mongoose')

const Blog = mongoose.model('Blog', {
  author: String,
  title: String,
  url: String,
  votes: Number
})

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter