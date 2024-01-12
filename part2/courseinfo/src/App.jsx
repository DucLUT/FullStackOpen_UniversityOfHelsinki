import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Course from './components/course.jsx'
const Header = (props) => {
  // console.log(props);
  return (
  <>
   <h1>{props.course.name}</h1>
  </>
  )
}

const Part = (props) => {
  console.log(props)
  console.log(props.course)
  const elements = props.course.parts.map((part) => <p key={part.id}>{part.name} {part.exercises}</p>)
  return (
    <>
    {elements}
    </>
  )
}
const Content = (props) => {
  return (
    <>
    <Part course = {props.course}/>
    </>
  )
}
const Total = (props) => {
  // let a = 0;
  // props.course.parts.forEach(part => {
  //   a += part.exercises;
  // });
  const parts = props.course.parts
  const total = parts.reduce((s, p) => {
    console.log('what is happening', s, p)
    return s + p.exercises
  }, 0)
  
  return (
    <>
      <h3>Total of {total} exercises</h3>
    </>
  );
}

// const Course = (props) => {
//   return (
//     <>
//     <Header course = {props.course}/>
//     <Content course = {props.course}/>
//     <Total course = {props.course}/>
//     </>
//   )
  
// }
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
    <h1>Web development curriculum</h1>
    <Course course = {courses[0]}/>
    <Course course = {courses[1]}/>
    
    </>
  )
}

export default App