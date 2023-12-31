import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

const Statistics = ({good,neutral,bad,total}) => {
  if (total === 0){
    return (
      <>
      <h1>Statistics</h1>
      <div>No feedback given</div>
      </>
    )}
  return (
    <>
    <h1>Statistics</h1>
    <Display text='good' value={good} />
    <Display text='neutral' value={neutral} />
    <Display text='bad' value={bad} />
    <Display text='all' value={total} />
    <Display text='average' value={(good - bad) / total} />
    <Display text='positive' value={`${good / total * 100} %`} />

    </>
  )
  }

const Display = ({text, value}) => {
  return (
    <div>{text} {value}</div>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <>
    <button onClick={handleClick}>
      {text}
    </button><br />
    </>
    )
  }
const App = () => {

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  
  const handleGoodClick = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }

  return (
    <>
    <h1>Give feedback</h1>
    <Button handleClick={handleGoodClick} text='good' />
    <Button handleClick={handleNeutralClick} text='neutral' />
    <Button handleClick={handleBadClick} text='bad' />
    <Statistics good = {good} neutral = {neutral} bad = {bad} total = {total} />
    </>
  )
}

export default App
