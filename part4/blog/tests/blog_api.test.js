const { test, after, beforeEach } = require('node:test')
const supertest = require('supertest')
const assert = require('assert')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const logger = require('../utils/logger')

const api = supertest(app)

const initialBlogs = [
    {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://testurl.com',
        likes: 10
    },
    {
        title: 'FullStack',
        author: 'Duc Duong',
        url: 'http://testurl2.com',
        likes: 20
    }
]

beforeEach(async () => {
    logger.info('Deleting all blogs')
    await Blog.deleteMany({})
    logger.info('Inserting initial blogs')
    await Blog.insertMany(initialBlogs)
})

test('blogs are retrieved as json', async () => {
    logger.info('Retrieving blogs as JSON')
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})
test('there are 2 blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 2)
})
test('blogs have id property', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    blogs.forEach(blog => {
        assert.strictEqual(blog.id !== undefined, true)
        assert.strictEqual(blog._id, undefined)
    })
})
test('add a new blog to db', async () =>  {
    const newBlog = {
        title: 'testTitle',
        author : "testAuthor",
        url: 'testUrl',
        likes: 100
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-type', /application\/json/)
    const response = await api.get('/api/blogs')
    const authors = response.body.map(blog => blog.author)
    assert.strictEqual(response.body.length, initialBlogs.length + 1)
    assert(authors.includes('testAuthor'))
})
test('adding new blog without a like property', async () => {
    const newBlog = {
        title: 'fullstack',
        author: 'duong',
        url: 'testUrl'
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-type', /application\/json/)
    const response = await api.get('/api/blogs')
    const likes = response.body.map(blog => blog.likes)
    assert(likes.includes(0))
})
test('adding new blog without url and titile', async () => {
    const newBlog = {
        author: 'ducubu'
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length)

})

after(async () => {
    await mongoose.connection.close()
})