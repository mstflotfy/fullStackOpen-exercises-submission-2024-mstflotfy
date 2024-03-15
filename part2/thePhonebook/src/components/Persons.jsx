import DisplayPerson from "./DisplayPerson"

const Persons = ({personsToShow}) => {
  return(
    <ul>
      <DisplayPerson personsToShow={personsToShow} />
    </ul>
  )
}

export default Persons