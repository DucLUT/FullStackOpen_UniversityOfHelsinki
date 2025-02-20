const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    try {
        const blogs = await Blog.find({}).populate('user', { userName: 1, name: 1 })
        console.log('Blogs in DB:', blogs)
        response.json(blogs)
    } catch (error) {
        console.error('Error fetching blogs:', error)
        response.status(500).json({ error: 'Internal server error' })
    }
})
blogsRouter.post('/', async (req, res, next) => {
    const body = req.body
    const userFromReq = req.user

    if (!userFromReq) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' })
    }

    if (!body.title || !body.url) {
        return res.status(400).json({ error: 'url or title missing' })
    }

    const user = await User.findById(userFromReq._id.toString())
    console.log('User:', user)
    if (!user) {
        return res.status(401).json({ error: 'user not found' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    try {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        res.status(201).json(savedBlog)
    } catch (e) {
        next(e)
    }
})
blogsRouter.put('/:id', async (req, res,next) => {
    const body = req.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
        res.json(updatedBlog)
    } catch (e) {
        next(e)
    }
})
blogsRouter.delete('/:id', async (req, res, next) => {
    const userFromReq = req.user

    try {
        const blog = await Blog.findById(req.params.id)
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' })
        }

        console.log('Blog user:', blog.user.toString())
        console.log('Request user:', userFromReq ? userFromReq._id.toString() : 'undefined')

        if (userFromReq && blog.user.toString() === userFromReq._id.toString()) {
            const deletedBlog = await Blog.findByIdAndDelete(req.params.id)
            if (deletedBlog) {
                res.status(204).end()
            } else {
                res.status(404).json({ error: 'Blog not found' })
            }
        } else {
            res.status(401).json({ error: 'Unauthorized' })
        }
    } catch (e) {
        console.error('Error deleting blog:', e)
        next(e)
    }
})

module.exports = blogsRouter