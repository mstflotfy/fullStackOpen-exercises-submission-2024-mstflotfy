import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    personsService
      .getAll()
      .then(returnedPersons => setPersons(returnedPersons))
      .catch(e => {
        alert('Failed to import persons :(')
        console.log('GET Error: ', e)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      personsService
        .create(newPerson)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
        .catch(e => {
          alert('Failed to add new person :(')
          console.log('POST error: ', e)
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

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      console.log('Deleted')
      personsService
        .remove(person.id)
        .then(deletedPerson => setPersons(persons.filter(p => p.id !== deletedPerson.id)))
        .catch(e => {
          alert(`Failed to delete ${person.name} :(`)
          console.log('DELETE Error: ', e)
        })
    }
  }

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

      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />

    </div>
  )
}

export default App