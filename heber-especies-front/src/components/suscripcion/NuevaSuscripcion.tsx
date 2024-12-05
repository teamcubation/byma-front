import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { waitFor } from "../../utils/utils";
import { useNavigate, useParams } from "react-router-dom";

import suscripcionesData from "./data/suscripciones.json";

const formSchema = z.object({
  idSuscripcion: z
    .string()
    .min(1, { message: "El id de la suscripcion es requerido" })
    .regex(/^\d+$/, { message: "El id de la suscripcion debe ser un numero" }),
  estado: z.string().min(1, { message: "El estado es requerido" }).max(50, {
    message: "El estado supera la cantidad maxima de caracteres",
  }),
  fechaAlta: z
    .string()
    .min(1, { message: "La fecha de alta es requerida" })
    .max(30, {
      message: "La fecha de alta supera la cantidad maxima de caracteres",
    }),
  nroCertificado: z
    .string()
    .min(1, { message: "El numero de certificado es requerido" })
    .regex(/^\d+$/, {
      message: "El numero de certificado debe ser un numero",
    }),
  idEspecie: z
    .string()
    .min(1, { message: "El id de la especie es requerido" })
    .regex(/^\d+$/, { message: "El id de la especie debe ser un numero" }),
  CantCuotapartes: z
    .string()
    .min(1, { message: "La cantidad de cuotapartes es requerida" })
    .regex(/^\d+$/, {
      message: "La cantidad de cuotapartes debe ser un numero",
    }),
  IdAcdi: z
    .string()
    .min(1, { message: "El id ACDI es requerido" })
    .regex(/^\d+$/, { message: "El id ACDI debe ser un numero" }),
  idEmisor: z
    .string()
    .regex(/^\d+$/, { message: "El id del emisor debe ser un numero" })
    .min(1, { message: "El id del emisor es requerido" }),
  nroPedido: z
    .string()
    .regex(/^\d+$/, { message: "El numero de pedido debe ser un numero" })
    .min(1, { message: "El numero de pedido es requerido" }),
  nroSecuencia: z
    .string()
    .regex(/^\d+$/, { message: "El numero de secuencia debe ser un numero" })
    .min(1, { message: "El numero de secuencia es requerido" }),
  fechaCambioDeEstado: z
    .string()
    .min(1, { message: "La fecha de cambio de estado es requerida" })
    .max(30, {
      message:
        "La fecha de cambio de estado supera la cantidad maxima de caracteres",
    }),
  rolIngresante: z
    .string()
    .min(1, { message: "El rol ingresante es requerido" })
    .max(50, {
      message: "El rol ingresante supera la cantidad maxima de caracteres",
    }),
  monto: z
    .string()
    .regex(/^\d+$/, { message: "El monto debe ser un numero" })
    .min(1, { message: "El monto es requerido" }),
  liquidaEnByma: z.boolean(),
  numeroReferencia: z
    .string()
    .regex(/^\d+$/, { message: "El numero de referencia debe ser un numero" })
    .min(1, { message: "El numero de referencia es requerido" }),
  procesadoCustodia: z.boolean(),
  ultimoError: z.string().max(255, {
    message: "El ultimo error supera la cantidad maxima de caracteres",
  }),
  command: z.string().max(255, {
    message: "El comando supera la cantidad maxima de caracteres",
  }),
  procesadoLiquidacionesSlyq: z.boolean(),
  idGerente: z
    .string()
    .regex(/^\d+$/, { message: "El id del gerente debe ser un numero" })
    .min(1, { message: "El id del gerente es requerido" }),
  obligacionDePagoGenerada: z.boolean(),
  idBilletera: z
    .string()
    .regex(/^\d+$/, { message: "El id de billetera debe ser un numero" })
    .min(1, { message: "El id de billetera es requerido" }),
  fechaSincronizacion: z
    .string()
    .min(1, { message: "La fecha de sincronizacion es requerida" })
    .max(30, {
      message:
        "La fecha de sincronizacion supera la cantidad maxima de caracteres",
    }),
  nasdaqSiStatusReason: z.string().max(255, {
    message:
      "La razon de status NASDAQ SI supera la cantidad maxima de caracteres",
  }),
  mdwStatusCode: z
    .string()
    .regex(/^\d+$/, { message: "El codigo de estado MDW debe ser un numero" })
    .min(1, { message: "El codigo de estado MDW es requerido" }),
  mdwBusinessMessageId: z.string().max(255, {
    message:
      "El ID de mensaje de negocio MDW supera la cantidad maxima de caracteres",
  }),
  mdwResponseMessage: z.string().max(255, {
    message:
      "El mensaje de respuesta MDW supera la cantidad maxima de caracteres",
  }),
  mdwResponseDatetime: z
    .string()
    .min(1, { message: "La fecha de respuesta MDW es requerida" })
    .max(30, {
      message:
        "La fecha de respuesta MDW supera la cantidad maxima de caracteres",
    }),
  nasdaqSiStatus: z.string().max(255, {
    message: "El estado NASDAQ SI supera la cantidad maxima de caracteres",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

const FormInputField = ({
  name,
  label,
  type = "text",
  disabled = false,
  form,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  disabled?: boolean;
  form: any;
  placeholder?: string;
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input
            {...field}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const NuevaSuscripcion = () => {
  const [suscripciones, setSuscripciones] = useState(suscripcionesData);
  const navigate = useNavigate();
  const { id } = useParams();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idSuscripcion: "",
      estado: "",
      fechaAlta: "",
      nroCertificado: "",
      idEspecie: "",
      CantCuotapartes: "",
      IdAcdi: "",
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

  useEffect(() => {
    if (id) {
      const suscripcion = suscripciones.find(
        (s) => s.idSuscripcion === parseInt(id)
      );
      if (suscripcion) {
        const transformedData = Object.keys(suscripcion).reduce((acc, key) => {
          const value = suscripcion[key as keyof typeof suscripcion];

          acc[key] = typeof value === "boolean" ? value : String(value || "");
          return acc;
        }, {} as Record<string, string | boolean>);

        form.reset(transformedData);
      } else {
        toast.error("Suscripcion no encontrada");
      }
    }
  }, [id, suscripciones, form]);

  const onSubmit = async (data: FormSchema) => {
    try {
      const toastId = toast.loading(
        `${id ? "Modificando" : "Creando"} Suscripcion`
      );

      const transformedData = {
        ...data,
        idSuscripcion: parseInt(data.idSuscripcion),
        nroCertificado: parseInt(data.nroCertificado),
        idEspecie: parseInt(data.idEspecie),
        CantCuotapartes: parseInt(data.CantCuotapartes),
        IdAcdi: parseInt(data.IdAcdi),
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
        const updatedSuscripciones = suscripciones.map((suscripcion) =>
          suscripcion.idSuscripcion === transformedData.idSuscripcion
            ? transformedData
            : suscripcion
        );
        setSuscripciones(updatedSuscripciones);
      } else {
        setSuscripciones((prevSuscripciones) => [
          ...prevSuscripciones,
          transformedData,
        ]);
      }

      toast.success(`Suscripcion ${id ? "modificada" : "creada"} con exito`, {
        id: toastId,
      });
      await waitFor(2000);
      navigate("/abm-suscripciones");
    } catch (error) {
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
            name="idSuscripcion"
            label="ID de Suscripcion"
            type="number"
            disabled={Boolean(id)}
            form={form}
            placeholder="Ingrese el ID de la suscripcion"
          />
          <FormInputField
            name="estado"
            label="Estado"
            form={form}
            placeholder="Ingrese el estado"
          />
          <FormInputField
            name="fechaAlta"
            label="Fecha de Alta"
            form={form}
            placeholder="Ingrese la fecha de alta"
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
            name="CantCuotapartes"
            label="Cantidad de Cuotapartes"
            type="number"
            form={form}
            placeholder="Ingrese la cantidad de cuotapartes"
          />
          <FormInputField
            name="IdAcdi"
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

          <FormField
            control={form.control}
            name="liquidaEnByma"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Liquida en Byma</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormInputField
            name="numeroReferencia"
            label="Numero de Referencia"
            type="number"
            form={form}
            placeholder="Ingrese el numero de referencia"
          />
          <FormField
            control={form.control}
            name="procesadoCustodia"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Procesado Custodia</FormLabel>
                <FormMessage />
              </FormItem>
            )}
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
          <FormField
            control={form.control}
            name="procesadoLiquidacionesSlyq"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Procesado Liquidaciones Slyq</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormInputField
            name="idGerente"
            label="ID Gerente"
            type="number"
            form={form}
            placeholder="Ingrese el ID del gerente"
          />
          <FormField
            control={form.control}
            name="obligacionDePagoGenerada"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Obligacion de Pago Generada</FormLabel>
                <FormMessage />
              </FormItem>
            )}
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
