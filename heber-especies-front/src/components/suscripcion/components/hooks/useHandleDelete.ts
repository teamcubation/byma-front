// hooks/useHandleDelete.ts
import { toast } from "sonner";
import { waitFor } from "@/utils/utils";
import { TypeSuscripcion } from "../../types/typeSuscripcion";

const useHandleDelete = (
  setSuscripciones: React.Dispatch<React.SetStateAction<TypeSuscripcion[]>>
) => {
  return async (id: number) => {
    const toastId = toast.loading("Generando eliminacion de la Suscripcion");
    try {
      await waitFor(2000);
      setSuscripciones((prev) => prev.filter((suscripcion) => suscripcion.idSuscripcion !== id));
      toast.success(`Suscripción ${id} eliminada exitosamente.`, { id: toastId });
    } catch (error) {
      toast.error("Error al eliminar la Suscripción.", { id: toastId });
    }
  };
};

export default useHandleDelete;
