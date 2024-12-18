import { toast } from "sonner";
import { useEffect } from "react";
import { waitFor } from "../../../../utils/utils";
import { useNavigate, useParams } from "react-router-dom";
import { FormSchema } from "../utils/validationSchema";
import {
  getSuscripcionById,
  createSuscripcion,
  updateSuscripcion,
} from "@/services/SuscripcionService";
import { transformFormDataToSuscripcion, transformSuscripcionDataToForm } from "../utils/transformData";
import { useHandlerForm } from "./useHandlerForm";

export const useSuscripcionForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const { form } = useHandlerForm();

  useEffect(() => {
    const fetchSuscripcion = async () => {
      if (isEditMode) {
        try {
          const suscripcion = await getSuscripcionById(Number(id));
          const transformedData = transformSuscripcionDataToForm(suscripcion);
          form.reset(transformedData);
        } catch (error) {
          console.log("Error al obtener la suscripcion: ", error);
          toast.error("Error al obtener la suscripcion");
        }
      }
    };
    fetchSuscripcion();
  }, [id, form, isEditMode]);

  const onSubmit = async (data: FormSchema) => {
    console.log(data);
    debugger

    const toastId = toast.loading(
      `${isEditMode ? "Modificando" : "Creando"} Suscripcion`
    );
    try {
      const transformedData = transformFormDataToSuscripcion(data);
      await waitFor(2000);

      if (isEditMode) {
        await updateSuscripcion(Number(id), transformedData);
      } else {
        await createSuscripcion(transformedData);
      }
      toast.success(`Suscripcion ${id ? "modificada" : "creada"} con exito`, {
        id: toastId,
      });
      await waitFor(2000);
      navigate("/abm-suscripciones");
    } catch (error) {
      console.log("Error inesperado: ", error);
      toast.error("Error inesperado");
    }
  };

  return { form, onSubmit, isEditMode};
};
