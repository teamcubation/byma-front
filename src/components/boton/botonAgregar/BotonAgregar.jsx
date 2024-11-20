import React from 'react'
import './BotonAgregar.css'

export const BotonAgregar = () => {
  return (
    <div className='contenedor-boton-agregar'>
      <h2>Emisores</h2>
      <div className='boton-agregar'>
        <img src="/images/icono-agregar.png" alt="" />
        <button>Nuevo Emisor</button>
      </div>
    </div>
  )
}
