import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormSchema } from "../utils/validationSchema";


export const useHandlerForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema), // Resuelve validaciones con Zod
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

  return { form };
};