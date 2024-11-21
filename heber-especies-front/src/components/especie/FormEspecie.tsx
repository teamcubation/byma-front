import { useState, useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { toast } from "sonner";
import BtnLoading from "../utils/BtnLoading";
import { TypeBtnLoading } from "../utils/BtnLoading";
import { waitFor } from "@/utils/utils";
import { useNavigate } from "react-router-dom";
const FormEspecie = () => {
    const [btnLoading, setBtnLoading] = useState<TypeBtnLoading>({ state: null, message: "" });
    const navigate = useNavigate();

    const formSchema = z.object({
            idEspecie: z.string().regex(/^\d+$/, { message: "El id de especie debe ser numérico" }),
            codigoCVSA: z.string()
                .min(1, { message: "El codigo CVSA es requerido" })
                .max(255, { message: "El codigo CVSA supera la cantidad máxima de caracteres" }),
            denominacion: z.string()
                .min(1, { message: "La denominación es requerida" })
                .max(255, { message: "La denominación supera la cantidad máxima de caracteres" }),
            laminaMinima: z.string().regex(/^\d+$/, { message: "El id de especie debe ser numérico" }),
            precio: z.string().regex(/^\d+$/, { message: "El precio debe ser numérico" }),
            cafci: z.string()
                .min(1, { message: "La denominación es requerida" })
                .max(255, { message: "La denominación supera la cantidad máxima de caracteres" }),
            cuentaDeEmision: z.string()
                .min(1, { message: "La denominación es requerida" })
                .max(255, { message: "La denominación supera la cantidad máxima de caracteres" }),
            estado: z.boolean(),
            idEmisor: z.string().regex(/^\d+$/, { message: "El id de organización debe ser numérico" }),
            idGerente: z.string().regex(/^\d+$/, { message: "El id de entidad legal debe ser numérico" }),
            vigencia: z.preprocess(
                (value) => (typeof value === "string" || value instanceof Date ? new Date(value) : value),
                z.date()
            ),
            plazoDeLiquidacion: z.preprocess(
                (value) => (typeof value === "string" || value instanceof Date ? new Date(value) : value),
                z.date()
            ),
            codigoCNV: z.string()
                .min(1, { message: "La denominación es requerida" })
                .max(255, { message: "La denominación supera la cantidad máxima de caracteres" }),
            isin: z.string()
                .min(1, { message: "La denominación es requerida" })
                .max(255, { message: "La denominación supera la cantidad máxima de caracteres" }),
            familiaDeFondos: z.string()
                .min(1, { message: "La denominación es requerida" })
                .max(255, { message: "La denominación supera la cantidad máxima de caracteres" }),
            observaciones: z.string()
                .min(1, { message: "La denominación es requerida" })
                .max(255, { message: "La denominación supera la cantidad máxima de caracteres" }),
            movimiento: z.boolean(),
            fechaAlta: z.preprocess(
                (value) => (typeof value === "string" || value instanceof Date ? new Date(value) : value),
                z.date()
            )
        
    })

    type FormSchema = z.infer<typeof formSchema>;

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            idEspecie: "",
            codigoCVSA: "",
            denominacion: "",
            laminaMinima: "",
            precio: "",
            cafci: "",
            cuentaDeEmision: "",
            estado: false,
            idEmisor: "",
            idGerente: "",
            codigoCNV: "",
            isin: "",
            vigencia: new Date(),
            plazoDeLiquidacion: new Date(),
            familiaDeFondos: "",
            observaciones: "",
            movimiento: false,
            fechaAlta: new Date(),
        },
    })
    const onSubmit = async (data: FormSchema) => {
        setBtnLoading({ state: 'loading', message: 'Creando especie...' });
        const response = await fetch('http://localhost:8080/api/v1/especies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        console.log(response);

        await waitFor(2000);

        if (response.status === 201) {
            setBtnLoading({ state: 'success', message: 'Especie creado correctamente' });
            navigate('/');
        } else if (response.status === 409) {
            setBtnLoading({ state: 'error', message: 'El id de especie ya se encuentra registrado' });
        } else {
            setBtnLoading({ state: 'error', message: 'Error al crear el emisor' });
        }
    }
    return (
        <div className="flex flex-col gap-6">
            <h1>Formulario</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 p-6">
                    <FormField
                        control={form.control}
                        name="idEspecie"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Id de especie</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="denominacion"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Denominación</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="precio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Precio</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="laminaMinima"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Lamina minima</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cafci"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>CAFCI</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="codigoCVSA"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Codigo CVSA</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="idEmisor"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Id emisor</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="idGerente"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Id gerente</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cuentaDeEmision"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cuenta de emision</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* <FormField
                        control={form.control}
                        name="estado"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estado</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="vigencia"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Vigencia</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="plazoDeLiquidacion"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Plazo de liquidacion</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}
                    <FormField
                        control={form.control}
                        name="codigoCNV"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Codigo CNV</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="isin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ISIN</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="familiaDeFondos"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Familia de fondos</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="observaciones"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Observaciones</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* <FormField
                        control={form.control}
                        name="movimiento"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Movimiento</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}



                    <div className="flex justify-end">
                        <BtnLoading btnLoading={btnLoading}></BtnLoading>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default FormEspecie