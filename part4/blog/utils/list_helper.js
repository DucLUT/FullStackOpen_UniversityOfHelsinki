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

const mostBlogs = (blogs) => {
    let map = new Map();
    let maxAuthor = '';
    let maxBlogs = 0;

    for (let i = 0; i < blogs.length; i++) {
        const author = blogs[i].author;


        let currentCount = (map.get(author) || 0) + 1;
        map.set(author, currentCount);


        if (currentCount > maxBlogs) {
            maxBlogs = currentCount;
            maxAuthor = author;
        }
    }


    return { author: maxAuthor, blogs: maxBlogs };
} 
const mostLikes = (blogs) => {
    let map = new Map();
    let maxAuthor = '';
    let maxLikes = 0;
    for (i = 0; i < blogs.length; i++){
        const author = blogs[i].author;
        let likes = blogs[i].likes
        let currentLikes = (map.get(author) || 0) + likes;
        map.set(author, currentLikes);
        if (currentLikes > maxLikes){
            maxLikes = currentLikes;
            maxAuthor = author;
        }

    }
    return {author: maxAuthor, likes: maxLikes};
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}
