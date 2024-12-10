import { Cell, flexRender, Row } from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { 
  AtSign, 
  CalendarIcon, 
  CreditCard, 
  Hash, 
  Text, 
  Check, 
  AlertCircle 
} from "lucide-react";
import { TypeBilletera } from "./types/typeBilletera";

interface CardFieldProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

const CardField = ({ icon, label, value }: CardFieldProps) => (
  <div className="flex items-center space-x-2 text-sm">
    {icon}
    <span className="font-medium">{label}:</span>
    <span>{value}</span>
  </div>
);

type CardBilleterasProps = {
  readonly row: Row<TypeBilletera>;
};

export default function CardBilleteras({
  row,
}: CardBilleterasProps): JSX.Element {
  const getCell = (cellId: string): Cell<TypeBilletera, unknown> | undefined => {
    return row.getVisibleCells().find((cell) => cell.column.id === cellId);
  };

  const renderColumn = (cellId: string): JSX.Element | null => {
    const cell = getCell(cellId);
    return cell ? (
      <div key={cell.id}>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </div>
    ) : null;
  };

  const FIELDS_CONFIG = [
    {
      id: 'denominacion',
      label: 'Denominación',
      icon: <Text className="w-4 h-4 text-muted-foreground" />
    },
    {
      id: 'mail',
      label: 'Email',
      icon: <AtSign className="w-4 h-4 text-muted-foreground" />
    },
    {
      id: 'idCuenta',
      label: 'ID Cuenta',
      icon: <CreditCard className="w-4 h-4 text-muted-foreground" />
    },
    {
      id: 'fechaAlta',
      label: 'Fecha de Alta',
      icon: <CalendarIcon className="w-4 h-4 text-muted-foreground" />
    },
    {
      id: 'liquidaEnByma',
      label: 'Liquida en BYMA',
      icon: <Check className="w-4 h-4 text-muted-foreground" />
    },
    {
      id: 'habilitado',
      label: 'Habilitado',
      icon: <AlertCircle className="w-4 h-4 text-muted-foreground" />
    },
    {
      id: 'idAcdi',
      label: 'Id Acdi',
      icon: <Hash className="w-4 h-4 text-muted-foreground" />
    },
    {
      id: 'observaciones',
      label: 'Observaciones',
      icon: <Text className="w-4 h-4 text-muted-foreground" />
    },
    { 
      id: 'opciones',
      label: 'Opciones',
    }
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FIELDS_CONFIG.map(({ id, label, icon }) => {
            const value = renderColumn(id);
            return value && (
              <CardField
                key={id}
                icon={icon}
                label={label}
                value={value}
              />
            );
          })}
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          {/* {renderColumn("editar")}
          {renderColumn("eliminar")} */}
        </div>
      </CardContent>
    </Card>
  );
}