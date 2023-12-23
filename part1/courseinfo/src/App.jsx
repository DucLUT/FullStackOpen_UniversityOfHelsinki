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
  
  return (
    <>
    <p>{props.part} {props.exercises}</p>
    </>
  )
}
const Content = (props) => {
  return (
    <>
    <Part part = {props.part.name} exercises = {props.part.exercises}/>
    </>
  )
}
const Total = (props) => {
  return (
    <>
    <p>Number of exercises {props.part1.exercises + props.part2.exercises + props.part3.exercises}</p>
    </>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <>
    <Header course = {course}/>
    <Content part = {part1}/>
    <Content part = {part2}/>
    <Content part = {part3}/>
    <Total part1 = {part1} part2 = {part2} part3 = {part3}/>

    </>
  )
}

export default App
