import { useState, useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import BtnLoading from "../utils/BtnLoading";
import { TypeBtnLoading } from "../utils/BtnLoading";
import { waitFor } from "@/utils/utils";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Checkbox } from "../ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
const FormEspecie = () => {
    const location = useLocation();
    const especie = location.state?.especie || null;
    const { id } = useParams();

    useEffect(() => {
        console.log("idEspecie recibido:", id);
    }, [id]);


    const [btnLoading, setBtnLoading] = useState<TypeBtnLoading>({ state: null, message: "" });
    const navigate = useNavigate();

    const formSchema = z.object({
        codigoCVSA: z.string()
            .min(1, { message: "El codigo CVSA es requerido" })
            .max(255, { message: "El codigo CVSA supera la cantidad máxima de caracteres" }),
        denominacion: z.string()
            .min(1, { message: "La denominación es requerida" })
            .max(255, { message: "La denominación supera la cantidad máxima de caracteres" }),
        laminaMinima: z.string().regex(/^\d+$/, { message: "La lamina minima debe ser numérico" }),
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
            (value) => {
                if (typeof value === "string") return new Date(value);
                if (value instanceof Date) return value;
                return new Date();
            },
            z.date()
        ),
        plazoDeLiquidacion: z.preprocess(
            (value) => {
                if (typeof value === "string") return new Date(value);
                if (value instanceof Date) return value;
                return new Date();
            },
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
        idMoneda: z.string().regex(/^\d+$/, { message: "El id de la moneda debe ser numérico" }),
        fechaAlta: z.preprocess(
            (value) => {
                if (typeof value === "string") return new Date(value);
                if (value instanceof Date) return value;
                return new Date();
            },
            z.date()
        )

    })

    type FormSchema = z.infer<typeof formSchema>;
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            codigoCVSA: especie?.codigoCVSA ?? "",
            denominacion: especie?.denominacion ?? "",
            laminaMinima: especie?.laminaMinima ?? "",
            precio: especie?.precio ?? "",
            cafci: especie?.cafci ?? "",
            cuentaDeEmision: especie?.cuentaDeEmision ?? "",
            estado: especie?.estado ?? false,
            idEmisor: especie?.idEmisor ?? "",
            idGerente: especie?.idGerente ?? "",
            codigoCNV: especie?.codigoCNV ?? "",
            isin: especie?.isin ?? "",
            vigencia: especie?.vigencia ?? Date.now(),
             plazoDeLiquidacion: especie?.plazoDeLiquidacion ?? Date.now(),
            familiaDeFondos: especie?.familiaDeFondos ?? "",
            observaciones: especie?.observaciones ?? "",
            idMoneda: especie?.idMoneda ?? "",
            fechaAlta: especie?.fechaAlta ?? Date.now(),
        },
    })
    const onSubmit = async (data: FormSchema) => {
        try {
            if (especie) {
                setBtnLoading({ state: 'loading', message: 'Editando especie...' });
                const response = await fetch(`http://localhost:10002/api/v1/especies/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    setBtnLoading({ state: 'success', message: 'Especie editada correctamente' });
                    await waitFor(2000);
                    navigate('/abm-especies');
                } else if (response.status === 409) {
                    setBtnLoading({ state: 'error', message: 'El id de especie ya se encuentra registrado' });
                } else {
                    setBtnLoading({ state: 'error', message: 'Error al editar la especie' });
                }
            } else {
                const dataToSend = {
                    ...data,
                    vigencia: new Date(data.vigencia).toISOString(),
                    plazoDeLiquidacion: new Date(data.plazoDeLiquidacion).toISOString(),
                    fechaAlta: new Date(data.fechaAlta).toISOString()
                }
                setBtnLoading({ state: 'loading', message: 'Creando especie...' });

                const response = await fetch(`http://localhost:10002/api/v1/especies`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSend),
                });

                if (response.ok) {
                    setBtnLoading({ state: 'success', message: 'Especie creada correctamente' });
                    await waitFor(2000);
                    navigate('/abm-especies');
                } else if (response.status === 409) {
                    setBtnLoading({ state: 'error', message: 'El id de especie ya se encuentra registrado' });
                } else {
                    setBtnLoading({ state: 'error', message: 'Error al crear la especie' });
                }
            }
        } catch (error: any) {
            console.error(error);
            setBtnLoading({ state: 'error', message: 'Error al procesar la solicitud' });
        }
    };




    return (
        <div className="container min-h-screen mx-auto flex justify-center items-center">

            <Card className="lg:w-1/2">
                <CardHeader>
                    <CardTitle>{id ? "Editar especie" : "Crear nueva especie"}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 p-6">
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
                                    <Input type="number" placeholder="" {...field} />
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
                                    <Input type="number" placeholder="" {...field} />
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
                                    <Input placeholder="" {...field} 
                                    readOnly={!!especie}
                                    className={especie ? "bg-gray-100 cursor-not-allowed" : ""}
                                    />
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
                                    <Input type="number" placeholder="" {...field} />
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
                                    <Input type="number" placeholder="" {...field} />
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
                    {<FormField
                        control={form.control}
                        name="estado"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estado</FormLabel>
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    /*
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
                            <FormField
                                control={form.control}
                                name="idMoneda"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ID Moneda</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />



                            <div className="flex justify-end">
                                <BtnLoading btnLoading={btnLoading}></BtnLoading>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
export default FormEspecie