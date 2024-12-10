import { Cell, flexRender, Row } from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { TypeBilletera } from "./types/typeBilletera";

/**
 * Props del componente CardSuscripcion
 * @property row - Fila de la tabla a renderizar que representa a los datos de cada registro
 */
type CardSuscripcionProps = {
  readonly row: Row<TypeBilletera>;
};

/**
 * Componente CardSuscripcion - Tarjeta que muestra informacion de un registro en formato mobile.
 * @param {CardSuscripcionProps} props - Propiedades del componente
 * @returns {JSX.Element} - Tarjeta de visualizacion de un registro
 */
export default function CardSuscripcion({
  row,
}: CardSuscripcionProps): JSX.Element {
  /**
   * renderColumn - Renderiza el contenido de cada celda visible de la fila.
   * @param {Cell<TypeSuscripcion>} cell - Celda que se va a renderizar.
   * @returns {JSX.Element | null} - Contenido de la celda como JSX, o null si no existe la celda.
   */
  const renderColumn = (
    cell: Cell<TypeBilletera, unknown>
  ): JSX.Element | null => {
    return (
      <div key={cell.id} className="flex items-center space-x-2 text-sm">
        <span className="font-medium">{cell.column.id}:</span>
        <span>{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {row.getVisibleCells().map((cell) => {
            if (cell.column.id !== "opciones") {
              return renderColumn(cell);
            }
            return null;
          })}
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          {row.getVisibleCells().map((cell) => {
            if (cell.column.id === "opciones") {
              return (
                <div
                  key={cell.id}
                  className="flex items-center space-x-2 text-sm"
                >
                  <span className="font-medium">Opciones:</span>
                  <span>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </span>
                </div>
              );
            }
            return null;
          })}
        </div>
      </CardContent>
    </Card>
  );
}