import {useState} from "react"
const Blog = ({ blog }) => {
  const [show, setShow] = useState(false)

  const toggleShow = () => {
    setShow(!show)
    console.log("clclc")
  }
  const handleLike = () => {
    console.log("like" + JSON.stringify(blog))
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: show ? 'none' : '' }
  const showWhenVisible = { display: show ? '' : 'none' }

  return (

    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleShow}>show</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author} 
        <button onClick={toggleShow}>hide</button>
        <br/>
        {blog.url}
        <br/>
        likes {blog.likes} 
        <button onClick={handleLike}>like</button>
        <br/>
        {blog.user.name}
        
      </div>
  </div>
)}

export default Blog