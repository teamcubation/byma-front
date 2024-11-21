import { Cell, flexRender, Row } from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { AtSign, Building2, CalendarIcon, CreditCard, Hash, Pencil, Text, Trash2 } from "lucide-react";
import { TypeEspecie } from "./MisEspecies";

/**
 * Props del componente CardMisEspecies
 * @property row - Fila de la tabla a renderizar que representa a los datos de cada registro
 */
type CardMisEspeciesProps = {
  readonly row: Row<TypeEspecie>;
};

/**
 * Componente CardMisEspecies - Tarjeta que muestra información de un registro en formato mobile.
 * @param {CardMisEspeciesProps} props - Propiedades del componente
 * @returns {JSX.Element} - Tarjeta de visualización de un registro
 */
export default function CardMisEspecies({
  row,
}: CardMisEspeciesProps): JSX.Element {
  /**
   * getCell - Obtiene la celda correspondiente al ID de columna especificada.
   * @param {string} cellId - ID de la columna a obtener
   * @returns {Cell<TypeEspecie, unknown> | undefined} - Celda que coincide con el ID, o undefined si no se encuentra
   */
  const getCell = (cellId: string): Cell<TypeEspecie, unknown> | undefined => {
    return row.getVisibleCells().find((cell) => cell.column.id === cellId);
  };

  /**
   * renderColumn - Renderiza el contenido de la columna especificada.
   * @param {string} cellId - ID de la columna a renderizar
   * @returns {JSX.Element | null} - Contenido de la celda como JSX, o null si no existe la celda
   */
  const renderColumn = (cellId: string): JSX.Element | null => {
    const cell = getCell(cellId);
    return cell ? (
      <div key={cell.id}>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </div>
    ) : null;
  };

  const denominacion = renderColumn("denominacion");
  const email = renderColumn("email");
  const fechaAlta = renderColumn("fechaAlta");
  const cuentaEspecie = renderColumn("cuentaEspecie");
  const idOrganizacion = renderColumn("idOrganizacion");
  const idEntidadLegal = renderColumn("idEntidadLegal");
  const editar = renderColumn("editar");
  const eliminar = renderColumn("eliminar");

  return (
    <Card className="w-full max-w-2xl mx-auto hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {denominacion && (
            <div className="flex items-center space-x-2 text-sm">
              <Text className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Denominacion:</span>
              <span>{denominacion}</span>
            </div>
          )}
          {email && (
            <div className="flex items-center space-x-2 text-sm">
              <AtSign className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Email:</span>
              <span>{email}</span>
            </div>
          )}
          {fechaAlta && (
            <div className="flex items-center space-x-2 text-sm">
              <CalendarIcon className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Fecha de alta:</span>
              <span>{fechaAlta}</span>
            </div>
          )}
          {cuentaEspecie && (
            <div className="flex items-center space-x-2 text-sm">
              <CreditCard className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Cuenta del especie:</span>
              <span>{cuentaEspecie}</span>
            </div>
          )}
          {idOrganizacion && (
            <div className="flex items-center space-x-2 text-sm">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">ID de organización:</span>
              <span>{idOrganizacion}</span>
            </div>
          )}
          {idEntidadLegal && (
            <div className="flex items-center space-x-2 text-sm">
              <Hash className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">ID de entidad legal:</span>
              <span>{idEntidadLegal}</span>
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          {editar && editar}
          {eliminar && eliminar}
        </div>
      </CardContent>
    </Card>
  );
}
