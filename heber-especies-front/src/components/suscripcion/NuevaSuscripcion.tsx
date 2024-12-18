import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { FormInputField } from "./components/utils/FormInputField";
import { useSuscripcionForm } from "./components/hooks/useSuscripcionForm";
import ComboBox from "../comboBox/ComboBox";
import { TypeItem } from "../comboBox/types/typeItem";
import ComboBoxBilletera from "@/components/comboBox/comboBoxBilletera/ComboBoxBilletera"
import ComboBoxEspecie from "../comboBox/comboBoxEspecie/ComboBoxEspecie";
import Input from "../input/input";
import { useState, useEffect } from "react";
import { set } from "react-hook-form";
import { findEspecieById } from "@/services/EspecieService";
import { number } from "zod";
import { FormLabel } from "../ui/form";

export const NuevaSuscripcion = () => {
  const { form, onSubmit, isEditMode } = useSuscripcionForm();
  const [selectedItemEspecie, setSelectedItemEspecie] = useState<TypeItem>({ id: 0, name: '' });
  const [emisor, setEmisor] = useState<string>("");
  const [gerente, setGerente] = useState<string>("");
  const [laminaMinima, setLaminaMinima] = useState<string>("");
  const [precio, setPrecio] = useState<string>("");
  const [moneda, setMoneda] = useState<string>("");
  const [plazoDeLiquidacion, setPlazoDeLiquidacion] = useState<string>('');
  const [monto, setMonto] = useState<number>(0);
  const [cuotaPartes, setCuotaPartes] = useState<number>(1);



  const selectedItem = (items: TypeItem[]) => {
    console.log(items);

    items.map((item) => console.log(`ITEM: ${item.id} - ${item.name}`));
  };
  const handleSelectedItemEspecie = async (items: TypeItem[]) => {
    console.log(items);
    setSelectedItemEspecie(items[0]);

    items.map((item) => console.log(`ITEM: ${item.id} - ${item.name}`));

    try {
      const especie = await findEspecieById(items[0].id, new AbortController().signal);
      console.log(especie);
      setEmisor(especie.idEmisor);
      setGerente(especie.idGerente);
      setLaminaMinima(especie.laminaMinima);
      setPrecio(especie.precio);
      setMoneda(especie.idMoneda);
      setPlazoDeLiquidacion(especie.plazoDeLiquidacion);
    } catch (error) {
      console.error("Error al obtener la especie:", error);
    }
  };
  const handleMontoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMonto = parseFloat(e.target.value);
    setMonto(newMonto);
  };

  const handleCuotaPartesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCuotaPartes = parseFloat(e.target.value);
    setCuotaPartes(newCuotaPartes);
  };

  useEffect(() => {
    if (cuotaPartes > 0) {
      setPrecio((monto / cuotaPartes).toString());
    }
  }, [monto, cuotaPartes]);



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
          <FormLabel>Cuota Partes</FormLabel> 
          <Input
            value={cuotaPartes.toString()}
            onChange={handleCuotaPartesChange}
            type="number"
            placeholder="Ingrese la cantidad de cuotapartes"
            size='l'
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
          <FormLabel>Monto</FormLabel>
          <Input
            value={monto.toString()}
            onChange={handleMontoChange}
            type="number"
            size='l'
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
          <ComboBoxBilletera
            onItemSelected={selectedItem}
          />

          <ComboBoxEspecie
            onItemSelected={handleSelectedItemEspecie}
          />
          <FormLabel>Emisor</FormLabel>
          <Input
            value={emisor}
            placeholder="Emisor"
            type="text"
            size='l'
          />
          <FormLabel>Gerente</FormLabel>
          <Input
            value={gerente}
            placeholder="Gerente"
            type="text"
            size='l'
          />
          <FormLabel>Lamina Minima</FormLabel>
          <Input
            value={laminaMinima}
            placeholder="Lamina Minima"
            type="text"
            size='l'
          />
          <FormLabel>Precio</FormLabel>
          <Input
            value={precio}
            placeholder="Precio"
            type="text"
            size='l'
          />
          <FormLabel>Moneda</FormLabel>
          <Input
            value={moneda}
            placeholder="Moneda"
            type="text"
            size='l'
          />
          <FormLabel>Plazo de Liquidacion</FormLabel>
          <Input
            value={plazoDeLiquidacion}
            placeholder="Plazo de Liquidacion"
            type="text"
            size='l'
          />
          <div className="flex justify-end">
            <Button>Guardar</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

