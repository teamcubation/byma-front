import { useState } from "react";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { FormInputField } from "./components/utils/FormInputField";
import { useSuscripcionForm } from "./components/hooks/useSuscripcionForm";
import ComboBox from "../comboBox/ComboBox";
import { TypeItem } from "../comboBox/types/typeItem";
import ComboBoxBilletera from "@/components/comboBox/comboBoxBilletera/ComboBoxBilletera"
import { useEffect } from "react";

export const NuevaSuscripcion = () => {
  const { form, onSubmit, isEditMode} = useSuscripcionForm();

  const selectBilletera = (items: TypeItem[]) => {
    const billetera = items[0];
    form.setValue("idBilletera", String(billetera.id));

    console.log(items);
    console.log(`billetera: ${billetera.id} ${billetera.name}`);
  };
  
  return (
    <div className="flex flex-col gap-4 w-6/12 mx-auto">
      <h2 className="text-center text-xl font-semibold">
        {isEditMode ? "Modificar" : "Crear"} Suscripcion
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
          {/* <FormInputField
            name="idBilletera"
            label="ID Billetera"
            form={form}
            placeholder="Ingrese el ID de la billetera"
          /> */}
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
          <ComboBoxBilletera 
            onItemSelected={selectBilletera}
            selectedBilleteraId={form.getValues("idBilletera")}
          />
          <input
            type="hidden"
            {...form.register("idBilletera")}
          />
          <div className="flex justify-end">
            <Button>Guardar</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

