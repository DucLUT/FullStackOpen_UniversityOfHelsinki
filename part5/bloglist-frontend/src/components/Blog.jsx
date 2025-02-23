import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  const handleLike = async () => {
    console.log('like ' + JSON.stringify(blog));

    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog);
      const updatedReturnedBlog = { ...returnedBlog, user: blog.user };
      setBlogs(blogs.map(b => (b.id === blog.id ? updatedReturnedBlog : b)));
      console.log('Liked blog:', updatedReturnedBlog);
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.deleteBlog(blog.id);
        setBlogs(blogs.filter(b => b.id !== blog.id));
        console.log(`Removed blog: ${blog.title} by ${blog.author}`);
      } catch (error) {
        console.error('Error removing blog:', error);
      }
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const hideWhenVisible = { display: show ? 'none' : '' };
  const showWhenVisible = { display: show ? '' : 'none' };

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className="fortest1">
        {blog.title} {blog.author}
        <button onClick={toggleShow}>show</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleShow}>hide</button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes}
        <button onClick={handleLike}>like</button>
        <br />
        {blog.user.name}
        <br/>
        {user && blog.user.id === user.id && (
          <button onClick={handleRemove}>remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;