const DisplayPerson = ({personsToShow, deletePerson}) => {

  return (
    <>
      {
        personsToShow
          .map(person => 
            <li key={person.name}>
              {person.name} {person.number} {person.id}
              <button onClick={() => deletePerson(person)}>Delete</button>
            </li>
          )
      }
    </>
  )
}
export default DisplayPerson