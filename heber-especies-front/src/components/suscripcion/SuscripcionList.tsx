import { DataTable } from "../utils/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Card } from "../ui/card";
import { DataTableColumnHeader } from "../utils/DataTableColumnHeader";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
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
import { waitFor } from "@/utils/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CardSuscripcion from "./CardSuscripcion";

import suscripcionesData from "./suscripciones.json"; 
import { TypeSuscripcion } from "./typeSuscripcion";

const useHandleDelete = (setSuscripciones: React.Dispatch<React.SetStateAction<TypeSuscripcion[]>>) => {
  return async (id: number) => {
    const toastId = toast.loading("Generando eliminacion de la Suscripcion");
    try {
      await waitFor(2000);
      setSuscripciones((prev) => prev.filter((suscripcion) => suscripcion.idSuscripcion !== id));
      toast.success(`La Suscripcion con ID ${id} fue eliminada exitosamente.`, { id: toastId });
    } catch (error) {
      console.error("Error en handleDelete:", error);
      toast.error("Hubo un error al intentar realizar la eliminacion de la Suscripcion.", { id: toastId });
    }
  };
};

const useHandleBajaSuscripcion = (setSuscripciones: React.Dispatch<React.SetStateAction<TypeSuscripcion[]>>) => {
  return async (id: number) => {
    const toastId = toast.loading("Generando baja de la Suscripcion");
    try {
      setSuscripciones((prev) => prev.map((suscripcion) => 
        suscripcion.idSuscripcion === id ? { ...suscripcion, estado: "BAJA" } : suscripcion
      ));
      toast.success(`La suscripcion con ID ${id} fue deshabilitada exitosamente.`, { id: toastId });
    } catch (error) {
      console.error("Error en handleBajaSuscripcion:", error);
      toast.error("Hubo un error al intentar realizar la baja de la suscripcion.", { id: toastId });
    }
  };
};

const createColumn = (accessorKey: string, title: string, isBoolean: boolean = false): ColumnDef<TypeSuscripcion> => ({
  accessorKey,
  header: ({ column }) => <DataTableColumnHeader column={column} title={title} />,
  cell: ({ row }) => {
    if (isBoolean) {
      return <span>{row.original[accessorKey] ? "SI" : "NO"}</span>;
    }
    return <span>{row.original[accessorKey]}</span>
  }
});

export const SuscripcionList = () => {
  const [suscripciones, setSuscripciones] = useState<TypeSuscripcion[]>(suscripcionesData);
  const navigate = useNavigate();
  
  const handleDelete = useHandleDelete(setSuscripciones);
  const handleBajaSuscripcion = useHandleBajaSuscripcion(setSuscripciones);

  const columns: ColumnDef<TypeSuscripcion>[] = [
    createColumn("idSuscripcion", "Id Suscripción"),
    createColumn("estado", "Estado"),
    createColumn("fechaAlta", "Fecha de Alta"),
    createColumn("nroCertificado", "Nro Certificado"),
    createColumn("idEspecie", "ID Especie"),
    createColumn("CantCuotapartes", "Cantidad de Cuotapartes"),
    createColumn("IdAcdi", "ID ACDI"),
    createColumn("idEmisor", "ID Emisor"),
    createColumn("nroPedido", "Nro Pedido"),
    createColumn("nroSecuencia", "Nro Secuencia"),
    createColumn("fechaCambioDeEstado", "Fecha Cambio Estado"),
    createColumn("rolIngresante", "Rol Ingresante"),
    createColumn("monto", "Monto"),
    createColumn("liquidaEnByma", "Liquida En Byma", true),
    createColumn("numeroReferencia", "Numero de Referencia"),
    createColumn("procesadoCustodia", "Procesado Custodia", true),
    createColumn("ultimoError", "Ultimo Error"),
    createColumn("command", "Comando"),
    createColumn("procesadoLiquidacionesSlyq", "Procesado Liquidaciones SLYQ", true),
    createColumn("idGerente", "ID Gerente"),
    createColumn("obligacionDePagoGenerada", "Obligación de Pago Generada", true),
    createColumn("idBilletera", "ID Billetera"),
    createColumn("fechaSincronizacion", "Fecha Sincronización"),
    createColumn("nasdaqSiStatusReason", "NASDAQ SI Status Reason"),
    createColumn("mdwStatusCode", "MDW Status Code"),
    createColumn("mdwBusinessMessageId", "MDW Business Message ID"),
    createColumn("mdwResponseMessage", "MDW Response Message"),
    createColumn("mdwResponseDatetime", "MDW Response Datetime"),
    createColumn("nasdaqSiStatus", "NASDAQ SI Status"),
    {
      accessorKey: "opciones",
      header: "Opciones",
      enableGlobalFilter: false,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-46">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Button variant="ghost" className="font-normal" onClick={() => navigate(`/editar-suscripcion/${row.original.idSuscripcion}`)}>
                  <span>Modificar</span>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" className="font-normal" onClick={(e) => e.stopPropagation()}>
                      <span>Eliminar</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Eliminación de Suscripción</AlertDialogTitle>
                      <AlertDialogDescription>Se eliminará la Suscripción, ¿Estás seguro?</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>No</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(row.original.idSuscripcion)}>Sí</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" className="font-normal" onClick={(e) => e.stopPropagation()}>
                      <span>Dar de baja</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Baja de Suscripción</AlertDialogTitle>
                      <AlertDialogDescription>Se dará de baja la Suscripción, ¿Estás seguro?</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>No</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleBajaSuscripcion(row.original.idSuscripcion)}>Sí</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <section className="p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Mis suscripciones</h1>
      <div className="flex justify-end">
        <Link to="/nueva-suscripcion">
          <Button>Crear suscripción</Button>
        </Link>
      </div>
      <Card className="p-4 bg-white rounded-xl shadow-md">
        <DataTable columns={columns} data={suscripciones} Card={CardSuscripcion} />
      </Card>
    </section>
  );
};
