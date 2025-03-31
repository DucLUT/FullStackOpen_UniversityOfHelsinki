import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { likeBlog, deleteBlog } from '../reducers/blogReducer';

const Blog = ({ blog, user }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const toggleShow = () => {
    setShow(!show);
  };

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    try {
      dispatch(likeBlog(updatedBlog));
      console.log('Liked blog:', updatedBlog);
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(blog.id));
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
    <div style={blogStyle} className="blog">
      <div style={hideWhenVisible} className="fortest1">
        {blog.title} {blog.author}
        <button onClick={toggleShow}>show</button>
      </div>
      <div style={showWhenVisible} className="fortest2">
        {blog.title} {blog.author}
        <button onClick={toggleShow}>hide</button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes}
        <button id="likeblog" onClick={handleLike}>
          like
        </button>
        <br />
        {blog.user.name}
        <br />
        {user && blog.user.id === blog.user.id && (
          <button id="removeblog" onClick={handleRemove}>
            remove
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
