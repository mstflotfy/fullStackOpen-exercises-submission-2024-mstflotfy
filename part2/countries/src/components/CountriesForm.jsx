import CountryList from "./CountryList"

const CountriesForm = ({searchQuery, setSearchQuery, countriesToShow, errorMsg}) => {
  return (
     <form>
      <label>Find countries</label>
      <input type='text' value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)}/>
      <CountryList countriesToShow={countriesToShow} errorMsg={errorMsg} />
     </form>
  )

}

export default CountriesForm