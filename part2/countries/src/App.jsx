import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY
// variable api_key now has the value set in startup
console.log(api_key)

const Weather = ({capital}) => {
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
    .then(response => {
      console.log(response.data)
      setWeather(response.data)
    })
}, [capital])
  if (weather === null) {
    return null
  }
  console.log(weather.weather.icon)
  const src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  return (
    <>
    <h2>Weather in {capital}</h2>
    <p><b>Temperature:</b> {(((weather.main.temp)-32)*5)/9} Celsius</p>
    <img src={src} alt="weather" width="100" height="100" />
    <p><b>Wind:</b> {weather.wind.speed} m/s</p>
    </>
  )
}
const Showbutton = ({country, handleShow}) => {
  return (
    <button onClick={() => handleShow(country)}>show</button>
  )
}

const Find = ({country, handleCountryChange}) => {
  return (
    <div>
      find countries <input value={country} onChange={handleCountryChange} />
    </div>
  )
}

const Country = ({country,handleShow}) => {
  if (country === null) {
    return null
  }

  if (country.length > 1 && country.length <= 10) {
    return (
      <>
      {country.map(country => <div key={country.name.common}>{country.name.common} <Showbutton country={country} handleShow={handleShow} /></div>)}
      </>
    )
  }

  if (country === "Too many matches, specify another filter") {
    return <p>{country}</p>
  }
  const capital = country.capital
  return (
    <>
    <h1>{country.name.common}</h1>
    <p>Capital {country.capital}</p>
    <p>Area {country.area}</p>
    <h2>Languages</h2>
    <ul>
      {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
    </ul>
    <img src={country.flags.png} alt="flag" width="100" height="100" />
    <Weather capital={capital} />



    </>
  )
}

const App = () => {
  const [country, setCountry] = useState('')
  const [list, setList] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null);

  
  const handleCountryChange = (e) => {
    console.log(e.target)
    setCountry(e.target.value)
  }
  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then(response => {
      console.log(response.data)
      if (country !== null && country !== "") {
        const filtered = response.data.filter(country2 => country2.name.common.toLowerCase().includes(country.toLowerCase()))
        if (filtered.length === 1) {
          setList(filtered[0])
        } else if (filtered.length <= 10) {
          setList(filtered)
        }else if (filtered.length > 10){
          setList("Too many matches, specify another filter")
        }
      
      }
    })
}, [country])
  
  const handleShow = (country) => {
    setSelectedCountry(country);
  };



  return (
    <>
    <Find country={country} handleCountryChange={handleCountryChange} />
    <br/>
    <Country country={selectedCountry ? selectedCountry : list} handleShow={handleShow}/>
    </>
  )
}

export default App