import { toast } from "sonner";
import { TypeSuscripcion } from "../../types/typeSuscripcion";

const useHandleBajaSuscripcion = (
  setSuscripciones: React.Dispatch<React.SetStateAction<TypeSuscripcion[]>>
) => {
  return async (id: number) => {
    const toastId = toast.loading("Generando baja de la Suscripcion");
    try {
      setSuscripciones((prev) =>
        prev.map((suscripcion) =>
          suscripcion.idSuscripcion === id
            ? { ...suscripcion, estado: "BAJA" }
            : suscripcion
        )
      );

      toast.success(`Suscripcion ${id} dada de baja exitosamente.`, {
        id: toastId,
      });
    } catch (error) {
      console.error("Error en handleBajaSuscripcion:", error);
      toast.error("Error al dar de baja la Suscripcion.", { id: toastId });
    }
  };
};

export default useHandleBajaSuscripcion;