import React, { useState, useEffect } from 'react'
import axios from 'axios'

const WeatherContent = (weatherData) => {
    const city = weatherData.location.name
    const temp = weatherData.current.temperature
    const desc = weatherData.current.weather_descriptions
    const icon = weatherData.current.weather_icons

    return (
        <div>
            <h2>Weather in {city}</h2>
            <br />
            <b>temperature:</b> {temp} Celsius
            <br />
            <img src={icon} alt={'Weather icon'} />
            <br />
            <b>wind:</b> {desc.wind_speed} mph direction {desc.wind_dir}
        </div>
    )
}

const Weather = ({ city }) => {
    const [ weatherData, setWeatherData ] = useState()
    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=6bc68d7d7cbb2743e72bed8a691bafe5&query=${city}`)
            .then(response => {
                setWeatherData(WeatherContent(response.data))})
    }, [city])

    return (
        <div>
            {weatherData}
        </div>
    )
}

const BasicData = ({ country }) => {
    return (
        <div>
            <h1> {country.name} </h1>
            capital {country.capital}
            <br />
            population {country.population}
            <h2> languages </h2>
            <ul> 
                {country.languages
                        .map(language => 
                            <li key={language.name}>{language.name} </li>
                        )} 
            </ul>
            <img src={country.flag} alt={`The flag of ${country.name}`} height='200'/>
            <Weather city={country.capital} />
        </div>
    )
}

const CountryList = ({ countries, handleClickedCountry }) => {
    return (
        <div>
            {countries.map(country => 
            <div key={country.name}> 
                {country.name} 
                <button value={country.name} onClick={handleClickedCountry}> show </button>
            </div>
            )}
        </div>
    )
}

const Countries = ({ countries, filter }) => {

    const [ clicked, setClicked ] = useState([])
    const handleClickedCountry = (event) => {
        const clickedCountry = countries.filter(country => country.name === event.target.value)
        setClicked(clickedCountry)
    }

    const filtered = countries.filter(country => 
        country.name.toLowerCase().includes(filter.toLowerCase()))

    if (clicked.length !== 0) {
        const country = clicked[0]
        return (
            <BasicData country={country} />
        )
    } else if (filtered.length > 10) {
        return (
            <p> Too many matches, specify another filter </p>
        )
    } else if (filtered.length === 1) {
        return (
            <BasicData country={filtered[0]} />
        )
    } else {
        return (
            <CountryList countries={filtered} handleClickedCountry={handleClickedCountry} />
        )
    }
}

const App = () => {
    const [ countries, setCountries ] = useState([])
    const [ filter, setNewFilter ] = useState('')

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const handleCountryChange = (event) => {
        setNewFilter(event.target.value)
    }

    return (
        <div>
            find countries<input value={filter} onChange={handleCountryChange} />
            <Countries countries={countries} filter={filter} />
        </div>
    );
}

export default App;
