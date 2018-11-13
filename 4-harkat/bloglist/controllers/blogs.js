const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken')


/*
const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  console.log('authorization send in request',authorization)
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}
*/

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
try {
  //const token = getTokenFrom(request)
  const token = request.token
  console.log('SECRET env variable:',process.env.SECRET)
  console.log('token returned by middleware method:',token)
  //NOTE: for some reason verify goes through even, if env.SECRET does not match with the token...
  //authorization token needs to be the actual token created by this library - if taken just out from the hat 'jwt malformed' happens?
  //const decodedToken = jwt.verify(token, process.env.SECRET)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  console.log('right AFTER jwt.veriry')
  console.log('decodedTokenId:',decodedToken.id)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  /*
  //temp solution for setting some user id for newly created blogs.
  const users = await User.find({})
  const firstUser = users[0]
  console.log('user id:',firstUser._id)
  blog.user = firstUser._id
  */

  if (blog.votes === undefined) {
    blog.votes = 0
  }

  if (!blog.url || !blog.title) {
    return response.status(400).json({ error: 'url or title missing' })
  }

  const user = await User.findById(decodedToken.id)
  console.log('user id found from the token:',user._id)
  blog.user = user._id

  const savedBlog = await blog.save()

  /*
  //we need to set the new blog id for the user as well.
  firstUser.blogs = firstUser.blogs.concat(savedBlog._id)
  await firstUser.save()
  */

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)

} catch(exception) {
  if (exception.name === 'JsonWebTokenError' ) {
    response.status(401).json({ error: exception.message })
  } else {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
}

})


blogsRouter.get('/:id', async (request, response) => {
  console.log('id at GET:',request.params.id)
  const blog = await Blog.findById(request.params.id)
  console.log('blog found by get:id:',blog)
  response.json(blog)
})


blogsRouter.delete('/:id', async (request, response) => {
  try {
    //await Blog.findByIdAndRemove(request.params.id)

    const blog = await Blog.findById(request.params.id)
    
    //blog can be removed only by a person who created it:
    const token = request.token
    console.log('SECRET env variable:',process.env.SECRET)
    console.log('token returned by middleware method:',token)
    
    const decodedToken = jwt.verify(token, process.env.SECRET)
    console.log('right AFTER jwt.veriry')
    console.log('decodedTokenId:',decodedToken.id)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
  
    const user = await User.findById(decodedToken.id)
    console.log('user got based on decodedToken.id:',user)
    console.log('userid in blog:',blog.user.toString())
    console.log('userid in token:',user._id.toString())
    //if (!(blog.user.toString() === user._id.toString())) {
    //if there is no user defined for blog (due to the legacy code additions, we will allow delete for any user.)
    if (blog.user && !(blog.user.toString() === user._id.toString())) {
      return response.status(401).json({ error: 'user has no right to remove this blog' })
    }

    await Blog.remove({_id: request.params.id})

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