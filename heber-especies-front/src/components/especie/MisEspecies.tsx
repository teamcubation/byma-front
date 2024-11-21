import type { ISODateString } from "@/types/type"
import { DataTable } from "../utils/DataTable"
import { ColumnDef } from "@tanstack/react-table"
import { Card } from "../ui/card"
import { DataTableColumnHeader } from "../utils/DataTableColumnHeader"
import { Button } from "../ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import CardMisEspecies from "./CardMisEspecies"

export type TypeEspecie = {
  idEspecie: number,
  denominacion: string,
  precio: number,
  laminaMinima: number,
  cafci: string,
  codigoCVSA: string,
  idEmisor: number,
  idGerente: number,
  cuentaDeEmision: string,
  estado: boolean,
  vigencia: ISODateString,
  plazoDeLiquidacion: ISODateString,
  codigoCNV: string,
  isin: string,
  familiaDeFondos: string,
  observaciones: string,
  movimiento: boolean,
  fechaAlta: ISODateString
}

export const MisEspecies = () => {

  const [especies, setEspecies] = useState<TypeEspecie[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    traerEspecies(signal)

    return () => controller.abort()
  }, [])

  const traerEspecies = async (signal: AbortSignal) => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/especies', { signal: signal }).then(res => res.json())
      console.log(response)
      setEspecies(response)
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
    }
  }




  const handleDelete = (id: number) => {
    fetch(`http://localhost:8080/api/v1/especies/${id}`, {
      method: 'DELETE'
    })

    setEspecies(prevEspecies => prevEspecies.filter(especie => especie.idEspecie !== id))
  }


  const columns: ColumnDef<TypeEspecie>[] = [
    {
      accessorKey: "denominacion",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Denominación" />
      ),
    },
    {
      accessorKey: "precio",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Precio" />
      )
    },
    {
      accessorKey: "laminaMinima",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Lamina minima" />
      )
    },
    {
      accessorKey: "cafci",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="CAFCI" />
      )
    },
    {
      accessorKey: "codigoCVSA",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Cuenta CSVA" />
      ),
    },
    {
      accessorKey: "idEmisor",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Emisor" />
      )
    },
    {
      accessorKey: "idGerente",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Gerente" />
      )
    },
    {
      accessorKey: "cuentaDeEmision",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Cuenta de emision" />
      )
    },
    {
      accessorKey: "estado",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Estado" />
      )
    },
    {
      accessorKey: "vigencia",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Vigencia" />
      )
    },
    {
      accessorKey: "plazoDeLiquidacion",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Plazo de liquidacion" />
      )
    },
    {
      accessorKey: "codigoCNV",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Codigo CNV" />
      )
    },
    {
      accessorKey: "isin",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ISIN" />
      )
    },
    {
      accessorKey: "familiaDeFondos",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Familia de fondos" />
      )
    },
    {
      accessorKey: "observaciones",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Observaciones" />
      )
    },
    {
      accessorKey: "movimiento",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Movimiento" />
      )
    },

    {
      accessorKey: "fechaAlta",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fecha de alta" />
      ),
    },
    {
      accessorKey: "editar",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Editar" />
      ),
      cell: ({ row }) => (
        <Link to={`/editarEspecie/${row.original.idEspecie}`}><Pencil className="w-6 h-6 text-primary-foreground" /></Link>
      )
    },
    {
      accessorKey: "eliminar",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Eliminar" />
      ),
      cell: ({ row }) => (
        <Trash2 onClick={() => handleDelete(row.original.idEspecie)} className="w-6 h-6 text-primary-foreground cursor-pointer" />
      )
    }

  ]

  // const data: TypeEspecie[] = [
  //   {
  //     id: 1,
  //     denominacion: "Especie 1",
  //     email: "hola@gmail.com",
  //     fechaAlta: "2024-11-18T13:55:20.183738",
  //     cuentaEspecie: "123456",
  //     idOrganizacion: 1,
  //     idEntidadLegal: 1
  //   },
  // ];

  return (
    <section className="p-6 flex flex-col gap-6">
      <div className="flex justify-end">
        <Link to="/nuevoEspecie"><Button>Crear especie</Button></Link>
      </div>

      <Card className='p-4 bg-white rounded-xl shadow-md'>
        <DataTable columns={columns} data={especies} Card={CardMisEspecies} />
      </Card>
    </section>
  )
}
