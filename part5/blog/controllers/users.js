const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const usersRouter = express.Router()

usersRouter.post('/', async (req, res, next) => {
    const { username, name, password } = req.body

    if (!password || password.length < 3) {
        return res.status(400).json({ error: 'password must be at least 3 characters long' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    try {
        const savedUser = await user.save()
        res.status(201).json(savedUser)
    } catch (e) {
        next(e)
    }
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users)
})

module.exports = usersRouter