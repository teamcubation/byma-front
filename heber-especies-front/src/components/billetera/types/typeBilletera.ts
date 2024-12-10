import type { ISODateString } from "@/types/type"

export type TypeBilletera = {
    id: number;              
    mail: string;           
    idCuenta: string;       
    denominacion: string;    
    liquidaEnByma: boolean; 
    habilitado: boolean;    
    fechaAlta: ISODateString; 
    observaciones: string;   
    idAcdi: string;        
  }