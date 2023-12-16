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
const Hello = () => {
  return (
    <div>
      <p>Hello world cai dit</p>
    </div>
  )
}


const App = () => {
  const now = new Date();
  const a = 10;
  const b = 20;
  console.log(`Hello world, it is ${now} and ${a} plus ${b} is ${a + b}`);
  return (
  
  <article>
  
  <h1>My First Component</h1>
  <p>{a} + {b} = {a+b}</p>
  <p>{now.toString()}</p>
  <Hello />
  <TodoList />


  <ol>
    <li>Components: UI Building Blocks</li>
    <li>Defining a Component</li>
    <li>Using a Component</li>
  </ol>
  </article>
  )
}



export default App
