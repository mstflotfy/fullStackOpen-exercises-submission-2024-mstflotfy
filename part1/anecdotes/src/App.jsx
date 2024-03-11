import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  const getRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const selectRandom = () => {
    const rand = getRandomNum(0, 7)
    //console.log(rand)
    setSelected(rand)
  }

  const [points, setPoints] = useState(new Array(8).fill(0))

  const vote = () => {
    //console.log('before vote: ', points)
    const pointsCopy = [...points]
    pointsCopy[selected] += 1
    setPoints(pointsCopy)
    //console.log('after vote ', points) // not the correct val!
  }

  const getMostVoted = () => {
    const maxVal = Math.max(...points)
    //console.log('max: ', maxVal)
    return points.findIndex(val => val === maxVal)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <button onClick={vote}>vote</button>
      <button onClick={selectRandom}>next anecdote</button>

      <p>Points: {points.join(' ')}</p>

      <h2>Anecdote with the most votes</h2>
      <p>{anecdotes[getMostVoted()]}</p>
    </div>
  )
}

export default App