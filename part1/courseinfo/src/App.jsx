// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
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
  const elements = props.course.parts.map((part, index) => <p key={index}>{part.name} {part.exercises}</p>)
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
  let a = 0;
  props.course.parts.forEach(part => {
    a += part.exercises;
  });
  
  return (
    <>
      <p>Number of exercises {a}</p>
    </>
  );
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <>
    <Header course = {course}/>
    <Content course = {course}/>
    <Total course = {course}/>
    
    
    </>
  )
}

export default App
