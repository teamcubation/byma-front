import {React , useState} from 'react'
import { Modal } from '../../modal/Modal';

export const BotonEditar = ({ id }) => {
  const [modalAbierto, setModalAbierto] = useState(false);

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  return (
    <>
      <button onClick={abrirModal}>Editar</button>
      <Modal esVisible={modalAbierto} cerrar={cerrarModal} id = {id} />
    </>
  )
}
