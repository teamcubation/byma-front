import { useState } from "react";

function SearchEspecieForm({ onSearchEspecie }) {
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const searchEspecieById = async () => {
    try {
      const result = await onSearchEspecie(searchId);
      setSearchResult(result || null);
    } catch (error) {
      console.error("Error al buscar la especie", error);
      setSearchResult(null);
    }
  };

  return (
    <div>
      <h3>Buscar Especie por ID</h3>
      <input
        type="number"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        placeholder="Ingresar ID"
      />
      <button onClick={searchEspecieById}>Buscar</button>
      {searchResult ? (
        <div>
          <h4>Resultado:</h4>
          <p>
            <strong>{searchResult.denominacion}</strong> - 
            Código CVSA: {searchResult.codigoCVSA},
            Lámina Mínima: {searchResult.laminaMinima},
            Precio: ${searchResult.precio}, 
            CAFCI: {searchResult.cafci},
            Cuenta de Emisión: {searchResult.cuentaDeEmision},
            ID Estado: {searchResult.estado},
            ID Emisor: {searchResult.idEmisor},
            Gerente: {searchResult.idGerente},
            Vigencia: {searchResult.vigencia},
            Plazo de Liquidación: {searchResult.plazoDeLiquidacion},
            Código CNV: {searchResult.codigoCNV},
            ISIN: {searchResult.isin},
            Familia de Fondos: {searchResult.familiaDeFondos},
            Observaciones: {searchResult.observaciones},
            Movimiento: {searchResult.movimiento ? "Sí" : "No"},
            Fecha Alta: {searchResult.fechaAlta},
          </p>
        </div>
      ) : searchId && (
        <p>No se encontró ninguna especie con el ID {searchId}</p>
      )}
    </div>
  );
}

export default SearchEspecieForm;
