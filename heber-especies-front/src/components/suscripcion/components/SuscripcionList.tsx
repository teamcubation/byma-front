import React, { useState } from "react";
import { DataTable } from "../../utils/DataTable";
import { Button } from "../../ui/button";
import { createColumn } from "./utils/columns";
import useHandleDelete from "./hooks/useHandleDelete";
import useHandleBaja from "./hooks/useHandleBaja";
import suscripcionesData from "../data/suscripciones.json";
import { TypeSuscripcion } from "../types/typeSuscripcion";

export const SuscripcionList = () => {
  const [suscripciones, setSuscripciones] = useState<TypeSuscripcion[]>(suscripcionesData);
  const handleDelete = useHandleDelete(setSuscripciones);
  const handleBaja = useHandleBaja(setSuscripciones);

  const columns = [
    createColumn("idSuscripcion", "ID Suscripción"),
    createColumn("estado", "Estado"),
    // Otros campos...
    {
      accessorKey: "opciones",
      header: "Opciones",
      cell: ({ row }) => (
        <Button onClick={() => handleDelete(row.original.idSuscripcion)}>Eliminar</Button>
      ),
    },
  ];

  return (
    <section>
      <h1>Suscripciones</h1>
      <DataTable data={suscripciones} columns={columns} />
    </section>
  );
};
