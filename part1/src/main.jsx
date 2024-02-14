// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import axios from 'axios'
import './index.css'

// import './index.css'
// axios
//   .get('http://localhost:3001/notes')
//   .then(response => {
//     const notes = response.data
//     console.log(response.data)
//     ReactDOM.createRoot(document.getElementById('root')).render(<App notes = {notes}/>)
//   })


const notes = [
    {
      id: 1,
      content: 'HTML is easy',
      important: true
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false
    },
    {
      id: 3,
      content: 'GET and POST are the most important methods of HTTP protocol',
      important: true
    }
  ]

ReactDOM.createRoot(document.getElementById('root')).render(<App/>)





