import React, { useEffect, useState } from 'react'
import { agregarEmisor, actualizarEmisor } from '../../services/ApiService.js'


export const Formulario = ( { id = null, cerrarModal } ) => {

    const [datosFormulario, setFormulario] = useState({
        denominacion: "",
        email: "",
        cuentaEmisor: "",
        idOrganizacion: "",
        idEntidadLegal: ""
    })

    const actualizarDatos = (e) => {
        const {name, value} = e.target;

        setFormulario({
            ...datosFormulario,
            [name]: value
        })
    }

    const enviarDatos = async (evento) => {
        evento.preventDefault();
    
        const newItem = id == null ? await agregarEmisor(datosFormulario) : actualizarEmisor(id, datosFormulario);
        setFormulario({
            denominacion: "",
            email: "",
            cuentaEmisor: "",
            idOrganizacion: "",
            idEntidadLegal: ""
        });
        {cerrarModal()}
    }

    return (
        <form onSubmit={enviarDatos}>
            <div>
            <label>Denominacion:</label>
            <input
                type="text"
                placeholder="Ingresa denominacion"
                name="denominacion"
                onChange={actualizarDatos}
            />
            </div>
            
            <div>
            <label>Correo electrónico:</label>
            <input
                type="email"
                placeholder="Ingresa tu correo"
                name="email"
                onChange={actualizarDatos}
            />
            </div>

            <div>
            <label>Cuenta Emisor:</label>
            <input
                type="text"
                placeholder="Ingresa la cuenta emisor"
                name="cuentaEmisor"
                onChange={actualizarDatos}
            />
            </div>

            <div>
            <label>ID Organizacion:</label>
            <input
                type="number"
                placeholder="Ingresa el ID organizacion"
                name="idOrganizacion"
                onChange={actualizarDatos}
            />
            </div>

            <div>
            <label>ID Entidad Legal:</label>
            <input
                type="number"
                placeholder="Ingresa el ID entidad legal"
                name="idEntidadLegal"
                onChange={actualizarDatos}
            />
            </div>

            <button type="submit">Enviar</button>
        </form>
    )
}
