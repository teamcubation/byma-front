import type { ISODateString, mail } from "@/types/type"
import { DataTable } from "./utils/DataTable"
import { ColumnDef } from "@tanstack/react-table"
import { Card } from "./ui/card"
import { DataTableColumnHeader } from "./utils/DataTableColumnHeader"
import { Button } from "./ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import CardMisEspecies from "./CardMisEspecies"

export type TypeEspecie = {
  id: number,
  denominacion: string,
  cuentaCSVA: string,
  fechaAlta: ISODateString,
  cuentaEspecie: string
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
        if(error instanceof DOMException && error.name === 'AbortError') return;
    }
  }




  const handleDelete = (id:number) => {
    fetch(`http://localhost:8080/api/v1/especies/${id}`, {
      method: 'DELETE'
    })

    setEspecies(prevEspecies => prevEspecies.filter(especie => especie.id !== id))
  }

  const columns: ColumnDef<TypeEspecie>[] = [
    {
      accessorKey: "denominacion",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Denominación" />
      ),
    },
    {
      accessorKey: "cuentaCSVA",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Cuenta CSVA" />
      ),
    },
    {
      accessorKey: "fechaAlta",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fecha de alta" />
      ),
    },
    {
      accessorKey: "cuentaEspecie",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Cuenta de especie" />
      ),
    },
    {
      accessorKey: "editar",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Editar" />
      ),
      cell: ({ row }) => (
        <Link to={`/editarEspecie/${row.original.id}`}><Pencil className="w-6 h-6 text-primary-foreground" /></Link>
      )
    },
    {
      accessorKey: "eliminar",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Eliminar" />
      ),
      cell: ({ row }) => (
        <Trash2 onClick={() => handleDelete(row.original.id)} className="w-6 h-6 text-primary-foreground cursor-pointer" />
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
      <h1 className="text-3xl font-bold">Mis especies</h1>
      <div className="flex justify-end">
        <Link to="/nuevoEspecie"><Button>Crear especie</Button></Link>
      </div>

      <Card className='p-4 bg-white rounded-xl shadow-md'>
        <DataTable columns={columns} data={especies} Card={CardMisEspecies} />
      </Card>
    </section>
  )
}
