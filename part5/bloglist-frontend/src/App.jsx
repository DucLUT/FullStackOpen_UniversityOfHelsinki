import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState(null);
  const [type, setType] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      console.log(user)
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (e) {
      console.log(e);
      setMessage('wrong username or password')
      setType('error')
      setTimeout(() => {
        setMessage(null)
        setType(null)
      }, 2000);
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
  };

  const blogList = () => {
    return (
      <div>
        
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog}/>
        ))}
      </div>
    );
  };
  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };
  
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      console.log(returnedBlog)
      setTitle('');
      setAuthor('');
      setUrl('');
      setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author}`)
      setTimeout(() => {
        setMessage(null)
      }, 2000);
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  const blogForm = () => {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>
          title:
          <input
            type='text'
            name='Title'
            value={title}
            onChange={({target}) => setTitle(target.value)} 

          />
          </div>
          <div>
          author:
          <input
            type='text'
            name='Author'
            value={author}
            onChange={({target}) => setAuthor(target.value)} 
          />
          </div>
          <div>
          url:
          <input
            type='text'
            name='Url'
            value={url}
            onChange={({target}) => setUrl(target.value)}
          />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
  const handleLogout = (event) => {
    console.log("logyt???")
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)

  }

  return (
  <div>
    <Notification message={message} type={type}/>
    {!user && loginForm()}
    {user && <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p> 
      <button onClick={handleLogout}>logout</button>
      {blogForm()}
      {blogList()}
      </div>}
    
  </div>
  );
};

export default App;
