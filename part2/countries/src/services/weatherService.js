import axios from "axios";

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const appid = import.meta.env.VITE_OW_K

// Example
//https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key}

const getOne = async (lat, lon) => {
  try {
    const response = await axios.get(`${baseUrl}`, {
      params: {
        lat,
        lon,
        appid
      }
    })
    return response.data
  } catch (e) {
    console.error(`Error fetching weather data: `, e)
  }
}

export default { getOne }