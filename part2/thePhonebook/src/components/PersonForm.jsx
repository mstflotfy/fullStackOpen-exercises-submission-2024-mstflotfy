const PersonForm = ({newName, setNewName, newNumber, setNewNumber, handleSubmit}) => {
  return (
    <form>
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
  )
}

export default PersonForm