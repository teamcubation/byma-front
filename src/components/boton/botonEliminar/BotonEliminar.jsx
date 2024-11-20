import React from 'react'
import { eliminarEmisor } from '../../../services/ApiService';

export const BotonEliminar = ({id}) => {

  const eliminar = async () => {
    await eliminarEmisor(id);
  }

  return (
    <button onClick={eliminar}>botonEliminar</button>
  )
}
