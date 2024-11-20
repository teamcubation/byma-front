import React from 'react'
import './Modal.css'
import { Formulario } from '../Formulario/Formulario';

export const Modal = ({ esVisible, cerrar, id }) => {
    if (!esVisible) return null;

    return (
      <div className='contenedor-modal'>
        <div className='modal'>
          <button onClick={cerrar} className='boton-cerrar-modal'>
            X
          </button>
          <Formulario id = {id} cerrarModal = {cerrar} />
        </div>
      </div>
    );
  }
