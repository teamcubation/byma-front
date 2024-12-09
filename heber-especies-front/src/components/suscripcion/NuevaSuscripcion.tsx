import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { waitFor } from "../../utils/utils";
import { useNavigate, useParams } from "react-router-dom";
import { formSchema, FormSchema } from "./components/utils/validationSchema";
import { FormInputField } from "./components/utils/FormInputField";
import {
  getSuscripcionById,
  createSuscripcion,
  updateSuscripcion,
} from "@/services/SuscripcionService";

export const NuevaSuscripcion = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      estado: "",
      nroCertificado: "",
      idEspecie: "",
      cantCuotapartes: "",
      idAcdi: "",
      idEmisor: "",
      nroPedido: "",
      nroSecuencia: "",
      fechaCambioDeEstado: "",
      rolIngresante: "",
      monto: "",
      liquidaEnByma: true,
      numeroReferencia: "",
      procesadoCustodia: false,
      ultimoError: "",
      command: "",
      procesadoLiquidacionesSlyq: false,
      idGerente: "",
      obligacionDePagoGenerada: false,
      idBilletera: "",
      fechaSincronizacion: "",
      nasdaqSiStatusReason: "",
      mdwStatusCode: "",
      mdwBusinessMessageId: "",
      mdwResponseMessage: "",
      mdwResponseDatetime: "",
      nasdaqSiStatus: "",
    },
  });

  const transformedSuscripcionDataToForm = (data: any): Partial<FormSchema> => {
    const transformedData: Partial<FormSchema> = {
      ...data,
      nroCertificado: String(data.nroCertificado ?? ""),
      idEspecie: String(data.idEspecie ?? ""),
      cantCuotapartes: String(data.cantCuotapartes ?? ""),
      idAcdi: String(data.idAcdi ?? ""),
      idEmisor: String(data.idEmisor ?? ""),
      nroPedido: String(data.nroPedido ?? ""),
      nroSecuencia: String(data.nroSecuencia ?? ""),
      monto: String(data.monto ?? ""),
      numeroReferencia: String(data.numeroReferencia ?? ""),
      idGerente: String(data.idGerente ?? ""),
      idBilletera: String(data.idBilletera ?? ""),
      mdwStatusCode: String(data.mdwStatusCode ?? ""),
      liquidaEnByma: Boolean(data.liquidaEnByma),
      procesadoCustodia: Boolean(data.procesadoCustodia),
      procesadoLiquidacionesSlyq: Boolean(data.procesadoLiquidacionesSlyq),
      obligacionDePagoGenerada: Boolean(data.obligacionDePagoGenerada),
    };
  
    return transformedData;
  };

  useEffect(() => {
    const fetchSuscripcion = async () => {
      if (id) {
        try {
          const suscripcion = await getSuscripcionById(Number(id));
          const transformedData = transformedSuscripcionDataToForm(suscripcion);
          form.reset(transformedData);
        } catch (error) {
          console.log("Error al obtener la suscripcion: ", error);
          toast.error("Error al obtener la suscripcion");
        }
      }
    };
    fetchSuscripcion();
  }, [id, form]);

  const onSubmit = async (data: FormSchema) => {
    const toastId = toast.loading(
      `${id ? "Modificando" : "Creando"} Suscripcion`
    );
    try {
      const transformedData = {
        ...data,
        nroCertificado: parseInt(data.nroCertificado),
        idEspecie: parseInt(data.idEspecie),
        cantCuotapartes: parseInt(data.cantCuotapartes),
        idAcdi: parseInt(data.idAcdi),
        idEmisor: parseInt(data.idEmisor),
        nroPedido: parseInt(data.nroPedido),
        nroSecuencia: parseInt(data.nroSecuencia),
        monto: parseInt(data.monto),
        numeroReferencia: parseInt(data.numeroReferencia),
        idGerente: parseInt(data.idGerente),
        idBilletera: parseInt(data.idBilletera),
        mdwStatusCode: parseInt(data.mdwStatusCode),
        liquidaEnByma: Boolean(data.liquidaEnByma),
        procesadoCustodia: Boolean(data.procesadoCustodia),
        procesadoLiquidacionesSlyq: Boolean(data.procesadoLiquidacionesSlyq),
        obligacionDePagoGenerada: Boolean(data.obligacionDePagoGenerada),
      };

      await waitFor(2000);

      if (id) {
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

  return (
    <div className="flex flex-col gap-4 w-6/12 mx-auto">
      <h2 className="text-center text-xl font-semibold">
        {id ? "Modificar" : "Crear"} Suscripcion
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-6"
        >
          <FormInputField
            name="estado"
            label="Estado"
            form={form}
            placeholder="Ingrese el estado"
          />
          <FormInputField
            name="nroCertificado"
            label="Numero de Certificado"
            type="number"
            form={form}
            placeholder="Ingrese el numero de certificado"
          />
          <FormInputField
            name="idEspecie"
            label="ID Especie"
            type="number"
            form={form}
            placeholder="Ingrese el ID de la especie"
          />
          <FormInputField
            name="cantCuotapartes"
            label="Cantidad de Cuotapartes"
            type="number"
            form={form}
            placeholder="Ingrese la cantidad de cuotapartes"
          />
          <FormInputField
            name="idAcdi"
            label="ID ACDI"
            type="number"
            form={form}
            placeholder="Ingrese el ID ACDI"
          />
          <FormInputField
            name="idEmisor"
            label="ID Emisor"
            type="number"
            form={form}
            placeholder="Ingrese el ID del emisor"
          />
          <FormInputField
            name="nroPedido"
            label="Numero de Pedido"
            type="number"
            form={form}
            placeholder="Ingrese el numero de pedido"
          />
          <FormInputField
            name="nroSecuencia"
            label="Numero de Secuencia"
            type="number"
            form={form}
            placeholder="Ingrese el numero de secuencia"
          />
          <FormInputField
            name="fechaCambioDeEstado"
            label="Fecha de Cambio de Estado"
            form={form}
            placeholder="Ingrese la fecha de cambio de estado"
          />
          <FormInputField
            name="rolIngresante"
            label="Rol Ingresante"
            form={form}
            placeholder="Ingrese el rol ingresante"
          />
          <FormInputField
            name="monto"
            label="Monto"
            type="number"
            form={form}
            placeholder="Ingrese el monto"
          />
          <FormInputField
            name="liquidaEnByma"
            label="Liquida en Byma"
            form={form}
            isCheckbox
          />
          <FormInputField
            name="numeroReferencia"
            label="Numero de Referencia"
            type="number"
            form={form}
            placeholder="Ingrese el numero de referencia"
          />
          <FormInputField
            name="procesadoCustodia"
            label="Procesado Custodia"
            form={form}
            isCheckbox
          />
          <FormInputField
            name="ultimoError"
            label="Último Error"
            form={form}
            placeholder="Ingrese el ultimo error"
          />
          <FormInputField
            name="command"
            label="Comando"
            form={form}
            placeholder="Ingrese el comando"
          />
          <FormInputField
            name="procesadoLiquidacionesSlyq"
            label="Procesado Liquidaciones Slyq"
            form={form}
            isCheckbox
          />
          <FormInputField
            name="idGerente"
            label="ID Gerente"
            type="number"
            form={form}
            placeholder="Ingrese el ID del gerente"
          />
          <FormInputField
            name="obligacionDePagoGenerada"
            label="Obligacion de Pago Generada"
            form={form}
            isCheckbox
          />
          <FormInputField
            name="idBilletera"
            label="ID Billetera"
            type="number"
            form={form}
            placeholder="Ingrese el ID de la billetera"
          />
          <FormInputField
            name="fechaSincronizacion"
            label="Fecha Sincronizacion"
            form={form}
            placeholder="Ingrese la fecha de sincronizacion"
          />
          <FormInputField
            name="nasdaqSiStatusReason"
            label="Razon de Status NASDAQ SI"
            form={form}
            placeholder="Ingrese la razon de status NASDAQ SI"
          />
          <FormInputField
            name="mdwStatusCode"
            label="Codigo de Estado MDW"
            type="number"
            form={form}
            placeholder="Ingrese el codigo de estado MDW"
          />
          <FormInputField
            name="mdwBusinessMessageId"
            label="ID de Mensaje de Negocio MDW"
            form={form}
            placeholder="Ingrese el ID de mensaje de negocio MDW"
          />
          <FormInputField
            name="mdwResponseMessage"
            label="Mensaje de Respuesta MDW"
            form={form}
            placeholder="Ingrese el mensaje de respuesta MDW"
          />
          <FormInputField
            name="mdwResponseDatetime"
            label="Fecha de Respuesta MDW"
            form={form}
            placeholder="Ingrese la fecha de respuesta MDW"
          />
          <FormInputField
            name="nasdaqSiStatus"
            label="Estado NASDAQ SI"
            form={form}
            placeholder="Ingrese el estado NASDAQ SI"
          />
          <div className="flex justify-end">
            <Button>Guardar</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
