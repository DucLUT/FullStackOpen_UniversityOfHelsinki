const TodoList = () => {
  return (
    <div>
    <ul>
      <li>Learn React</li>
      <li>Climb Mt. Everest</li>
      <li>Run a marathon</li>
      <li>Feed the dogs dit me may</li>
    </ul>
    </div>
  )
}
const Hello = (probs) => {
  return (
    <div>
      <p>Hello world cai dit me may {probs.name} and {probs.age}</p>
    </div>
  )
}


const App = () => {
  console.log("Keep the console open while you work on this section")
  const now = new Date();
  const a = 10;
  const b = 20;
  console.log(`Hello world, it is ${now} and ${a} plus ${b} is ${a + b}`);
  // if (a === 10) {
  //   return (
  //     <>   
  //     <h1>HELLO SHIT</h1></>
  //   )
  // }
  return (
  <>
  <article>
  
  <h1>My First Component</h1>
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
