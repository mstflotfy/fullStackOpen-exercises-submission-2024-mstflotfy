const DisplayPerson = ({personsToShow, deletePerson}) => {

  return (
    <>
      {
        personsToShow
          .map(person => 
            <li key={person.name}>
              {person.name} {person.number}
              <button onClick={() => deletePerson(person)}>Delete</button>
            </li>
          )
      }
    </>
  )
}
export default DisplayPerson