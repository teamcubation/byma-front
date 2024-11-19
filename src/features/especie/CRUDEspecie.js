import React, {useState, useEffect} from 'react'
import './CRUDEspecie.css'
import RegistroEspecie from './RegistroEspecie';

const especies = [
    {
      idEspecie: 1,
      codigoCVSA: "CVSA001",
      denominacion: "Especie A",
      laminaMinima: 10,
      precio: 100.5,
      cafci: "CAF123",
      cuentaDeEmision: "EMI001",
      estado: "Activo",
      idEmisor: 101,
      idGerente: 201,
      vigencia: "2024-11-19T00:00:00",
      plazoDeLiquidacion: "2024-12-01T00:00:00",
      codigoCNV: "CNV001",
      isin: "ISIN001",
      familiaDeFondos: "Fondo A",
      observaciones: "Observación A",
      movimiento: true,
      fechaAlta: "2024-11-01T00:00:00"
    },
    {
      idEspecie: 2,
      codigoCVSA: "CVSA002",
      denominacion: "Especie B",
      laminaMinima: 20,
      precio: 200.75,
      cafci: "CAF124",
      cuentaDeEmision: "EMI002",
      estado: "Inactivo",
      idEmisor: 102,
      idGerente: 202,
      vigencia: "2024-11-20T00:00:00",
      plazoDeLiquidacion: "2024-12-02T00:00:00",
      codigoCNV: "CNV002",
      isin: "ISIN002",
      familiaDeFondos: "Fondo B",
      observaciones: "Observación B",
      movimiento: false,
      fechaAlta: "2024-11-02T00:00:00"
    },
    {
      idEspecie: 3,
      codigoCVSA: "CVSA003",
      denominacion: "Especie C",
      laminaMinima: 15,
      precio: 150.0,
      cafci: "CAF125",
      cuentaDeEmision: "EMI003",
      estado: "Activo",
      idEmisor: 103,
      idGerente: 203,
      vigencia: "2024-11-21T00:00:00",
      plazoDeLiquidacion: "2024-12-03T00:00:00",
      codigoCNV: "CNV003",
      isin: "ISIN003",
      familiaDeFondos: "Fondo C",
      observaciones: "Observación C",
      movimiento: true,
      fechaAlta: "2024-11-03T00:00:00"
    },
    {
      idEspecie: 4,
      codigoCVSA: "CVSA004",
      denominacion: "Especie D",
      laminaMinima: 25,
      precio: 250.25,
      cafci: "CAF126",
      cuentaDeEmision: "EMI004",
      estado: "Suspendido",
      idEmisor: 104,
      idGerente: 204,
      vigencia: "2024-11-22T00:00:00",
      plazoDeLiquidacion: "2024-12-04T00:00:00",
      codigoCNV: "CNV004",
      isin: "ISIN004",
      familiaDeFondos: "Fondo D",
      observaciones: "Observación D",
      movimiento: false,
      fechaAlta: "2024-11-04T00:00:00"
    },
    {
      idEspecie: 5,
      codigoCVSA: "CVSA005",
      denominacion: "Especie E",
      laminaMinima: 30,
      precio: 300.99,
      cafci: "CAF127",
      cuentaDeEmision: "EMI005",
      estado: "Activo",
      idEmisor: 105,
      idGerente: 205,
      vigencia: "2024-11-23T00:00:00",
      plazoDeLiquidacion: "2024-12-05T00:00:00",
      codigoCNV: "CNV005",
      isin: "ISIN005",
      familiaDeFondos: "Fondo E",
      observaciones: "Observación E",
      movimiento: true,
      fechaAlta: "2024-11-05T00:00:00"
    },
    {
      idEspecie: 6,
      codigoCVSA: "CVSA006",
      denominacion: "Especie F",
      laminaMinima: 35,
      precio: 350.15,
      cafci: "CAF128",
      cuentaDeEmision: "EMI006",
      estado: "Inactivo",
      idEmisor: 106,
      idGerente: 206,
      vigencia: "2024-11-24T00:00:00",
      plazoDeLiquidacion: "2024-12-06T00:00:00",
      codigoCNV: "CNV006",
      isin: "ISIN006",
      familiaDeFondos: "Fondo F",
      observaciones: "Observación F",
      movimiento: false,
      fechaAlta: "2024-11-06T00:00:00"
    },
    {
      idEspecie: 7,
      codigoCVSA: "CVSA007",
      denominacion: "Especie G",
      laminaMinima: 40,
      precio: 400.45,
      cafci: "CAF129",
      cuentaDeEmision: "EMI007",
      estado: "Activo",
      idEmisor: 107,
      idGerente: 207,
      vigencia: "2024-11-25T00:00:00",
      plazoDeLiquidacion: "2024-12-07T00:00:00",
      codigoCNV: "CNV007",
      isin: "ISIN007",
      familiaDeFondos: "Fondo G",
      observaciones: "Observación G",
      movimiento: true,
      fechaAlta: "2024-11-07T00:00:00"
    },
    {
      idEspecie: 8,
      codigoCVSA: "CVSA008",
      denominacion: "Especie H",
      laminaMinima: 45,
      precio: 450.75,
      cafci: "CAF130",
      cuentaDeEmision: "EMI008",
      estado: "Suspendido",
      idEmisor: 108,
      idGerente: 208,
      vigencia: "2024-11-26T00:00:00",
      plazoDeLiquidacion: "2024-12-08T00:00:00",
      codigoCNV: "CNV008",
      isin: "ISIN008",
      familiaDeFondos: "Fondo H",
      observaciones: "Observación H",
      movimiento: false,
      fechaAlta: "2024-11-08T00:00:00"
    },
    {
      idEspecie: 9,
      codigoCVSA: "CVSA009",
      denominacion: "Especie I",
      laminaMinima: 50,
      precio: 500.25,
      cafci: "CAF131",
      cuentaDeEmision: "EMI009",
      estado: "Activo",
      idEmisor: 109,
      idGerente: 209,
      vigencia: "2024-11-27T00:00:00",
      plazoDeLiquidacion: "2024-12-09T00:00:00",
      codigoCNV: "CNV009",
      isin: "ISIN009",
      familiaDeFondos: "Fondo I",
      observaciones: "Observación I",
      movimiento: true,
      fechaAlta: "2024-11-09T00:00:00"
    },
    {
      idEspecie: 10,
      codigoCVSA: "CVSA010",
      denominacion: "Especie J",
      laminaMinima: 55,
      precio: 550.99,
      cafci: "CAF132",
      cuentaDeEmision: "EMI010",
      estado: "Inactivo",
      idEmisor: 110,
      idGerente: 210,
      vigencia: "2024-11-28T00:00:00",
      plazoDeLiquidacion: "2024-12-10T00:00:00",
      codigoCNV: "CNV010",
      isin: "ISIN010",
      familiaDeFondos: "Fondo J",
      observaciones: "Observación J",
      movimiento: false,
      fechaAlta: "2024-11-10T00:00:00"
    }
  ]; 

function CRUDEspecie() {
    return (
        <>
        <h1>Tabla de Especies</h1>
        <table className='table'>
            <tr>
                <th>idEspecie</th>
                <th>codigoCVSA</th>
                <th>denominacion</th>
                <th>laminaMinima</th>
                <th>precio</th>
                <th>cafci</th>
                <th>cuentaDeEmision</th>
                <th>estado</th>
                <th>idEmisor</th>
                <th>idGerente</th>
                <th>vigencia</th>
                <th>plazoDeLiquidacion</th>
                <th>codigoCNV</th>
                <th>isin</th>
                <th>familiaDeFondo</th>
                <th>observaciones</th>
                <th>movimiento</th>
                <th>fechaAlta</th>
            </tr>
            {
                especies.map(especie => {
                    const {idEspecie, codigoCVSA, denominacion, laminaMinima, precio, cafci, cuentaDeEmision, estado, idEmisor, idGerente,
                        vigencia, plazoDeLiquidacion, codigoCNV, isin, familiaDeFondos, observaciones, movimiento, fechaAlta} = especie
                     // No se puede repetir la key, es para identificar univocamente a cada objeto
                   return(
                        <RegistroEspecie key={idEspecie} idEspecie={idEspecie} codigoCVSA={codigoCVSA} denominacion={denominacion} laminaMinima={laminaMinima} precio={precio} cafci={cafci} cuentaDeEmision={cuentaDeEmision} estado={estado} idEmisor={idEmisor} idGerente={idGerente}
                        vigencia={vigencia} plazoDeLiquidacion={plazoDeLiquidacion} codigoCNV={codigoCNV} isin={isin} familiaDeFondos={familiaDeFondos} observaciones={observaciones} movimiento={movimiento} fechaAlta={fechaAlta}></RegistroEspecie>
                    )
                })
            }

        </table>
        </>
    );
}

export default CRUDEspecie;
