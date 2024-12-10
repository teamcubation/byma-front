import type { ISODateString } from "@/types/type"
import { DataTable } from "../utils/DataTable"
import { ColumnDef } from "@tanstack/react-table"
import { Card } from "../ui/card"
import { DataTableColumnHeader } from "../utils/DataTableColumnHeader"
import { Button } from "../ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import CardBilletera from "./CardBilletera"
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
import ButtonText from "../button/ButtonText"
import addIcon from "../button/icon-button/add-azul.svg";
import { TypeBilletera } from "./types/typeBilletera"
import { get } from "http"
import { deleteBilletera, getAllBilleteras } from "@/services/BilleteraService"

  export const MisBilleteras = () => {

    const navigate = useNavigate()
  
    const [billeteras, setBilleteras] = useState<TypeBilletera[]>([]);
  
    useEffect(() => {
      const obtenerBilleteras = async () => {
        try {
          const response = await getAllBilleteras();
          setBilleteras(response);
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : "Error desconocido");
        }
      }

      obtenerBilleteras();
    }, [])

    const handleDelete = async (id: number) => {
      try {
        await deleteBilletera(id);
        setBilleteras(prevBilleteras => prevBilleteras.filter(billetera => billetera.id !== id))
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
      }
    }
  
  
    const columns: ColumnDef<TypeBilletera>[] = [
      {
        accessorKey: "id",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="ID" />
        )
      },
      {
        accessorKey: "mail",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Mail" />
        )
      },
      {
        accessorKey: "idCuenta",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Id Cuenta" />
        )
      },
      {
        accessorKey: "denominacion",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Denominación" />
        ),
      },
      {
        accessorKey: "liquidaEnByma",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Liquida en BYMA" />
        ),
        cell: ({ row }) => (
          <span>{row.original.liquidaEnByma ? "Sí" : "No"}</span>
        ),
      },
      {
        accessorKey: "habilitado",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Habilitado" />
        ),
        cell: ({ row }) => (
          <span>{row.original.habilitado ? "Sí" : "No"}</span>
        ),
      },
      {
        accessorKey: "fechaAlta",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Fecha Alta" />
        )
      },
      {
        accessorKey: "observaciones",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Observaciones" />
        )
      },
      {
        accessorKey: "idAcdi",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Id ACDI" />
        )
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
                        const idBilletera = row.original.id
              
                        navigate(`/editar-billetera/${idBilletera}`, { state: {billetera: row.original } })
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
                          <AlertDialogTitle>Eliminacion de Billetera</AlertDialogTitle>
                          <AlertDialogDescription>
                            Se eliminira la Billetera ¿Estás seguro?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>No</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(row.original.id)}
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
  
    return (
      <section className="p-6 flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Billeteras</h1>
        <div className="flex justify-end">
          <Link to="/nueva-billetera"><ButtonText text="Nueva billetera" icon={addIcon}></ButtonText></Link>
        </div>
  
        <Card className='p-4 bg-white rounded-xl shadow-md'>
          <DataTable columns={columns} data={billeteras} Card={CardBilletera} />
        </Card>
      </section>
    )
  }