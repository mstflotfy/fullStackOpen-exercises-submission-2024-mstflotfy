import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    console.log('effect')
    personsService
      .getAll()
      .then(returnedPersons => setPersons(returnedPersons))
      .catch(e => {
        showMsg('Failed to import persons :(')
        console.log('GET Error: ', e)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const personToEdit = persons.find(p => p.name.toLowerCase() === newPerson.name.toLowerCase())

    if (personToEdit) {
      if (window.confirm(`${personToEdit.name} is already added to phonebook, replace the old number with a new one?`)) {
        personsService
          .update(personToEdit.id, newPerson)
          .then(updatedPerson => setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson)))
          .catch(e => {
            showMsg('Failed to update number :(')
            console.log('failed to update number', e)
          })
      }
    } else {
      personsService
        .create(newPerson)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
        .catch(error => {
          showMsg(`${error.response.data.error}`)
          console.log('POST error: ', error.response.data.error)
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
          showMsg(`Failed to delete ${person.name} :(`)
          alert(`Failed to delete ${person.name} :(`)
          console.log('DELETE Error: ', e)
        })
    }
  }

  function showMsg(msg) {
    setErrorMsg(msg)
    setTimeout(() => {
      setErrorMsg('')
    }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification msg={errorMsg} />

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