import { useEffect, useState } from "react";
import { TypeEspecie } from "@/components/especie/MisEspecies";
import ComboBox from "../ComboBox";
import { TypeItem } from "../types/typeItem";

interface ComboBoxProps {
    onItemSelected: (item: TypeItem[]) => void;
}
const ComboBoxEspecie: React.FC<ComboBoxProps> = ({
    onItemSelected
}) => {

    const [especies, setEspecies] = useState<TypeEspecie[]>([]);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;
        const fetchEspecies = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/especies', { signal });
                const data = await response.json();
                console.log(data);
                setEspecies(data);
              } catch (error) {
                console.log("Error al obtener las especies: ", error);
              }
            };
        fetchEspecies();
    }, [])

    const arrayEspecies = () => {
        const especiesItems: TypeItem[] = [];

        especies.map((especie) => especiesItems.push({
            id: especie.idEspecie,
            name: especie.denominacion
        }))

        return especiesItems;
    }

    return (
        <ComboBox
            title="Especies"
            placeholder="Seleccione una especie"
            items={arrayEspecies()}
            onItemSelected={onItemSelected}
        />
    )
}
export default ComboBoxEspecie;