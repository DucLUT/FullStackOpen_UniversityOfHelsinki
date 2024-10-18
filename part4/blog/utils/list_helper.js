const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, x) => sum + x.likes, 0)
}
const favouriteBlog = (blogs) => {
    return blogs.reduce((maxBlog, currentBlog) => 
        currentBlog.likes > maxBlog.likes ? currentBlog : maxBlog, blogs[0]);
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}
