import React from 'react'
import './Buscador.css'

export const Buscador = () => {
  return (
    <div className='contenedor-buscador'>
        <img src="/images/icono-buscador.png" alt="" className='icono-buscador' />
        <input type='text' placeholder='Buscar'></input>
    </div>
    
  )
}
