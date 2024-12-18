import { useEffect, useState } from "react";
import { TypeBilletera } from "@/components/billetera/types/typeBilletera";
import { getAllBilleteras } from "@/services/BilleteraService";
import ComboBox from "../ComboBox";
import { TypeItem } from "../types/typeItem";

interface ComboBoxProps {
  onItemSelected: (item: TypeItem[]) => void;
  id: string | null,
}

const ComboBoxBilletera: React.FC<ComboBoxProps> = ({
    onItemSelected,
    id = null
    }) => {

    const [billeteras, setBilleteras] = useState<TypeBilletera[]>([]);

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

    return (
        <ComboBox 
            title="Billeteras"
            placeholder= "Seleccione una billetera"
            items={arrayBilleteras()}
            onItemSelected={onItemSelected}
        />
    )
}


export default ComboBoxBilletera;