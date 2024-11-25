"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
  getFilteredRowModel,
  Column,
  Row,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ComponentType, isValidElement, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useMediaQuery } from "react-responsive";
import { LoaderCircle, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { TypeGerente } from "../features/gerente/AbmGerentes";
import { TypeEmisor } from "../MisEmisores";
import { TypeEspecie } from "../especie/MisEspecies";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
  Card?: ComponentType<{ data: TData; row: Row<TData> }>;
  txtPlaceholderFilter?: string;
  columnsHidden?: Array<Extract<keyof TData, string>>;
  dataLoading?: boolean;
  booleanKey?: keyof TData;
}

const TableSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
  </div>
);

/**
 * Componente de tabla de datos configurable para visualizar y manipular grandes volúmenes de datos.
 * Permite ordenación, filtrado, visibilidad de columnas y adaptabilidad a diferentes tamaños de pantalla.
 *
 * @template TData - Tipo de los datos de cada fila.
 * @template TValue - Tipo del valor de cada celda.
 *
 * @param {DataTableProps<TData, TValue>} props - Propiedades del componente.
 * @param {ColumnDef<TData, TValue>[]} props.columns - Configuración de las columnas de la tabla.
 * @param {TData[]} props.data - Datos a mostrar en la tabla.
 * @param {string} [props.className] - Clase CSS opcional para personalizar estilos.
 * @param {React.ComponentType<{ data: TData, row: Row<TData> }>} [props.Card] - Componente de tarjeta opcional que, si se proporciona, reemplaza la visualización de formato de tabla por una lista de componentes `Card` en dispositivos móviles.
 * @param {string} [props.txtPlaceholderFilter="Filtrar..."] - Texto del placeholder para el input de filtro global.
 * @param {Array<Extract<keyof TData, string>>} [props.columnsHidden=[]] - Columnas inicialmente ocultas.
 * @param {boolean} [props.dataLoading=false] - Indica si los datos se están cargando.
 *
 * @returns {JSX.Element} - Componente de tabla interactivo.
 */
export function DataTable<TData, TValue>({
  className,
  columns,
  data,
  Card,
  txtPlaceholderFilter = "Filtrar...",
  columnsHidden = [],
  dataLoading = false,
  booleanKey
}: Readonly<DataTableProps<TData, TValue>>): JSX.Element {

  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    columnsHidden.reduce((acc, column) => ({ ...acc, [column]: false }), {})
  );

  const [filtering, setFiltering] = useState<string>("");

  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  const [inputIsLoading, setInputIsLoading] = useState(false);

  const [parent] = useAutoAnimate();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnVisibility,
      sorting,
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
  });

  /**
   * Retorna el encabezado de la columna para mostrar en el menú de filtros.
   * Maneja encabezados definidos como funciones o cadenas.
   *
   * @param {Column<TData, unknown>} column - Columna para la cual se desea el encabezado.
   * @returns {string} - Texto del encabezado o un mensaje predeterminado si no está disponible.
   */
  const VisualizarFiltros = (column: Column<TData, unknown>): string => {
    if (typeof column.columnDef.header === "function") {
      // @ts-expect-error Pendiente: mejorar el tipado
      const headerElement = column.columnDef.header({ column });
      return isValidElement(headerElement)
        // @ts-expect-error Pendiente: mejorar el tipado
        ? headerElement.props.title
        : "Encabezado no disponible";
    } else if (typeof column.columnDef.header === "string") {
      return column.columnDef.header;
    } else {
      return "Encabezado no disponible";
    }
  };

  const handleInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputIsLoading(true);
    setFiltering(e.target.value);

    setTimeout(() => {
      setInputIsLoading(false);
    }, 500);
  };

  return (
    <div className={`flex flex-col gap-4 ${className ?? ""}`}>
      <div className="flex gap-4">
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            {inputIsLoading ? (
              <LoaderCircle
                className="animate-spin"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
                role="presentation"
              />
            ) : (
              <Search size={16} strokeWidth={2} />
            )}
          </div>
          <Input
            id="input-26"
            className="peer ps-9"
            placeholder={txtPlaceholderFilter}
            type="search"
            value={filtering}
            onChange={handleInputFilter}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Ver más columnas
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize cursor-pointer"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(Boolean(value))
                    }
                  >
                    {VisualizarFiltros(column)}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {Card == null || isDesktop ? (
        <Table className="rounded-md border">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-center" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody ref={parent}>
            {dataLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <TableSkeleton />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={`${row.original[booleanKey as keyof TData] ?? true ? "" : "opacity-50"}`}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sin resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        <div ref={parent} className="flex flex-col gap-4">
          {dataLoading ? (
            <TableSkeleton />
          ) : (
            table
              .getRowModel()
              .rows.map((row, i) => (
                <Card key={row.id} data={data[i]} row={row} />
              ))
          )}
        </div>
      )}
    </div>
  );
}
