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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface TypeEspecie {
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
      const response = await fetch('http://localhost:10002/api/v1/especies', { signal: signal }).then(res => res.json())
      console.log(response)
      setEspecies(response)
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
    }
  }




  const handleDelete = (id: number) => {
    fetch(`http://localhost:10002/api/v1/especies/${id}`, {
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
      accessorKey: 'opciones',
      header: 'Opciones',
      enableGlobalFilter: false,
      cell: ({ row }) => (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-46">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Button
                    variant="ghost"
                    className="font-normal"
                    onClick={() => {
                      const idEspecie = row.original.idEspecie
                      console.log(idEspecie)
            
                      navigate(`/edit-Especie/${idEspecie}`, { state: { especie: row.original } })
                    }}
                  >
                    <span>Modificar</span>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="font-normal"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Eliminar</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Eliminacion de Especie</AlertDialogTitle>
                        <AlertDialogDescription>
                          Se eliminira la Especie ¿Estás seguro?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>No</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(row.original.idEspecie)}
                        >
                          Si
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
          </>
      ),
    },
   

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
        <Link to="/Form-Especie"><Button>Crear especie</Button></Link>
      </div>

      <Card className='p-4 bg-white rounded-xl shadow-md'>
        <DataTable columns={columns} data={especies} Card={CardMisEspecies} />
      </Card>
    </section>
  )
}
