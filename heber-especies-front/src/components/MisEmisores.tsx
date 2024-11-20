import type { ISODateString, mail } from "@/types/type"
import { DataTable } from "./utils/DataTable"
import { ColumnDef } from "@tanstack/react-table"
import { Card } from "./ui/card"
import { DataTableColumnHeader } from "./utils/DataTableColumnHeader"
import { Button } from "./ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import CardMisEmisores from "./CardMisEmisores"
import { useEffect, useState } from "react"

export type TypeEmisor = {
  id: number
  denominacion: string
  email: mail
  fechaAlta: ISODateString,
  cuentaEmisor: string,
  idOrganizacion: number,
  idEntidadLegal: number
}

export const MisEmisores = () => {

  const [emisores, setEmisores] = useState<TypeEmisor[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    traerEmisores(signal)

    return () => controller.abort()
  }, [])

  const traerEmisores = async (signal: AbortSignal) => {
    try {
      const response = await fetch('http://localhost:8080/api/emisores', { signal: signal }).then(res => res.json())
      console.log(response)
      setEmisores(response)
    } catch (error) {
        if(error instanceof DOMException && error.name === 'AbortError') return;
    }
  }




  const handleDelete = (id:number) => {
    fetch(`http://localhost:8080/api/emisores/${id}`, {
      method: 'DELETE'
    })

    setEmisores(prevEmisores => prevEmisores.filter(emisor => emisor.id !== id))
  }

  const columns: ColumnDef<TypeEmisor>[] = [
    {
      accessorKey: "denominacion",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Denominación" />
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
    },
    {
      accessorKey: "fechaAlta",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fecha de alta" />
      ),
      cell: ({ row }) => {
        const date = new Date(row.original.fechaAlta);

        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const anio = date.getFullYear();


        return `${dia}-${mes}-${anio}`;
      },
    },
    {
      accessorKey: "cuentaEmisor",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Cuenta de emisor" />
      ),
    },
    {
      accessorKey: "idOrganizacion",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Organización" />
      ),
    },
    {
      accessorKey: "idEntidadLegal",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Entidad legal" />
      ),
    },
    {
      accessorKey: 'editar',
      header: 'Editar',
      enableGlobalFilter: false,
      cell: ({ row }) => (
        <Button variant="ghost" size="sm" className="h-8 px-2 py-0 rounded-full bg-blue-300 hover:bg-blue-400" onClick={() => console.log(row.original.id)}>
          <Pencil className="h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'eliminar',
      header: 'Eliminar',
      enableGlobalFilter: false,
      cell: ({ row }) => (
        <Button variant="ghost" size="sm" className="h-8 px-2 py-0 rounded-full bg-red-300 hover:bg-red-400" onClick={() => handleDelete(row.original.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      ),
    }
  ]

  // const data: TypeEmisor[] = [
  //   {
  //     id: 1,
  //     denominacion: "Emisor 1",
  //     email: "hola@gmail.com",
  //     fechaAlta: "2024-11-18T13:55:20.183738",
  //     cuentaEmisor: "123456",
  //     idOrganizacion: 1,
  //     idEntidadLegal: 1
  //   },
  // ];

  return (
    <section className="p-6 flex flex-col gap-6">
      <div className="flex justify-end">
        <Link to="/nuevoEmisor"><Button>Crear emisor</Button></Link>
      </div>

      <Card className='p-4 bg-white rounded-xl shadow-md'>
        <DataTable columns={columns} data={emisores} Card={CardMisEmisores} />
      </Card>
    </section>
  )
}
