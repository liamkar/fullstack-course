const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
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

describe('API tests', () => {
  
  beforeAll(async () => {
    await Blog.remove({})
  
    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
  
    expect(response.body.length).toBe(initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api
      .get('/api/blogs')
  
    const contents = response.body.map(r => r.title)
  
    expect(contents).toContain('Rum sodomy and lash')
  })

  afterAll(() => {
    server.close()
  })
})