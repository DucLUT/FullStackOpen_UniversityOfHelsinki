import { useState } from 'react'

const TodoList = () => {
  return (
    <div>
    <ul>
      <li>Learn React</li>2
      <li>Climb Mt. Everest</li>
      <li>Run a marathon</li>
      <li>Anh yeu em</li>
    </ul>
    </div>
  )
}
const Hello = ({name,age}) => {
  const  bornYear = () => {
    const yearNow = new Date().getFullYear()
    return yearNow - age
  }
<<<<<<< HEAD
  if (name === "Van"){
    return (
      <div>
        <p>Toi la {name} va toi yeu Nhi</p>
        <p>You was born {bornYear()}</p>
      </div>
    )
  }
  if (name === "Duc"){
    return (
      <div>
        <p>Toi la {name} va toi yeu Nhi</p>
        <p>You was born {bornYear()}</p>
      </div>
    )
  }
  return (
    <div>
      <p>Toi yeu {name} and {age}</p>
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


const History = ({allClicks}) => {
  if (allClicks.length === 0){
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {allClicks.join(' ')}
=======
  return (
    <div>
      <p>Hello world cai dit me may {name} and {age}</p>
      <p>You was born {bornYear()}</p>
>>>>>>> c4a6c336b59df41c2026609c0541c70189598345
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

<<<<<<< HEAD
  const name = 'Nhi'
=======
>>>>>>> c4a6c336b59df41c2026609c0541c70189598345

  const now = new Date();
  const a = 1;
  const b = 20;
<<<<<<< HEAD
  
  const [counter, setCounter] = useState(0)
  const [clicks, setClicks] = useState({left: 0, right: 0})
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)


  const handleLeftClick = () => {
    const newClicks = {
      left: clicks.left + 1,
      right: clicks.right - 1,

    }
    setClicks(newClicks)
    setAll(allClicks.concat('L'))
    setTotal(newClicks.left + newClicks.right)
  }
  const handleRightClick = () => {
    const newClicks = {
      left:clicks.left,
      right: clicks.right + 1
    }
    setClicks(newClicks)
    setAll(allClicks.concat('R'))
    setTotal(newClicks.left + newClicks.right)
  }
  const reset = () => {
    
    setClicks({left: 0, right: 0})
    setAll([])
    setTotal(0)
  }
=======
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [counter, setCounter] = useState(0)
>>>>>>> c4a6c336b59df41c2026609c0541c70189598345
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
<<<<<<< HEAD
      <br/>

=======
>>>>>>> c4a6c336b59df41c2026609c0541c70189598345
      </>
    )
  }
  if (a === 1){
    return (
<<<<<<< HEAD
      <>
      {clicks.left}
      <button onClick = {handleLeftClick}>right</button>
      <button onClick = {handleRightClick}>left</button>
      {clicks.right}
      <br/>
      <button onClick = {reset}>reset</button>
      <br/>
      <History allClicks={allClicks}/>
      <p>{total}</p>
      </>
    )
  }
  if (a === 100){
    console.log("Nhi")
  }
=======
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
>>>>>>> c4a6c336b59df41c2026609c0541c70189598345
  return (
  <>
  <article>
  
  <h1>My First Component</h1>
<<<<<<< HEAD
  
  
=======
  <p>{nigga}</p>
  <p>{friends[0].name}</p>
>>>>>>> c4a6c336b59df41c2026609c0541c70189598345
  <p>{a} + {b} = {a+b}</p>
  <p>{now.toString()}</p>
  <Hello name = "Van" age = {19}/>
  <Hello name = "Nhi" age = {19}/>
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