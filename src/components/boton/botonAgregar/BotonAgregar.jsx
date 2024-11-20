import {React , useState} from 'react'
import './BotonAgregar.css'
import { Modal } from '../../modal/Modal';

export const BotonAgregar = () => {
  const [modalAbierto, setModalAbierto] = useState(false);

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  return (
    <div className='contenedor-boton-agregar'>
      <h2>Emisores</h2>
      <div className='boton-agregar'>
        <img src="/images/icono-agregar.png" alt="" />
        <button onClick={abrirModal}>Nuevo Emisor</button>
        <Modal esVisible={modalAbierto} cerrar={cerrarModal} />
      </div>
    </div>
  )
}
