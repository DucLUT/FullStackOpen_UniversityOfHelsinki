const { test, after } = require('node:test')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    const blog = new Blog({
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://testurl.com',
        likes: 0
    })
    await blog.save()
})

test('blogs are retrieved as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

after(async () => {
    await mongoose.connection.close()
})