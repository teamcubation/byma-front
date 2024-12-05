// /hooks/useHandleBajaSuscripcion.ts

import { toast } from "sonner";
import { TypeSuscripcion } from "../../types/typeSuscripcion";

/**
 * Hook que proporciona una función para manejar la baja de suscripciones.
 * Actualiza el estado de las suscripciones y muestra notificaciones.
 *
 * @param setSuscripciones - Función para actualizar el estado de las suscripciones.
 * @returns Función para dar de baja una suscripción.
 */
const useHandleBajaSuscripcion = (
  setSuscripciones: React.Dispatch<React.SetStateAction<TypeSuscripcion[]>>
) => {
  return async (id: number) => {
    const toastId = toast.loading("Generando baja de la Suscripción");
    try {
      // Actualizar el estado de la suscripción a "BAJA"
      setSuscripciones((prev) =>
        prev.map((suscripcion) =>
          suscripcion.idSuscripcion === id
            ? { ...suscripcion, estado: "BAJA" }
            : suscripcion
        )
      );

      toast.success(`Suscripción ${id} dada de baja exitosamente.`, {
        id: toastId,
      });
    } catch (error) {
      console.error("Error en handleBajaSuscripcion:", error);
      toast.error("Error al dar de baja la Suscripción.", { id: toastId });
    }
  };
};

export default useHandleBajaSuscripcion;
