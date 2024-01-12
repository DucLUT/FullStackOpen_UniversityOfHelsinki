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
    // let a = 0;
    // props.course.parts.forEach(part => {
    //   a += part.exercises;
    // });
    const parts = props.course.parts
    const total = parts.reduce((s, p) => {
      console.log('what is happening', s, p)
      return s + p.exercises
    }, 0)
    
    return (
      <>
        <h3>Total of {total} exercises</h3>
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

export default Course;