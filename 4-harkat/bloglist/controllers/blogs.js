const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//old promise version of GET
/*
blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})
*/

//new async await version of the GET
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

//old promise version of the GET
/*
blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})
*/

////new async await version of the POST
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (blog.votes === undefined) {
    blog.votes = 0
  }

  if (!blog.url || !blog.title) {
    return response.status(400).json({ error: 'url or title missing' })
  }

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})


blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)

    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

module.exports = blogsRouter