import React from 'react'

export default function Clima({weather}) {
  return (
    <div className='mt-7 bg-amber-50 p-6
    rounded-lg shadow-md text-center'>
      <h1 className='text-2xl font-bold text-amber-950
      '> {weather.name}</h1>
      <h3 className='text-4xl font-bold'>{weather.temperature}</h3>
      <p className='text-3xl '>{weather.description}</p>
      <img className='mx-auto'
      width={50} 
      heigth={50}
      src={weather.icon}/>
    </div>


  
  )
}
