import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { showNotification } from '../reducers/notificationReducer';

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title,
      author,
      url,
    };

    try {
      dispatch(createBlog(blogObject));
      blogFormRef.current.toggleVisibility();
      setTitle('');
      setAuthor('');
      setUrl('');
      dispatch(
        showNotification(
          `A new blog "${blogObject.title}" by ${blogObject.author} added`,
          'normal',
          2000
        )
      );
    } catch (error) {
      console.error('Error creating blog:', error);
      dispatch(showNotification('Error creating blog', 'error', 2000));
    }
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            name="Title"
            placeholder="titlehere"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="Author"
            placeholder="authorhere"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="Url"
            placeholder="urlhere"
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
