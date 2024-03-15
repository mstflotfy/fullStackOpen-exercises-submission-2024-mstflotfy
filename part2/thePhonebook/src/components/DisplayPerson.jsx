const DisplayPerson = ({personsToShow}) => {
  return (
    <>
      {
        personsToShow
          .map(person => 
            <li key={person.name}>
              {person.name} {person.number}
            </li>
          )
      }
    </>
  )
}
export default DisplayPerson