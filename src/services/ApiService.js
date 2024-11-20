// src/services/apiService.js

const API_URL = process.env.REACT_APP_API_URL;

/**
 * Realiza una solicitud GET a la API.
 * @param {string} endpoint - El endpoint relativo (ejemplo: '/api/users').
 * @returns {Promise<any>} - La respuesta de la API en formato JSON.
 */
export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
        console.error('Error al obtener datos:', error);
        throw error;
  }
};

/**
 * Realiza una solicitud POST a la API.
 * @param {string} endpoint - El endpoint relativo (ejemplo: '/api/users').
 * @param {object} data - Los datos a enviar en el cuerpo de la solicitud.
 * @returns {Promise<any>} - La respuesta de la API en formato JSON.
 */
export const postData = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error al enviar datos:', error);
    throw error;
  }
};
