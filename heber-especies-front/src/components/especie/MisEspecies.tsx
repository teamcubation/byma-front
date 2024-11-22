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
import { useNavigate } from "react-router-dom"

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
  moneda: number,
  fechaAlta: ISODateString
}

export const MisEspecies = () => {

  const navigate = useNavigate()

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
      accessorKey: "idEspecie",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      )
    },
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
      accessorKey: "idMoneda",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID moneda" />
      )
    },

    {
      accessorKey: "fechaAlta",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fecha de alta" />
      ),
    },
    {
      accessorKey: 'editar',
      header: 'Editar',
      enableGlobalFilter: false,
      cell: ({ row }) => (
        <Button variant="ghost" size="sm" className="h-8 px-2 py-0 rounded-full bg-blue-300 hover:bg-blue-400" onClick={() => {
          const idEspecie = row.original.idEspecie
          console.log(idEspecie)

          navigate(`/edit-Especie/${idEspecie}`, { state: { especie: row.original } })
        }}>
          <Pencil className="h-4 w-4" />
        </Button>
      ),
    },
    { 
      accessorKey: 'eliminar',
      header: 'Eliminar',
      enableGlobalFilter: false,
      cell: ({ row }) => (
        <Button variant="ghost" size="sm" className="h-8 px-2 py-0 rounded-full bg-red-300 hover:bg-red-400" onClick={() => handleDelete(row.original.idEspecie)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      ),
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
        <Link to="/Form-Especie"><Button>Crear especie</Button></Link>
      </div>

      <Card className='p-4 bg-white rounded-xl shadow-md'>
        <DataTable columns={columns} data={especies} Card={CardMisEspecies} />
      </Card>
    </section>
  )
}
