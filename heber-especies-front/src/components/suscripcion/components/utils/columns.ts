// utils/columns.ts
import { ColumnDef } from "@tanstack/react-table";
import { TypeSuscripcion } from "../../types/typeSuscripcion";
import { DataTableColumnHeader } from "../utils/DataTableColumnHeader";

export const createColumn = (
  accessorKey: keyof TypeSuscripcion,
  title: string,
  isBoolean: boolean = false
): ColumnDef<TypeSuscripcion> => ({
  accessorKey,
  header: ({ column }) => <DataTableColumnHeader column={column} title={title} />,
  cell: ({ row }) => {
    const value = row.original[accessorKey];
    return <span>{isBoolean ? (value ? "SI" : "NO") : value}</span>;
  },
});
