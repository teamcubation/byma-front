import type { ISODateString, mail } from "@/types/type"
import { DataTable } from "../../utils/DataTable"
import { ColumnDef } from "@tanstack/react-table"
import { Card } from "../../ui/card"
import { DataTableColumnHeader } from "../../utils/DataTableColumnHeader"
import { Button } from "../../ui/button"
import { Ban, CircleCheck, Pencil, Trash2 } from "lucide-react"
import { Link, NavigateFunction, useNavigate } from "react-router-dom"
import CardMisGerentes from "./CardMisGerentes"
import { useEffect, useState } from "react"
import axios from "axios"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { set } from "react-hook-form"
import { TypeEmisor } from "@/components/MisEmisores"
import { TypeEspecie } from "@/components/especie/MisEspecies"

export interface TypeGerente {
  idGerente: number,
  denominacion: string,
  habilitado: boolean,
  liquidaEnByma: boolean,
  observaciones: string,
  mailGerente: mail,
  fechaDeAlta: ISODateString,
}
type TypeGerenteKeys = keyof TypeGerente;

export function definirColumnas<T extends TypeGerente, K extends keyof T>(keys: Array<keyof T>, idKey: K, booleanKey: K, navigateFunction: NavigateFunction, handleDelete: (id: number) => Promise<void>
): ColumnDef<T>[];
export function definirColumnas<T extends TypeEmisor, K extends keyof T>(keys: Array<keyof T>, idKey: K, booleanKey: K, navigateFunction: NavigateFunction, handleDelete: (id: number) => Promise<void>
): ColumnDef<T>[];
export function definirColumnas<T extends TypeEspecie, K extends keyof T>(keys: Array<keyof T>, idKey: K, booleanKey: K, navigateFunction: NavigateFunction, handleDelete: (id: number) => Promise<void>
): ColumnDef<T>[];
export function definirColumnas<T, K extends keyof T>(keys: Array<keyof T>, idKey: K, booleanKey: K, navigateFunction: NavigateFunction, handleDelete: (id: number) => Promise<void>
): ColumnDef<T>[] {

  const columnas: ColumnDef<T>[] = keys.map((key) => ({
    accessorKey: key,
    header: ({ column }) => {
      const title = typeof key === 'string' ? key.charAt(0).toUpperCase() + key.slice(1) : key.toString();
      return <DataTableColumnHeader column={column} title={title} />;
    },

    cell: ({ row }) => {
      const valor = row.original[key];
      // Lógica para formatear columnas según el tipo de datos
      if (key === "fechaDeAlta" && typeof valor === "string") {
        const date = new Date(valor);
        return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getFullYear()}`;
      }

      if (typeof valor === "boolean") {
        return valor ? "Sí" : "No";
      }

      return valor; // Renderiza el valor tal cual si no hay lógica específica
    }
  }))

  const acciones: ColumnDef<T> = {
    accessorKey: "acciones",
    header: 'Acciones',
    enableGlobalFilter: false,
    cell: ({ row }) => (
      <div className="flex justify-center items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 py-0 rounded-full bg-blue-300 hover:bg-blue-400"
                onClick={() => {
                  console.log(row)
                  navigateFunction(`/editar-gerente/${row.original[idKey]}`, { state: { gerente: row.original } })
                }}>
                <Pencil className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Editar gerente</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>

              <Button
                variant="ghost"
                size="sm"
                className={`h-8 px-2 py-0 rounded-full ${row.original[booleanKey] ? "bg-gray-300 hover:bg-gray-400" : "bg-green-300 hover:bg-green-400"}`}
                onClick={() => handleDelete(row.original[idKey] as number)}>
                {row.original[booleanKey] ? <Ban className="h-4 w-4" /> : <CircleCheck className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {row.original[booleanKey] ? <p>Deshabilitar gerente</p> : <p>Habilitar gerente</p>}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
  }
  columnas.push(acciones);
  return columnas;
}


export const MisGerentes = () => {

  // ? Datos de la tabla
  const [gerentes, setGerentes] = useState<TypeGerente[]>([]);
  const [columnDefinitions, setColumnDefinitions] = useState<ColumnDef<TypeGerente>[]>([]);

  const navigate = useNavigate();


  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    traerGerentes(signal)

    return () => controller.abort()
  }, [])

  // ? callback que trae los gerentes de la API
  const traerGerentes = async (signal: AbortSignal) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_GERENTE_BASE_URL}/gerentes`)
      const data = await response.data;
      console.log(data)
      const gerente = data[0] as TypeGerente

      const columnDef = definirColumnas<TypeGerente, TypeGerenteKeys>(Object.keys(gerente) as Array<keyof TypeGerente>, "idGerente", "habilitado", navigate, handleDelete);
      setColumnDefinitions(columnDef);
      setGerentes(data);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
    }
  }

  // ? callback para manejar el borrado logico del gerente
  const handleDelete = async (id: number) => {
    try {
      await axios.patch(`${import.meta.env.VITE_GERENTE_BASE_URL}/gerentes/toggle-habilitar/${id}`);

      setGerentes((prevGerentes) =>
        prevGerentes.map((gerente) =>
          gerente.idGerente === id
            ? { ...gerente, habilitado: !gerente.habilitado }
            : gerente
        )
      );
    } catch (error) {
      console.error("Error al actualizar el estado del gerente:", error);
      alert("No se pudo actualizar el estado. Inténtelo nuevamente.");
    }
  };




  const columns: ColumnDef<TypeGerente>[] = [
    {
      accessorKey: "denominacion",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Denominación" />
      ),
    },
    {
      accessorKey: "mailGerente",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
    },
    {
      accessorKey: "fechaDeAlta",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fecha de alta" />
      ),
      cell: ({ row }) => {

        console.log(row.original.fechaDeAlta)

        const date = new Date(row.original.fechaDeAlta);

        const dia = String(date.getDate()).padStart(2, "0");
        const mes = String(date.getMonth() + 1).padStart(2, "0");
        const anio = date.getFullYear();

        return `${dia}-${mes}-${anio}`;
      },
    },
    {
      accessorKey: "liquidaEnByma",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="liquida en Byma" />
      ),
      cell: ({ row }) => {
        return row.original.liquidaEnByma ? "Si" : "No";
      },
    },
    {
      accessorKey: "acciones",
      header: 'Acciones',
      enableGlobalFilter: false,
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>

                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 py-0 rounded-full bg-blue-300 hover:bg-blue-400"
                  onClick={() => {
                    console.log(row)
                    navigate(`/editar-gerente/${row.original.idGerente}`, { state: { gerente: row.original } })
                  }}>
                  <Pencil className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Editar gerente</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>

                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-8 px-2 py-0 rounded-full ${row.original?.habilitado ? "bg-gray-300 hover:bg-gray-400" : "bg-green-300 hover:bg-green-400"}`}
                  onClick={() => handleDelete(row.original.idGerente)}>
                  {row.original.habilitado ? <Ban className="h-4 w-4" /> : <CircleCheck className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {row.original.habilitado ? <p>Deshabilitar gerente</p> : <p>Habilitar gerente</p>}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    }
  ]

  console.log(columns, "columns")
  console.dir(columns, "columns")
  return (
    <section className="p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Mis gerentes</h1>
      <div className="flex justify-end">
        <Link to="/nuevo-gerente"><Button>Crear gerente</Button></Link>
      </div>

      <Card className='p-4 bg-white rounded-xl shadow-md'>
        <DataTable columns={columnDefinitions} data={gerentes} Card={CardMisGerentes<TypeGerente>} booleanKey="habilitado" />
      </Card>
    </section>
  )
}
