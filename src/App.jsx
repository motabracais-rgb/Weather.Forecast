import React, { useState } from 'react'
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
    
    <div className="bg-amber-400 min-h-screen
    flex flex-col items-center p-10">
      <div>
        <h1 className="text-3xl font-black text-amber-800 nb-3">🌥️Previsão de tempo🌤️</h1>
      </div>
      <div className="bg-amber-50 shadow-lg
      rounded-xl p-5">

      <input className='p-2 border border-amber-950 rounded-xl focus:outline-none focus:ring-2
      focus:ring-amber-500 ' placeholder = 'Informe uma cidade'
      onChange={(event)=> setCityName(event.target.value)}
      />
      <button 
        className="bg-amber-700 ms-5 rounded-xl p-2 text-amber-50 font-bold hover:bg-amber-500
        transition duration-300
        "
        onClick={searchWeather}
        >Pesquisar</button>
      </div>
   

   {
    weather &&
         <Clima weather={weather}/>
   }
    {error && <p className='text-red-700'> Cidade inválida! </p>}
    {loading && <p className='text-amber-800'> Carregando... </p>}


    </div>
  
  )
}

export default App
