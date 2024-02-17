import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import axios from 'axios'

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
        if (filtered.length > 10) {
          setList('too many matches')
        } else {
          setList(
            filtered.map(country => <p key={country.name.common}>{country.name.common}</p>
          )
          )
        }
      }
    })
}, [contry])




  return (
    <>
    find countries <input value={contry} onChange={handleCountryChange} />
    <br />
    {list}
    </>
  )
}

export default App