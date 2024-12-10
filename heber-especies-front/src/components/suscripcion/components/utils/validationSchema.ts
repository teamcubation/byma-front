import { z } from "zod";

export const formSchema = z.object({
  estado: z.string().min(1, { message: "El estado es requerido" }).max(50, {
    message: "El estado supera la cantidad maxima de caracteres",
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
  cantCuotapartes: z
    .string()
    .min(1, { message: "La cantidad de cuotapartes es requerida" })
    .regex(/^\d+$/, {
      message: "La cantidad de cuotapartes debe ser un numero",
    }),
  idAcdi: z
    .string()
    .min(1, { message: "El id ACDI es requerido" })
    .regex(/^\d+$/, { message: "El id ACDI debe ser un numero" }),
  idEmisor: z
    .string()
    .min(1, { message: "El id del emisor es requerido" })
    .regex(/^\d+$/, { message: "El id del emisor debe ser un numero" }),
  nroPedido: z
    .string()
    .min(1, { message: "El numero de pedido es requerido" })
    .regex(/^\d+$/, { message: "El numero de pedido debe ser un numero" }),
  nroSecuencia: z
    .string()
    .min(1, { message: "El numero de secuencia es requerido" })
    .regex(/^\d+$/, { message: "El numero de secuencia debe ser un numero" }),
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
    .min(1, { message: "El monto es requerido" })
    .regex(/^\d+$/, { message: "El monto debe ser un numero" }),
  liquidaEnByma: z.boolean(),
  numeroReferencia: z
    .string()
    .min(1, { message: "El numero de referencia es requerido" })
    .regex(/^\d+$/, { message: "El numero de referencia debe ser un numero" }),
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
    .min(1, { message: "El id del gerente es requerido" })
    .regex(/^\d+$/, { message: "El id del gerente debe ser un numero" }),
  obligacionDePagoGenerada: z.boolean(),
  idBilletera: z
    .string()
    .min(1, { message: "El id de billetera es requerido" })
    .regex(/^\d+$/, { message: "El id de billetera debe ser un numero" }),
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
    .min(1, { message: "El codigo de estado MDW es requerido" })
    .regex(/^\d+$/, { message: "El codigo de estado MDW debe ser un numero" }),
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

export type FormSchema = z.infer<typeof formSchema>;