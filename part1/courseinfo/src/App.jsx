// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
const Header = (props) => {
  console.log(props);
  return (
  <>
   <h1>{props.course}</h1>
  </>
  )
}

const Part = (props) => {
  const elements = props.parts.map(part => <p>{part.name} {part.exercises}</p>)
  return (
    <>
    {elements}
    </>
  )
}
const Content = (props) => {
  return (
    <>
    <Part parts = {props.parts}/>
    </>
  )
}
const Total = (props) => {
  let a = 0;
  props.parts.forEach(part => {
    a += part.exercises;
  });
  
  return (
    <>
      <p>Number of exercises {a}</p>
    </>
  );
}
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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
  return (
    <>
    <Header course = {course}/>
    <Content parts = {parts}/>
    <Total parts = {parts}/>
    
    
    </>
  )
}

export default App
