const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req,res,next) => {
    const blogs = await Blog.find({}).populate('user',{userName:1, name:1})
    res.json(blogs)
})

blogsRouter.post('/', async (req,res,next) => {
    const body = req.body
    if (!body.title || !body.url){
        return res.status(400).json({error: 'url or title missing'})
    }
    const user = await User.findById(body.userId)
    console.log(user)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })
    try {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        res.status(201).json(savedBlog)
    } catch (e){
        e => next(e)
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
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id)
        if (deletedBlog) {
            res.status(204).end()
        } else {
            res.status(404).json({ error: 'Blog not found' })
        }
    } catch (e) {
        next(e)
    }
})

module.exports = blogsRouter