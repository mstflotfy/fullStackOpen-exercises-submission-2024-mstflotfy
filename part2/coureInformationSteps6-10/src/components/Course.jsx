const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ course }) => {
  const sum = course.parts.reduce((acc, part) => acc + part.exercises, 0)
  return(
    <p><strong>Total of {sum} exercises</strong></p>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </>


const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total course={course} />
    </div>
  )
}

export default Course