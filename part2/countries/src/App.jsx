import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import axios from 'axios'

const Find = ({country, handleCountryChange}) => {
  return (
    <div>
      find countries <input value={country} onChange={handleCountryChange} />
    </div>
  )
}

const Country = ({country}) => {
  if (country === null) {
    return null
  }

  if (country.length > 1 && country.length <= 10) {
    return (
      <ul>
        {country.map(country => <li key={country.name.common}>{country.name.common}</li>)}
      </ul>
    )
  }

  
  if (country === null) {
    return null
  }
  if (country === "Too many matches, specify another filter") {
    return <p>{country}</p>
  }
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



    </>
  )
}

const App = () => {
  const [contry, setContry] = useState('')
  const [list, setList] = useState(null)
  
  const handleCountryChange = (e) => {
    console.log(e.target)
    setContry(e.target.value)
  }
  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then(response => {
      console.log(response.data)
      if (contry !== '') {
        const filtered = response.data.filter(country => country.name.common.toLowerCase().includes(contry.toLowerCase()))
        if (filtered.length === 1) {
          setList(filtered[0])
        } else if (filtered.length <= 10) {
          setList(filtered)
        }else if (filtered.length > 10){
          setList("Too many matches, specify another filter")
        }
      
      }
    })
}, [contry])




  return (
    <>
    <Find country={contry} handleCountryChange={handleCountryChange} />
    <br/>
    <Country country={list} />
    </>
  )
}

export default App