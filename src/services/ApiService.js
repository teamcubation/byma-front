// src/services/apiService.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const URL = "/emisores";
const API = axios.create({
  baseURL: API_URL
})

export const obtenerEmisores = async () => {
  const respuesta = await API.get("/api/emisores");
  return respuesta.data;
};

export const agregarEmisor = async (datosEmisor) => {
  console.log("ESTOY EN API SERVICE:", datosEmisor);
  
  try {
    const respuesta = await API.post("/api/emisores", datosEmisor);
    return respuesta.data;
  } catch (error) {
    console.error("Error al agregar el emisor:", error.response?.data);
    throw error;
  }
  
};

export const actualizarEmisor = async (id, datosActualizadosEmisor) => {
  const respuesta = await API.put(`/api/emisores/${id}`, datosActualizadosEmisor);
  return respuesta.data;
};

export const eliminarEmisor = async (id) => {
  await API.delete(`/api/emisores/${id}`);
};



