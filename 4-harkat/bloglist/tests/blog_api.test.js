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

  test('a valid blog can be added ', async () => {
    const newBlog = {
      author: 'Bob Dylan',
      title: 'Subterranean homesick blues',
      url:'www.dylan.com',
      votes: 99
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api
      .get('/api/blogs')

    const contents = response.body.map(r => r.title)
  
    expect(response.body.length).toBe(initialBlogs.length + 1)
    expect(contents).toContain('Subterranean homesick blues')
  })

  test('blog without votes will get zero value by default ', async () => {
    const newBlog = {
       author: 'Herman Melville',
       title: 'Moby Dick',
       url: 'www.melville.com'
    }
  
    const intialBlogs = await api
      .get('/api/blogs')
  
    const newBlogReturned = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      console.log(newBlogReturned.body)

      expect(newBlogReturned.body.votes).toEqual(0)
  })
  

  afterAll(() => {
    server.close()
  })
})