import { ColumnDef } from "@tanstack/react-table";
import { TypeSuscripcion } from "../../types/typeSuscripcion";
import { DataTableColumnHeader } from "../../../utils/DataTableColumnHeader";

export const createColumn = (
  accessorKey: string,
  title: string,
  isBoolean: boolean = false
): ColumnDef<TypeSuscripcion> => ({
  accessorKey,
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title={title} />
  ),
  cell: ({ row }) => {
    if (isBoolean) {
      return <span>{row.original[accessorKey] ? "SI" : "NO"}</span>;
    }
    return <span>{row.original[accessorKey]}</span>;
  },
});
