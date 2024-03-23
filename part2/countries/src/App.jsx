import { useEffect, useMemo, useState } from 'react'
import countriesService from './services/countriesService'
import CountriesForm from './components/CountriesForm'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [errorMsg, setErrorMsg] = useState('')

  const countriesToShow = useMemo(() => {
    return !searchQuery ? [] :
      countries
        .filter(country => country.name.common.toLowerCase().includes(searchQuery.toLowerCase()))

  }, [searchQuery, countries])

  useEffect(() => {
    countriesService.getAll()
      .then(returnedCountries => setCountries(returnedCountries))
      .catch(e => {
        alert('Could not get countries info from server :(  Error msg: ' + e)
      })
  }, [])

  useEffect(() => {
    if (countriesToShow.length > 10) {
      setErrorMsg('Too many matches, specify another filter')
    } else {
      setErrorMsg('')
    }
  }, [countriesToShow])


  return (
    <div>
      <h1>Data for Countries</h1>
      <CountriesForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        countriesToShow={countriesToShow}
        errorMsg={errorMsg}
      />
    </div>

  )
}

export default App
