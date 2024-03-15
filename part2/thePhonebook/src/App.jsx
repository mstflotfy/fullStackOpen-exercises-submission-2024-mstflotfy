import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
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
      <div>
        filter shown with 
        <input 
          value={nameFilter} 
          onChange={e => setNameFilter(e.target.value)}
        />
      </div>
      
      <form>
        <h2>add a new</h2>
        <div>
          name: <input 
                  type='text'
                  value={newName} 
                  onChange={e => setNewName(e.target.value)}
                />
        </div>
        <div>
          number: <input 
                  type='text'
                  value={newNumber} 
                  onChange={e => setNewNumber(e.target.value)}
                />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App