const { test, after, beforeEach, describe} = require('node:test')
const supertest = require('supertest')
const assert = require('assert')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const helper = require('./test_helper')

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
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})
describe('saving blogs, testing get method', () => {
    
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

})

describe('testing the post method and some exceptions', () => {
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

})

describe('testing delete method', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogs = await Blog.find({})
        const blogToDelete = blogs[0]
        await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
        const res = await api.get('/api/blogs')
        assert.strictEqual(res.body.length, initialBlogs.length - 1)

    })
})



after(async () => {
    await mongoose.connection.close()
})