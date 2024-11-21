import { useState, useEffect } from "react";

function EspecieForm({ onAddEspecie, initialData = null }) {
    const initialFormState = {
        idEspecie: "",
        codigoCVSA: "",
        denominacion: "",
        laminaMinima: "",
        precio: "",
        cafci: "",
        cuentaDeEmision: "",
        estado: "Inactiva",
        idEmisor: "",
        idGerente: "",
        vigencia: "",
        plazoDeLiquidacion: "",
        codigoCNV: "",
        isin: "",
        familiaDeFondos: "",
        observaciones: "",
        movimiento: false,
        fechaAlta: "",
    };

    const [formData, setFormData] = useState(initialFormState);
    const [expandedCreationDetails, setExpandedCreationDetails] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData(initialFormState);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEspecie = {
            ...formData,
            idEspecie: Number(formData.idEspecie),
            precio: parseFloat(formData.precio),
            laminaMinima: parseInt(formData.laminaMinima),
            idEmisor: Number(formData.idEmisor),
            idGerente: Number(formData.idGerente),
        };
        onAddEspecie(newEspecie);
        resetForm();
    };
    const resetForm = () => {
        setFormData(initialFormState);
    };
    
    const toggleCreationDetails = () => {
        setExpandedCreationDetails(!expandedCreationDetails);
    };

    return (
            <form onSubmit={handleSubmit}>
                <h2 onClick={toggleCreationDetails} style={{ cursor: 'pointer', marginBottom: '10px' }}>
                    {initialData ? "Editar Especie" : "Crear Especie"}</h2>
                {expandedCreationDetails && (
                    <div>
                        <div>
                            <label>ID: </label>
                            <input
                                type="number"
                                name="idEspecie"
                                value={formData.idEspecie}
                                onChange={handleChange}
                                required
                                disabled={!!initialData}
                            />
                        </div>
                        <div>
                            <label>Código CVSA: </label>
                            <input
                                type="text"
                                name="codigoCVSA"
                                value={formData.codigoCVSA}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Denominación: </label>
                            <input
                                type="text"
                                name="denominacion"
                                value={formData.denominacion}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Lamina Mínima: </label>
                            <input
                                type="number"
                                name="laminaMinima"
                                value={formData.laminaMinima}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Precio: </label>
                            <input
                                type="number"
                                step="0.01"
                                name="precio"
                                value={formData.precio}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>CAFCI: </label>
                            <input
                                type="text"
                                name="cafci"
                                value={formData.cafci}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Cuenta de Emisión: </label>
                            <input
                                type="text"
                                name="cuentaDeEmision"
                                value={formData.cuentaDeEmision}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Estado: </label>
                            <select
                                name="estado"
                                value={formData.estado}
                                onChange={handleChange}
                            >
                                <option value="Activa">Activa</option>
                                <option value="Inactiva">Inactiva</option>
                            </select>
                        </div>
                        <div>
                            <label>ID Emisor: </label>
                            <input
                                type="Number"
                                name="idEmisor"
                                value={formData.idEmisor}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>ID Gerente: </label>
                            <input
                                type="Number"
                                name="idGerente"
                                value={formData.idGerente}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Vigencia: </label>
                            <input
                                type="date"
                                name="vigencia"
                                value={formData.vigencia}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Plazo de Liquidación: </label>
                            <input
                                type="date"
                                name="plazoDeLiquidacion"
                                value={formData.plazoDeLiquidacion}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Código CNV: </label>
                            <input
                                type="text"
                                name="codigoCNV"
                                value={formData.codigoCNV}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>ISIN: </label>
                            <input
                                type="text"
                                name="isin"
                                value={formData.isin}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Familia de Fondos: </label>
                            <input
                                type="text"
                                name="familiaDeFondos"
                                value={formData.familiaDeFondos}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Observaciones: </label>
                            <input
                                type="text"
                                name="observaciones"
                                value={formData.observaciones}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Movimiento: </label>
                            <select
                                name="movimiento"
                                value={formData.movimiento}
                                onChange={handleChange}
                            >
                                <option value="true">Sí</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <div>
                            <label>Fecha Alta: </label>
                            <input
                                type="date"
                                name="fechaAlta"
                                value={formData.fechaAlta}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit">
                            {initialData ? "Guardar Cambios" : "Agregar Especie"}
                        </button>
                    </div>)}
            </form>
    );
}

export default EspecieForm;
