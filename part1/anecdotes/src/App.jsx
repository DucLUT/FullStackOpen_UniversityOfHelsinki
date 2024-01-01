import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
const Button = ({handleClick, text}) => {
  return (
    <>
    <button onClick={handleClick}>
      {text}
    </button>
    </>
    )
  }
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  let a = Math.floor(Math.random() * anecdotes.length)


  const [votes, setVotes] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0 ,7:0});
  const [selected, setSelected] = useState(0);

 

  const vote = () => {

    const copy = {...votes}
    copy[selected] += 1
    console.log(copy)
    setVotes(copy)
  }

  const select = () => { 
    setSelected(a)
  }
  const getMaxValueKey = (obj) => {
    let maxKey = null;
    let maxValue = -Infinity;
  
    for (const key in obj) {
      if (obj[key] > maxValue) {
        maxKey = key;
        maxValue = obj[key];
      }
    }
  
    return maxKey;
  };
  
  // Example usage:
  const maxKey = getMaxValueKey(votes);
  console.log("Key with the maximum value:", maxKey);
  

  return (
    <>
    <h1>Anecdote of the day</h1>
    {anecdotes[selected]}
    <br/>
    has {votes[selected]} votes
    <br/>
    <Button handleClick={vote} text='vote' />
    <Button handleClick={select} text='next anecdote' />
    <h1>Anecdote with most votes</h1>
    {anecdotes[maxKey]}
    <br/>
    has {votes[maxKey]} votes
    </>
  )
}
export default App
