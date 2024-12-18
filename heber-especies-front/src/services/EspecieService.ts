const BASE_URL = "http://localhost:8080/api/v1/especies";

export const findEspecieById = async (idEspecie: number, signal: AbortSignal) => {
  try {
    const response = await fetch(`${BASE_URL}/${idEspecie}`, { signal: signal });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') return;
    throw error;
  }
};