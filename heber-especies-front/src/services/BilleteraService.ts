import { TypeBilletera } from "@/components/billetera/types/typeBilletera";
import axios from "axios";

const URL_BASE_REST_API = "http://localhost:8080/api/v1/billeteras";

export const getAllBilleteras = async (): Promise<TypeBilletera[]> => {
    try {
        const response = await axios.get<TypeBilletera[]>(URL_BASE_REST_API);
        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}

export const createBilletera = async (billetera: Partial<TypeBilletera>): Promise<TypeBilletera> => {
    try {
        const response = await axios.post<TypeBilletera>(URL_BASE_REST_API, billetera);
        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}

export const getBilleteraById = async (idBilletera: number): Promise<TypeBilletera> => {
    try {
        const response = await axios.get<TypeBilletera>(URL_BASE_REST_API + '/' + idBilletera);
        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}

export const updateBilletera = async (idBilletera: number, billetera: Partial<TypeBilletera>): Promise<TypeBilletera> => {
    try {
        const response = await axios.put<TypeBilletera>(URL_BASE_REST_API + '/' + idBilletera, billetera);
        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}

export const deleteBilletera = async (idBilletera: number): Promise<void> => {
    try {
        await axios.delete(URL_BASE_REST_API + '/' + idBilletera);
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}