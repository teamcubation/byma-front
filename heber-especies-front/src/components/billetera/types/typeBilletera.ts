import type { ISODateString } from "@/types/type"

export type TypeBilletera = {
    id: number;              
    mail: string;           
    idCuenta: number;       
    denominacion: string;    
    liquidaEnByma: boolean; 
    habilitado: boolean;    
    fechaAlta: ISODateString; 
    observaciones: string;   
    idAcdi: number;        
  }