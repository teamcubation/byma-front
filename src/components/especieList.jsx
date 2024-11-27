import { useState, useEffect } from "react";
import EspecieForm from "./especieForm";
import SearchEspecieForm from "./SearchEspecieForm";
import Api from "../api";
function EspeciesList() {
  const [especies, setEspecies] = useState([]);
  useEffect(() => {
    const fetchEspecies = async () => {
      try {
        const response = await Api.get('');
        setEspecies(response.data);
      } catch (error) {
        console.error("Error al obtener las especies", error);
      }
    };

    fetchEspecies();
  }, []);

  const [editingEspecie, setEditingEspecie] = useState(null);
  const [expandedEspecieId, setExpandedEspecieId] = useState(null);

  const addEspecie = async (newEspecie) => {
    try {
      const response = await Api.post('', newEspecie);
      setEspecies([...especies, response.data]);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error inesperado";
      alert("Error: " + errorMessage);
    }
  };


  const editEspecie = (especie) => {
    setEditingEspecie(especie);
  };

  const saveEspecie = async (updatedEspecie) => {
    try {
      await Api.put(`/${updatedEspecie.idEspecie}`, updatedEspecie);
      setEspecies(
        especies.map((especie) =>
          especie.idEspecie === updatedEspecie.idEspecie ? updatedEspecie : especie
        )
      );
      setEditingEspecie(null);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error inesperado";
      alert("Error: " + errorMessage);
    }
  };


  const deleteEspecie = async (idEspecie) => {
    if (window.confirm("¿Estás seguro de que querés eliminar esta especie?")) {
      try {
        await Api.delete(`/${idEspecie}`);
        setEspecies(especies.filter((especie) => especie.idEspecie !== idEspecie));
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Error inesperado";
        alert("Error: " + errorMessage);
      }
    }
  };


  const searchEspecieById = async (searchId) => {
    try {
      const response = await Api.get(`/${searchId}`);
      return response.data;
    } catch (error) {
      alert(error);
      const errorMessage =
        error.response?.data?.message || "Error inesperado";
      alert("Error: " + errorMessage);
      return null;
    }
  };

  const toggleEspecieDetails = (idEspecie) => {
    setExpandedEspecieId(expandedEspecieId === idEspecie ? null : idEspecie);
  };
  const startCreation = () => {
    setEditingEspecie(null);
    setExpandedEspecieId(null);
  };
  return (
      <div>
      <button onClick={startCreation}>Crear nueva especie</button>
      <SearchEspecieForm onSearchEspecie={searchEspecieById} />
      <ul>
        {especies.map((especie) => (
          <li key={especie.idEspecie}>
            <div onClick={() => toggleEspecieDetails(especie.idEspecie)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
              <strong>{especie.denominacion}</strong> - Precio: ${especie.precio}
            </div>
            <div>
              <button onClick={() => editEspecie(especie)}>Editar</button>
              <button onClick={() => deleteEspecie(especie.idEspecie)}>Eliminar</button>
            </div>

            {expandedEspecieId === especie.idEspecie && (
              <div>
                <p><strong>Código CVSA:</strong> {especie.codigoCVSA}</p>
                <p><strong>Lámina Mínima:</strong> {especie.laminaMinima}</p>
                <p><strong>CAFCI:</strong> {especie.cafci}</p>
                <p><strong>Cuenta de Emisión:</strong> {especie.cuentaDeEmision}</p>
                <p><strong>Estado:</strong> {especie.estado}</p>
                <p><strong>ID Emisor:</strong> {especie.idEmisor}</p>
                <p><strong>ID Gerente:</strong> {especie.idGerente}</p>
                <p><strong>Vigencia:</strong> {especie.vigencia}</p>
                <p><strong>Plazo de Liquidación:</strong> {especie.plazoDeLiquidacion}</p>
                <p><strong>Código CNV:</strong> {especie.codigoCNV}</p>
                <p><strong>ISIN:</strong> {especie.isin}</p>
                <p><strong>Familia de Fondos:</strong> {especie.familiaDeFondos}</p>
                <p><strong>Observaciones:</strong> {especie.observaciones}</p>
                <p><strong>Movimiento:</strong> {especie.movimiento ? "Sí" : "No"}</p>
                <p><strong>Fecha Alta:</strong> {especie.fechaAlta}</p>
              </div>
            )}

          </li>
        ))}
      </ul>

      {editingEspecie ? (
        <EspecieForm
          onAddEspecie={saveEspecie}
          initialData={editingEspecie}
        />
      ) : (
        <EspecieForm onAddEspecie={addEspecie} />
      )}
    </div>
  );
}

export default EspeciesList;
