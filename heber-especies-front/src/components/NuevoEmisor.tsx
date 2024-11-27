import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { set, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { toast } from "sonner";
import BtnLoading from "./utils/BtnLoading"
import { useState } from "react";
import { TypeBtnLoading } from "./utils/BtnLoading";
import { waitFor } from "../utils/utils";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export const NuevoEmisor = () => {
  const [btnLoading, setBtnLoading] = useState<TypeBtnLoading>({ state: null, message: "" });
  const navigate = useNavigate();

  const formSchema = z.object({
    denominacion: z.string()
      .min(1, { message: "La denominación es requerida" })
      .max(255, { message: "La denominación supera la cantidad máxima de caracteres" }),
    email: z.string().email({ message: "El email no tiene el formato correcto" }),
    cuentaEmisor: z.string()
      .min(1, { message: "La cuenta de emisor es requerida" })
      .max(255, { message: "La cuenta de emisor supera la cantidad máxima de caracteres" }),
    idOrganizacion: z.string().regex(/^\d+$/, { message: "El id de organización debe ser numérico" }),
    idEntidadLegal: z.string().regex(/^\d+$/, { message: "El id de entidad legal debe ser numérico" }),
  })

  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      denominacion: "",
      email: "",
      cuentaEmisor: "",
      idOrganizacion: "",
      idEntidadLegal: "",
    },
  })

  const onSubmit = async (data: FormSchema) => {
    setBtnLoading({ state: 'loading', message: 'Creando emisor...' });


    try {
      const response = await axios.post('http://localhost:10001/api/v1/emisores', data, { headers: { 'Content-Type': 'application/json' } });
      console.log(response, "response");
      await waitFor(2000);
      setBtnLoading({ state: 'success', message: 'Emisor creado correctamente' });
      await waitFor(1000);
      navigate('/abm-emisores');

    } catch (error: any) {
      console.log(typeof (error));
      console.log(error.status, "error");
      if (error.response.status === 409) {
        setBtnLoading({ state: 'error', message: 'El email ya se encuentra registrado' });
      } else {

        setBtnLoading({ state: 'error', message: 'Error al crear el emisor' });
      }
    }



  }

  return (
    <div className="flex flex-col gap-6">
      <h1>Formulario</h1>
      <div className="container min-h-screen mx-auto flex justify-center items-center">
        <Card className="lg:w-1/2">
          <CardHeader>
            <CardTitle>{"Nuevo Emisor"}</CardTitle>
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cuentaEmisor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cuenta de emisor</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="idOrganizacion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Id de organización</FormLabel>
                      <FormControl>
                        <Input type='number' placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="idEntidadLegal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Id de entidad legal</FormLabel>
                      <FormControl>
                        <Input type='number' placeholder="" {...field} />
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



    </div>
  )
}
