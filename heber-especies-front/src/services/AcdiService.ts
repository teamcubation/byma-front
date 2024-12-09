const API_URL = "http://localhost:10003/api/v1/acdis";

export const getAcdis = async (signal?: AbortSignal) => {
    try {
      const response = await fetch(API_URL, { signal });
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Error al obtener los acdis");
      }
    } catch (error) {
      console.log('catchErrorService: ', error)
      if (error instanceof DOMException && error.name === "AbortError") return;
    }
  };

export const getAcdiById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Error al cargar el ACDI");
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Error desconocido");
  }
};

export const createAcdi = async (data: object) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Error al crear el ACDI");
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Error desconocido");
  }
};

export const updateAcdi = async (id: string, data: object) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Error al actualizar el ACDI");
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Error desconocido");
  }
};

export const deleteAcdi = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) {
      throw new Error("Error al eliminar el ACDI");
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Error desconocido");
  }
};

export const bajaAcdi = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/${id}/baja`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Error al dar de baja el ACDI");
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Error desconocido");
  }
};