const Blog = require('../models/blog')

const initialBlogs = [
    {
      author: 'Nick Cave',
      title: 'Abattoir blues',
      url:'www.nickcave.com',
      votes: 66
    },
    {
      author: 'Shane McGowan',
      title: 'Rum sodomy and lash',
      url:'www.shanemcgowan.com',
      votes: 67
    }
  ]

const format = (blog) => {
  return {
    author: blog.author,
    title: blog.title,
    url: blog.url,
    votes: blog.votes,
    id: blog._id
  }
}

const nonExistingId = async () => {
  const blog = new Blog()
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(format)
}

module.exports = {
  initialBlogs, format, nonExistingId, blogsInDb
}