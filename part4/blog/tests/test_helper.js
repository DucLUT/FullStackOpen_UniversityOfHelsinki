const Blog = require('../models/blog')

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

const nonExistingId = async () => {
    const blog = new Blog(    {
        title: 'FullStack',
        author: 'Duc Duong',
        url: 'http://testurl2.com',
        likes: 20
    }
)
    await blog.save()
    await blog.deleteOne()
  
    return blog._id.toString()
}


module.exports = {
    nonExistingId
  }
