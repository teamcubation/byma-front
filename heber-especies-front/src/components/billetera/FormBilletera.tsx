import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { waitFor } from "../../utils/utils";
import { useNavigate, useParams } from "react-router-dom";
import { formSchema, FormSchema } from "./utils/validationSchema";
import { createBilletera, getBilleteraById, updateBilletera } from "@/services/BilleteraService";
import { FormInputField } from "./utils/FormInputField";

export const FormBilletera = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            mail: "",
            idCuenta: "",
            denominacion: "",
            liquidaEnByma: true,
            habilitado: false,
            observaciones: "",
            idAcdi: "",
        },
    });

    const transformedBilleteraDataToForm = (data: any): Partial<FormSchema> => {
        console.log("Data: ", data);
        const transformedData: Partial<FormSchema> = {
            ...data,
            mail: String(data.mail ?? ""),
            idCuenta: String(data.idCuenta ?? ""),
            denominacion: String(data.denominacion ?? ""),
            liquidaEnByma: Boolean(data.liquidaEnByma),
            habilitado: Boolean(data.habilitado),
            observaciones: String(data.observaciones ?? ""),
            idAcdi: String(data.idAcdi ?? ""),
        };
        return transformedData;
    };

    useEffect(() => {
        console.log("Id: ", id);
        const fetchBilletera = async () => {
            if (id) {
                try {
                    const billetera = await getBilleteraById(Number(id));
                    console.log("Billetera obtenida: ", billetera);
                    const transformedData = transformedBilleteraDataToForm(billetera);
                    form.reset(transformedData);
                } catch (error) {
                    console.log("Error al obtener la billetera: ", error);
                    toast.error("Error al obtener la billetera");
                }
            }
        };
        fetchBilletera();
    }, [id, form]);

    const onSubmit = async (data: FormSchema) => {
        console.log("Datos onSubmit", data);
        const toastId = toast.loading(
            `${id ? "Modificando" : "Creando"} Suscripcion`
        );
        try {
            const transformedData = {
                ...data,
                liquidaEnByma: Boolean(data.liquidaEnByma),
                habilitado: Boolean(data.habilitado),
                idCuenta: parseInt(data.idCuenta),
                idAcdi: parseInt(data.idAcdi),
            };

            await waitFor(2000);

            if (id) {
                await updateBilletera(Number(id), transformedData);
            } else {
                await createBilletera(transformedData);
            }
            toast.success(`Billetera ${id ? "modificada" : "creada"} con exito`, {
                id: toastId,
            });
            await waitFor(2000);
            navigate("/abm-billeteras");
        } catch (error) {
            console.log("Error inesperado: ", error);
            toast.error("Error inesperado");
        }
    };

    return (
        <div className="flex flex-col gap-4 w-6/12 mx-auto">
            <h2 className="text-center text-xl font-semibold">
                {id ? "Modificar" : "Crear"} Billetera
            </h2>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 p-6"
                >
                    <FormInputField
                        name="mail"
                        label="Email"
                        form={form}
                        placeholder="Ingrese el email"
                    />
                    <FormInputField
                        name="idCuenta"
                        label="Id Cuenta"
                        type="number"
                        form={form}
                        placeholder="Ingrese el id de la cuenta"
                    />
                    <FormInputField
                        name="denominacion"
                        label="Denominación"
                        form={form}
                        placeholder="Ingrese la denominación"
                    />
                    <FormInputField
                        isCheckbox={true}
                        name="habilitado"
                        label="Habilitado"
                        form={form}
                    />
                    <FormInputField
                        name="observaciones"
                        label="Observaciones"
                        form={form}
                        placeholder="Ingrese las observaciones"
                    />
                    <FormInputField
                        name="idAcdi"
                        label="Id Acdi"
                        type="number"
                        form={form}
                        placeholder="Ingrese el id Acdi"
                    />
                    <FormInputField
                        name="liquidaEnByma"
                        label="Liquida en BYMA"
                        form={form}
                        placeholder="Ingrese si liquida en BYMA"
                        isCheckbox={true}
                    />

                    <div className="flex justify-end">
                        <Button>Guardar</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}