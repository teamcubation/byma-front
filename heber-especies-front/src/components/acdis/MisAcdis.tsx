import { DataTable } from "../utils/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Card } from "../ui/card";
import { DataTableColumnHeader } from "../utils/DataTableColumnHeader";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CardMisAcdis from "./CardMisAcdis";
import { useEffect, useRef, useState } from "react";
import { getAcdis, deleteAcdi, bajaAcdi } from "../../services/AcdiService";
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
import { sign } from "crypto";

export type TypeAcdi = {
  idAcdi: number;
  idOrganizacionAcdi: string;
  denominacion: string;
  liquidaEnByma: boolean;
  habilitado: boolean;
  billeteras: boolean;
  observaciones: string;
  fechaAlta: string;
  mail: string;
};

export const MisAcdis = () => {
  const [acdis, setAcdis] = useState<TypeAcdi[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    traerAcdis(signal);

    return () => controller.abort();
  }, []);

  const traerAcdis = async (signal: AbortSignal) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/acdis", {
        signal: signal,
      }).then((res) => res.json());
      console.log(response);
      setAcdis(response);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
    }
  };

  const handleDelete = async (id: number) => {
    const toastId = toast.loading("Generando eliminacion del Acdi");
    try {
      await waitFor(2000);
      fetch(`http://localhost:8080/api/v1/acdis/${id}`, {
        method: "DELETE",
      });
      setAcdis((prevAcdis) => prevAcdis.filter((acdi) => acdi.idAcdi !== id));
      toast.success(`El ACDI con ID ${id} fue eliminado exitosamente.`, {
        id: toastId,
      });
    } catch (error) {
      console.error("Error en handleDelete:", error);
      toast.error(
        "Hubo un error al intentar realizar la eliminacion del ACDI.",
        { id: toastId }
      );
    }
  };
  const handleBajaAcdi = async (id: number) => {
    const toastId = toast.loading("Generando baja del Acdi");
    try {
      await waitFor(2000);

      const response = await fetch(
        `http://localhost:8080/api/v1/acdis/${id}/baja`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const updatedAcdi = await response.json();
        setAcdis((prevAcdis) =>
          prevAcdis.map((acdi) =>
            acdi.idAcdi === id ? { ...acdi, ...updatedAcdi } : acdi
          )
        );
        toast.success(`El ACDI con ID ${id} fue deshabilitado exitosamente.`, {
          id: toastId,
        });
      } else {
        throw new Error("Error al intentar deshabilitar el ACDI.");
      }
    } catch (error) {
      console.error("Error en handleBajaAcdi:", error);
      toast.error("Hubo un error al intentar realizar la baja del ACDI.", {
        id: toastId,
      });
    }
  };

  const columns: ColumnDef<TypeAcdi>[] = [
    {
      accessorKey: "idAcdi",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Id" />
      ),
    },
    {
      accessorKey: "idOrganizacion",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Organizacion" />
      ),
    },
    {
      accessorKey: "denominacion",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Denominación" />
      ),
    },
    {
      accessorKey: "mail",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Mail" />
      ),
    },
    {
      accessorKey: "fechaAlta",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fecha de alta" />
      ),
    },
    {
      accessorKey: "liquidaEnByma",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Liquida En Byma" />
      ),
      cell: ({ row }) => (
        <span>{row.original.liquidaEnByma ? "SI" : "NO"}</span>
      ),
    },
    {
      accessorKey: "habilitado",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Habilitado" />
      ),
      cell: ({ row }) => <span>{row.original.habilitado ? "SI" : "NO"}</span>,
    },
    {
      accessorKey: "billeteras",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Billeteras" />
      ),
      cell: ({ row }) => <span>{row.original.billeteras ? "SI" : "NO"}</span>,
    },
    {
      accessorKey: "observaciones",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Observaciones" />
      ),
    },
    {
      accessorKey: "estado",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Estado" />
      ),
    },
    {
      accessorKey: "modificar",
      header: "Modificar",
      enableGlobalFilter: false,
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 py-0 rounded-full bg-blue-300 hover:bg-blue-400"
          onClick={() => navigate(`/editar-acdi/${row.original.idAcdi}`)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "eliminar",
      header: "Eliminar",
      enableGlobalFilter: false,
      cell: ({ row }) => (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Eliminacion de Acdi</AlertDialogTitle>
              <AlertDialogDescription>
                Se eliminira el Acdi ¿Estás seguro?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>No</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDelete(row.original.idAcdi)}
              >
                Si
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ),
    },
    {
      accessorKey: "baja",
      header: "Baja",
      enableGlobalFilter: false,
      cell: ({ row }) => (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Baja de Acdi</AlertDialogTitle>
              <AlertDialogDescription>
                Se dara la baja del Acdi ¿Estás seguro?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>No</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleBajaAcdi(row.original.idAcdi)}
              >
                Si
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ),
    },
  ];

  return (
    <section className="p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Mis acdis</h1>
      <div className="flex justify-end">
        <Link to="/nuevo-acdi">
          <Button>Crear acdi</Button>
        </Link>
      </div>
      <Card className="p-4 bg-white rounded-xl shadow-md">
        <DataTable columns={columns} data={acdis} Card={CardMisAcdis} />
      </Card>
    </section>
  );
};
