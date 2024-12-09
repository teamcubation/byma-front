import { Cell, flexRender, Row } from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { AtSign, Banknote, Building2, CalendarIcon, CreditCard, Hash, Pencil, Text, Trash2 } from "lucide-react";
import { TypeGerente } from "./AbmGerentes";

/**
 * Props del componente CardMisGerentees
 * @property row - Fila de la tabla a renderizar que representa a los datos de cada registro
 */
type CardMisGerentesProps <T> = {
  readonly row: Row<T>;
};

/**
 * Componente CardMisGerentees - Tarjeta que muestra información de un registro en formato mobile.
 * @param {CardMisGerentesProps} props - Propiedades del componente
 * @returns {JSX.Element} - Tarjeta de visualización de un registro
 */
export default function CardMisGerentes<T>({
  row,
}: CardMisGerentesProps<T>): JSX.Element {
  /**
   * getCell - Obtiene la celda correspondiente al ID de columna especificada.
   * @param {string} cellId - ID de la columna a obtener
   * @returns {Cell<TypeGerente, unknown> | undefined} - Celda que coincide con el ID, o undefined si no se encuentra
   */
  const getCell = (cellId: string): Cell<T, unknown> | undefined => {
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
  const mailGerente = renderColumn("mailGerente");
  const fechaAlta = renderColumn("fechaDeAlta");
  const liquidaEnByma = renderColumn("liquidaEnByma");
  const acciones = renderColumn("acciones");

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
          {mailGerente && (
            <div className="flex items-center space-x-2 text-sm">
              <AtSign className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Email:</span>
              <span>{mailGerente}</span>
            </div>
          )}
          {fechaAlta && (
            <div className="flex items-center space-x-2 text-sm">
              <CalendarIcon className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Fecha de alta:</span>
              <span>{fechaAlta}</span>
            </div>
          )}
          {liquidaEnByma && (
            <div className="flex items-center space-x-2 text-sm">
              <Banknote className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Liquida en Byma:</span>
              <span>{liquidaEnByma}</span>
            </div>
          )}
         
          
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          {acciones && acciones}
        </div>
      </CardContent>
    </Card>
  );
}
