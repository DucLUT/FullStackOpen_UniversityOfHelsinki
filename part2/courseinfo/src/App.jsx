import { useState } from 'react'
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
  let a = 0;
  props.course.parts.forEach(part => {
    a += part.exercises;
  });
  
  return (
    <>
      <h3>Total of {a} exercises</h3>
    </>
  );
}

const Course = (props) => {
  return (
    <>
    <Header course = {props.course}/>
    <Content course = {props.course}/>
    <Total course = {props.course}/>
    </>
  )
  
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
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
      }
    ]
  }
  return (
    <>
    <Course course = {course}/>
    
    </>
  )
}

export default App