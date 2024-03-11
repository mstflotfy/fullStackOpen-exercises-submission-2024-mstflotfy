import { useState } from 'react'

const Button = ({handler, txt}) => {
  return (
    <button onClick={handler}>{txt}</button>
  )
}

const Statistics = ({good, neutral, bad, all, avg, positive}) => {
  if (all) {
    return (
      <div>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <StatisticLine stat='good' val={good} />
            <StatisticLine stat='neutral' val={neutral} />
            <StatisticLine stat='bad' val={bad} />
            <StatisticLine stat='all' val={all} />
            <StatisticLine stat='all' val={all} />
            <StatisticLine stat='average' val={avg} />
            <StatisticLine stat='positive' val={positive} />
          </tbody>
        </table>
      </div>
    )
  } else {
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
}

const StatisticLine = ({stat, val}) => {
  return (
    <tr>
    <td>{stat}</td>
    <td>{val}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const allScores = (scores) => scores.reduce((acc, ele) => acc + ele, 0)
  const avg = () => {
    const total = good + (bad * -1)
    return total / allScores([good, neutral, bad]) || 0
  }
  const positiveFeedback = () => {
    return (good * 100) / allScores([good, neutral, bad]) || 0
  }

  return (
    <div>
      <h2>Give feedback</h2>
      <Button handler={()=> setGood(good + 1)} txt="good" />
      <Button handler={()=> setNeutral(neutral + 1)} txt="neutral" />
      <Button handler={()=> setBad(bad + 1)} txt="bad" />

      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad} 
        all={allScores([good, bad, neutral])}
        avg={avg()}
        positive={positiveFeedback()}
      />

    </div>
  )
}

export default App