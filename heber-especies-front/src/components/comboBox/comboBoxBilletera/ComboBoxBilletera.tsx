import { useEffect, useState } from "react";
import { TypeBilletera } from "@/components/billetera/types/typeBilletera";
import { getAllBilleteras } from "@/services/BilleteraService";
import ComboBox from "../ComboBox";
import { TypeItem } from "../types/typeItem";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";

interface ComboBoxProps {
  onItemSelected: (item: TypeItem[]) => void;
  selectedBilleteraId: string,
}

const ComboBoxBilletera: React.FC<ComboBoxProps> = ({
    onItemSelected,
    selectedBilleteraId
    }) => {

    const [billeteras, setBilleteras] = useState<TypeBilletera[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
    const fetchBilleteras = async () => {
        try {
        const data = await getAllBilleteras();
        setBilleteras(data);
        } catch (error) {
        console.log("Error al obtener las billeteras: ", error)
        }
    }
    fetchBilleteras();
    }, [])

    const arrayBilleteras = () => {
        const billeterasItems: TypeItem[] = [];
        
        billeteras.map((billetera) => billeterasItems.push({
            id: billetera.id,
            name: billetera.denominacion
        }))

        return billeterasItems;
    }

    const selectedBilletera = selectedBilleteraId !== null
    ? arrayBilleteras().find(billetera => billetera.id === Number(selectedBilleteraId))
    : null;

    const placeholder = selectedBilletera ? selectedBilletera.name : "Seleccione una billetera";

    return (
        <ComboBox 
            title="Billeteras"
            placeholder= {placeholder}
            items={arrayBilleteras()}
            onItemSelected={onItemSelected}
        />
    )
}


export default ComboBoxBilletera;