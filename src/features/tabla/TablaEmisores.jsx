import React, { useEffect, useState } from 'react';
import './TablaEmisores.css'
import { BotonEditar } from '../../components/boton/botonEditar/BotonEditar'
import { BotonEliminar } from '../../components/boton/botonEliminar/BotonEliminar'
import { fetchData } from '../../services/ApiService';

const encabezadosTabla = [
  "Denominacion",
  "Email",
  "Fecha Alta",
  "Cuenta Emisor",
  "ID Organizacion",
  "ID Entidad Legal"
]

export const TablaEmisores = () => {
    const [emisores, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const data = await fetchData('/api/emisores');
                setUsers(data);
            } catch (error) {
                setError(error.message);
            }
        };

        getUsers();
    }, []);

    if (error) {
        return <p>Error: {error}</p>;
    }


  return (
    emisores.length === 0 ? (
        <p>No hay emisores registrados.</p>
    ) : 
    (<div className='tabla-emisores'> 
        <table>
            <thead>
                <tr className='tabla-encabezado'>
                    <th>
                    <label class="checkbox-label">
                        <input class="checkbox-tabla" type="checkbox" />
                        <span class="custom-checkbox"></span>
                    </label>
                    </th>
                    {encabezadosTabla.map((encabezado) => (
                        <th key={encabezado}>
                            {encabezado} 
                            <div>
                            <img src='/images/flechas-encabezado-tabla.png'></img>
                            </div> 
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody className='tabla-cuerpo'>
                {emisores.map((emisor) => (
                    <tr key={emisor.id} className='tabla-elementos'>
                        <td>
                            <label class="checkbox-label">
                                <input class="checkbox-tabla" type="checkbox" />
                                <span class="custom-checkbox"></span>
                            </label>
                        </td>
                        <td>{emisor.denominacion}</td>
                        <td>{emisor.email}</td>
                        <td>{emisor.fechaAlta.toLocaleString()}</td>
                        <td>{emisor.cuentaEmisor}</td>
                        <td>{emisor.idOrganizacion}</td>
                        <td>{emisor.idEntidadLegal}</td>
                        <BotonEditar/>
                        <BotonEliminar/>
                    </tr>
                ))
                }
            </tbody>
        </table> 
    </div>)   
  )
}
