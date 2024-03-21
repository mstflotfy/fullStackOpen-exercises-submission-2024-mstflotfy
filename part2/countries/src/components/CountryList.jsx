const CountryList = ({countriesToShow, errorMsg}) => {

  const showCountry = countriesToShow.length === 1 ? true : false
  const singleCountry = countriesToShow[0]

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
          {singleCountry.languages && Object.keys(singleCountry.languages).map(k => <li key={k}>{singleCountry.languages[`${k}`]}</li>)}
        </ul>
        <img src={singleCountry.flags.png} alt='flag'/>

      </>
    )
  } else {
    return (
      <ul>
        {countriesToShow.map(country => <li key={country.cca3}>{country.name.common}</li>)}
      </ul>
    )
  }
}

export default CountryList