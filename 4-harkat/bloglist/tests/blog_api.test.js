const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

describe('API tests', () => {

  beforeAll(async () => {
    await Blog.remove({})
  
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
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

    const blogsInDatabase = await helper.blogsInDb()

    const response = await api
      .get('/api/blogs')

    expect(response.body.length).toBe(blogsInDatabase.length)

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

    const blogsBefore = await helper.blogsInDb()
  
    const newSavedBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    /*  
    const response = await api
      .get('/api/blogs')

      */
    //const contents = response.body.map(r => r.title)
    //expect(response.body.length).toBe(helper.initialBlogs.length + 1)
    //expect(contents).toContain('Subterranean homesick blues')

    const blogsAfter = await helper.blogsInDb()

    expect(blogsAfter.length).toBe(blogsBefore.length+1)

    //ei taida koskaan toimia tälläinen, kun toisesta puuttuu se id?
    //expect(blogsAfter).toContainEqual(newBlog)

    //eipä toimi vieläkään, vaikka id:tkin on nyt samat... 
    //expect(blogsAfter).toContainEqual(newSavedBlog.body)

    //..nöyrrytään sen verran tässä kohtaa, että vertaillaan vain yhden kentän arvoa
    const titles = blogsAfter.map(r => r.title)
    expect(titles).toContain('Subterranean homesick blues')
    
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
  

  test('blog without url or title is not added ', async () => {
    const newBlogWithoutTitle = {
      author: 'ville',
      url: 'test.url',
      votes: 1
    }
  
    const newBlogWithoutUrl = {
      author: 'ville',
      title: 'titteli',
      votes: 1
    }

    const newBlogWithoutUrlAndTitle = {
      author: 'ville',
      votes: 1
    }

    const newBlogWithEmptyValuesOnTitleAndUrl = {
      author: 'ville',
      title: '',
      url: '',
      votes: 1
    }

    const intialBlogs = await api
      .get('/api/blogs')
  
    await api
      .post('/api/blogs')
      .send(newBlogWithoutTitle)
      .expect(400)
  
    await api
      .post('/api/blogs')
      .send(newBlogWithoutUrl)
      .expect(400)
  
    await api
      .post('/api/blogs')
      .send(newBlogWithoutUrlAndTitle)
      .expect(400)

      await api
      .post('/api/blogs')
      .send(newBlogWithEmptyValuesOnTitleAndUrl)
      .expect(400)

    const response = await api
      .get('/api/blogs')
  
    expect(response.body.length).toBe(intialBlogs.body.length)
  })

  afterAll(() => {
    server.close()
  })
})