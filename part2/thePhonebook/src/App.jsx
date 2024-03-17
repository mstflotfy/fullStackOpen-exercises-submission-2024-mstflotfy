import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'presons')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      axios
        .post('http://localhost:3001/persons', newPerson)
        .then(response => setPersons(persons.concat(response.data)))
        .catch(e => {
          alert('Failed to add new person :(')
          console.log('Failed to add new person :(', e)
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const personsToShow = nameFilter 
    ? persons
        .filter(person =>
            person
              .name
              .toLowerCase()
              .includes(nameFilter.toLowerCase())
        )
    : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter 
        nameFilter={nameFilter} 
        setNameFilter={setNameFilter} 
      />
      
      <h3>add a new</h3>

      <PersonForm 
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber} 
        setNewNumber={setNewNumber} 
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App