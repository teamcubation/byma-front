// utils/validation.ts
export const validateForm = (nombre: string, precio: number, periodo: string) => {
    const errors: { [key: string]: string } = {};
    if (!nombre) errors.nombre = "El nombre es obligatorio.";
    if (precio <= 0) errors.precio = "El precio debe ser mayor a 0.";
    if (!periodo) errors.periodo = "El periodo es obligatorio.";
    return errors;
  };
  