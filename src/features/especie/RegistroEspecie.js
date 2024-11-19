import React from "react";

function RegistroEspecie ({idEspecie, codigoCVSA, denominacion, laminaMinima, precio, cafci, cuentaDeEmision, estado, idEmisor, idGerente,
    vigencia, plazoDeLiquidacion, codigoCNV, isin, familiaDeFondos, observaciones, movimiento, fechaAlta}) {
        const movimientoText = movimiento ? 'true' : 'false'

        return (
        <tr>
            <th>{idEspecie}</th>
            <th>{codigoCVSA}</th>
            <th>{denominacion}</th>
            <th>{laminaMinima}</th>
            <th>{precio}</th>
            <th>{cafci}</th>
            <th>{cuentaDeEmision}</th>
            <th>{estado}</th>
            <th>{idEmisor}</th>
            <th>{idGerente}</th>
            <th>{vigencia}</th>
            <th>{plazoDeLiquidacion}</th>
            <th>{codigoCNV}</th>
            <th>{isin}</th>
            <th>{familiaDeFondos}</th>
            <th>{observaciones}</th>
            <th>{movimientoText}</th>
            <th>{fechaAlta}</th>
        </tr>
    )
}

export default RegistroEspecie;