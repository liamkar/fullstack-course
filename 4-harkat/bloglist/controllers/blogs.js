const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 } )
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

  //temp solution for setting some user id for newly created blogs.
  const users = await User.find({})
  const firstUser = users[0]
  console.log('user id:',firstUser._id)
  blog.user = firstUser._id
  
  if (blog.votes === undefined) {
    blog.votes = 0
  }

  if (!blog.url || !blog.title) {
    return response.status(400).json({ error: 'url or title missing' })
  }

  const savedBlog = await blog.save()

  //we need to set the new blog id for the user as well.
  firstUser.blogs = firstUser.blogs.concat(savedBlog._id)
  await firstUser.save()

  response.status(201).json(savedBlog)
})


blogsRouter.get('/:id', async (request, response) => {
  console.log('id at GET:',request.params.id)
  const blog = await Blog.findById(request.params.id)
  console.log('blog found by get:id:',blog)
  response.json(blog)
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

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
    votes: body.votes,
    id: body._id,
    user: body.user
  }

  console.log(body.id)
  console.log(body._id)

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true } )
    //response.status(204).end()
    //response.json(helper.format(updatedBlog))
    console.log('update successful, updated object:',updatedBlog)
    response.json(updatedBlog)
    //response.status(201).json(savedBlog)

  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }

})

module.exports = blogsRouter