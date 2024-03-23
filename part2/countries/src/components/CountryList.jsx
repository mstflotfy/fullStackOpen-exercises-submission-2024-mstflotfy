import { useEffect, useState } from "react"
import weatherService from "../services/weatherService"

const CountryList = ({countriesToShow, errorMsg, setSearchQuery}) => {

  const [currentWeather, setCurrentWeather] = useState(null)
  const [iconUrl, setIconUrl] = useState('')

  const showCountry = countriesToShow.length === 1 ? true : false
  const singleCountry = countriesToShow[0]

  const handleShowCountry = (e, name) => {
    e.preventDefault()
    console.log(name)
    setSearchQuery(name)
  }

  useEffect(() => {
    if (singleCountry) {
      weatherService
        .getOne(singleCountry.latlng[0], singleCountry.latlng[1])
        .then(weather => setCurrentWeather(weather))
        .catch(e => console.log(e))
    }
  }, [singleCountry])

  useEffect(() => {
    if (currentWeather) setIconUrl(`https://openweathermap.org/img/wn/${currentWeather['weather'][0].icon}@2x.png`)
  }, [currentWeather])

  if (errorMsg) {
    return(
      <p>{errorMsg}</p>
    )
  } else if (showCountry) {
    return (
      <>
        <h2>{singleCountry.name.common}</h2>
        <p>Captial {singleCountry.capital}</p>
        <p>Area {singleCountry.area}</p>
        <h3>Languages</h3>
        <ul>
          {singleCountry.languages && Object.keys(singleCountry.languages).map(k => 
            <li key={k}>{singleCountry.languages[`${k}`]}</li>)}
        </ul>
        <img src={singleCountry.flags.png} alt='flag'/>

        <h2>Weather in {singleCountry.name.common}</h2>

          <p>Temerature  {(currentWeather.main['temp'] - 273.15).toFixed(2)} Celcius</p>
          <img src={`${iconUrl}`} alt='icon' />
          <p>Wind   {currentWeather.wind.speed}</p>

      </>
    )
  } else {
    return (
      <ul>
        {countriesToShow.map(country => <li key={country.cca3}>{country.name.common} <button onClick={(e) => handleShowCountry(e, country.name.common)}>show</button></li>)}
      </ul>
    )
  }
}

export default CountryList