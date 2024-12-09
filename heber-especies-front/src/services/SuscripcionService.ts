import axios from "axios";
import { TypeSuscripcion } from "../components/suscripcion/types/typeSuscripcion";

const API_URL = "http://localhost:8080/api/v1/suscripcion";

export const getSuscripciones = async (): Promise<TypeSuscripcion[]> => {
  try {
    const response = await axios.get<TypeSuscripcion[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo suscripciones service:", error);
    throw error;
  }
};

export const getSuscripcionById = async (id: number): Promise<TypeSuscripcion> => {
  try {
    const response = await axios.get<TypeSuscripcion>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo suscripcion por ID service:", error);
    throw error;
  }
};

export const createSuscripcion = async (suscripcion: Partial<TypeSuscripcion>): Promise<TypeSuscripcion> => {
  try {
    const response = await axios.post<TypeSuscripcion>(API_URL, suscripcion);
    return response.data;
  } catch (error) {
    console.error("Error creando suscripcion service:", error);
    throw error;
  }
};

export const updateSuscripcion = async (id: number, suscripcion: Partial<TypeSuscripcion>): Promise<TypeSuscripcion> => {
  try {
    const response = await axios.put<TypeSuscripcion>(`${API_URL}/${id}`, suscripcion);
    return response.data;
  } catch (error) {
    console.error("Error modificando suscripcion service:", error);
    throw error;
  }
};

export const deleteSuscripcion = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error eliminando suscripcion service:", error);
    throw error;
  }
};