import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from './components/Notification'
import Togglable from "./components/Togglable"

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [type, setType] = useState("");

  const blogFormRef = useRef()

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

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const loginForm = () => (
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

  const blogList = () => (
    <div>
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user} />
        ))}
    </div>
  );

  return (
    <div>
      <Notification message={message} type={type}/>
      {!user && loginForm()}
      {user && <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p> 
        <button onClick={handleLogout}>logout</button>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm
            blogs={blogs}
            setBlogs={setBlogs}
            setMessage={setMessage}
            blogFormRef={blogFormRef}
          />
        </Togglable>
        {blogList()}
      </div>}
    </div>
  );
};

export default App;