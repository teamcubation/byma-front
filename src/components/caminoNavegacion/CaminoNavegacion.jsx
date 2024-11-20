import React from 'react'
import './CaminoNavegacion.css'

export const CaminoNavegacion = () => {
  return (
    <div className='camino-navegacion'>
      <a href="/">Home</a>
      <img src="/images/icono-camino-navegacion.png" alt="" className='icono-camino-navegacion' />
      <a href="/" style={{color: 'black'}}>Creacion de Emisores</a>
    </div>
  )
}
