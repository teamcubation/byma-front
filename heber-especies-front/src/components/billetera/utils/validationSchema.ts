import { z } from 'zod';

export const formSchema = z.object({
    mail: z.string().email({message: "Debe ingresar un mail valido"}),
    idCuenta: z
    .string()
    .min(1, { message: "El numero id de Cuenta es requerido" })
    .regex(/^\d+$/, {
      message: "El numero de id Cuenta debe ser un numero",
    }),
    denominacion: z.string().min(1, { message: "La denominación es requerida" })
    .max(255, { message: "La denominación supera la cantidad máxima de caracteres" }),
    liquidaEnByma: z.boolean(),
    habilitado: z.boolean(),
    observaciones: z.string()
    .min(1, { message: "Las observaciones son requeridas" }),
    idAcdi: z.string()
    .min(1, { message: "El numero idAcdi es requerido" })
    .regex(/^\d+$/, {
      message: "El numero de idAcdi debe ser un numero",
    }),
    });

    export type FormSchema = z.infer<typeof formSchema>;