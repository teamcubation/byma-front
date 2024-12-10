import { FormSchema } from "../utils/validationSchema";

export const transformSuscripcionDataToForm = (data: any): Partial<FormSchema> => ({
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
});

export const transformFormDataToSuscripcion = (data: FormSchema): any => ({
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
});