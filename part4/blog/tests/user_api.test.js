const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')

describe('when there is initially 1 user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ userName: 'root', passwordHash })
        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            userName: 'ducduongsieucapcuto',
            name: 'DucCuTo',
            password: 'deptraicuto',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
        const userNames = usersAtEnd.map(u => u.userName)
        assert(userNames.includes(newUser.userName))
    })

    test('creation fails if the name already taken', async () => {
        const usersAtStart = await helper.usersInDb()
        const notNewUser = {
            userName: 'root',
            name: 'DucCuTo',
            password: 'deptraicuto',
        }
        const result = await api
            .post('/api/users')
            .send(notNewUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('creating fails if the password is less than 3', async () => {
        const usersAtStart = await helper.usersInDb()
        const notNewUser = {
            userName: 'hihihohoh2h2',
            name: 'DucCuTo',
            password: '1',
        }
        const result = await api
            .post('/api/users')
            .send(notNewUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('password must be at least 3 characters long'))
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})