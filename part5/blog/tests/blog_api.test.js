const { test, after, beforeEach, describe} = require('node:test')
const supertest = require('supertest')
const assert = require('assert')
const mongoose = require('mongoose')
const app = require('../app')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')
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
let token
beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    console.log("Database cleared");

    const passwordHash = await bcrypt.hash('hihihihehehe2222', 10);
    const user = new User({ userName: 'root', passwordHash });
    await user.save();
    console.log("User created:", user);

    const response = await api
        .post('/api/login')
        .send({ userName: 'root', password: 'hihihihehehe2222' });
    console.log("Login response:", response.body);

    token = response.body.token;
    await Blog.insertMany(initialBlogs)


    
});

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
        .set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, initialBlogs.length)
    
    })
    test('fails with status code 401 Unauthorized if token is not provided', async () => {
        const newBlog = {
            title: 'Unauthorized Blog',
            author: 'Unauthorized Author',
            url: 'http://unauthorizedurl.com',
            likes: 0
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const titles = response.body.map(blog => blog.title)
        assert(!titles.includes('Unauthorized Blog'))
    })

})

describe('update properties of the blog object', () => {
    test('update the like for the blog', async () => {
        const blogs = await Blog.find({})
        const blogToUpdate = blogs[0]
        const updatedBlog = { ...blogToUpdate._doc, likes: 200}
        await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        const response = await api.get('/api/blogs')
        const updatedBlogFromDb = response.body.find(blog => blog.id === blogToUpdate.id)
        assert.strictEqual(updatedBlogFromDb.likes, 200) 
    })
})

describe('testing delete method', () => {
    test('add a blog and delete it, succeeding with status code 204', async () => {
        const newBlog = {
            title: 'Blog to Delete',
            author: 'Test Author',
            url: 'http://deletableblog.com',
            likes: 42,
        };
    
        const postResponse = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    
        const addedBlog = postResponse.body;
    
        await api
            .delete(`/api/blogs/${addedBlog.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204);
    
        const responseAfterDeletion = await api.get('/api/blogs');
        const titlesAfterDeletion = responseAfterDeletion.body.map(blog => blog.title);
        assert(!titlesAfterDeletion.includes('Blog to Delete'));
        console.log("wait")
    });
    
})



after(async () => {
    await mongoose.connection.close()
})