import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Clima from './Clima'

function App() {
  const [cityName, setCityName] = useState(" ")
  const [weather, setWeather ] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function searchWeather() {
    if(!cityName.trim()){
      setError("Informe uma cidade válida!")
      setWeather(null)
      return
    }
     
    setLoading(true)
    setError(null)
    setWeather(null)

try {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=6fa075125c2a4a329ff707c1f429ddf0&units=metric&lang=pt`
      );
    if(!response.ok){
      if(response.status === 404 ){
        setError("404 - NOT FOUND")
      } else{
        setError("Acontecue um erro. Tente novamente mais tarde.")
      }
    }

    const data = await response.json()
    setWeather({
      name: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    })

} catch (error) {
  setError(error.message)
  
} finally {
  setLoading(false)
}



  }
  return(
    <div>
      <div>
        <h1>🌥️Previsão de tempo🌤️</h1>
      </div>
      <div>

      <input placeholder = 'Informe uma cidade'
      onChange={(event)=> setCityName(event.target.value)}
      />
      <button
        onClick={searchWeather}
        >Pesquisar</button>
      </div>
   

   {
    weather &&
         <Clima weather={weather}/>
   }
    </div>
  
  )
}

export default App
