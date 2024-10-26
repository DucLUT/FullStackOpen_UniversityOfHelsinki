const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req,res,next) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

blogsRouter.post('/', async (req,res,next) => {
    const body = req.body
    if (!body.title || !body.url){
        return res.status(400).json({error: 'url or title missing'})
    }
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })
    try {
        const savedBlog = await blog.save()
        res.status(201).json(savedBlog)
    } catch (e){
        e => next(e)
    }
})

module.exports = blogsRouter