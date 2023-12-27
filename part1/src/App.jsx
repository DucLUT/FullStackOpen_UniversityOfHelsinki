import { useState } from 'react'

const TodoList = () => {
  return (
    <div>
    <ul>
      <li>Learn React</li>2
      <li>Climb Mt. Everest</li>
      <li>Run a marathon</li>
      <li>Feed the dogs dit me may</li>
    </ul>
    </div>
  )
}
const Hello = ({name,age}) => {
  const  bornYear = () => {
    const yearNow = new Date().getFullYear()
    return yearNow - age
  }
  return (
    <div>
      <p>Hello world cai dit me may {name} and {age}</p>
      <p>You was born {bornYear()}</p>
    </div>
  )
}
const Display = ({counter}) => {
  return (
    <div>{counter}</div>
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


  const now = new Date();
  const a = 1;
  const b = 20;
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [counter, setCounter] = useState(0)
  // setTimeout(
  //   () => setCounter(counter + 1),1000)
  
    if (a === 10) { 

    
    return (
      <>   
      <h1>HELLO SHIT</h1>
      <Hello name = "Duc" age = {19}/>
      <Display counter={counter}/>
      <Button handleClick = {() => setCounter(counter + 1)} text = "Plus 1"/>
      <Button handleClick = {() => setCounter(0)} text = "reset"/>
      <Button handleClick = {() => setCounter(counter - 1)} text = "bulll"/>
      </>
    )
  }
  if (a === 1){
    return (
      <div>
        {left}
        <button onClick={() => setLeft(left + 1)}>
          left
        </button>
        <button onClick={() => setRight(right + 1)}>
          right
        </button>
        {right}
      </div>
    )
  }
  return (
  <>
  <article>
  
  <h1>My First Component</h1>
  <p>{nigga}</p>
  <p>{friends[0].name}</p>
  <p>{a} + {b} = {a+b}</p>
  <p>{now.toString()}</p>
  <Hello name = "Duc" age = {a}/>
  <Hello name = "Nhi" age = {b}/>
  <TodoList />
  <ol>
    <li>Components: UI Building Blocks</li>
    <li>Defining a Component</li>
    <li>Using a Component</li>
  </ol>
  </article>
  </>
  )
}



export default App
