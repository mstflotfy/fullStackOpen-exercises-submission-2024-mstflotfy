import DisplayPerson from "./DisplayPerson"

const Persons = ({personsToShow, deletePerson}) => {
  return(
    <ul>
      <DisplayPerson personsToShow={personsToShow} deletePerson={deletePerson}/>
    </ul>
  )
}

export default Persons