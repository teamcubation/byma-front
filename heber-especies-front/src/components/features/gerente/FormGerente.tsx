import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { set, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { toast } from "sonner";
import BtnLoading from "../../utils/BtnLoading"
import { useState } from "react";
import { TypeBtnLoading } from "../../utils/BtnLoading";
import { waitFor } from "../../../utils/utils";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const FormGerente = () => {

  const [btnLoading, setBtnLoading] = useState<TypeBtnLoading>({ state: null, message: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  console.log(location.state?.gerente, "gerente");

  const formSchema = z.object({
    denominacion: z.string()
      .min(1, { message: "La denominación es requerida" })
      .max(255, { message: "La denominación supera la cantidad máxima de caracteres" }),
    mailGerente: z.string().email({ message: "El email no tiene el formato correcto" }),
    observaciones: z.string()
      .min(1, { message: "Las observaciones del gerente son requeridas" })
      .max(255, { message: "Las observaciones del gerente superan la cantidad máxima de caracteres" }),
    liquidaEnByma: z.boolean(),
    habilitado: z.boolean(),
  })

  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      denominacion: location.state?.gerente.denominacion ?? "",
      mailGerente: location.state?.gerente.mailGerente ?? "",
      observaciones: location.state?.gerente.observaciones ?? "",
      liquidaEnByma: location.state?.gerente.liquidaEnByma ?? true,
      habilitado: location.state?.gerente.habilitado ?? true
    },
  })

  const onSubmit = async (data: FormSchema) => {
    console.log(data);
    setBtnLoading({ state: 'loading', message: location.state?.gerente ? "Editando Gerente..." : "Creando Gerente..." });


    try {
      let response;

      if (location.state?.gerente) {
        response = await axios.patch(`http://localhost:8080/api/v1/gerentes/${id}`, data, { headers: { 'Content-Type': 'application/json' } });
      } else {
        response = await axios.post('http://localhost:8080/api/v1/gerentes', data, { headers: { 'Content-Type': 'application/json' } });
      }

      console.log(response, "response");
      await waitFor(2000);
      setBtnLoading({ state: 'success', message: 'Emisor creado correctamente' });
      await waitFor(1000);
      navigate('/abm-gerentes');

    } catch (error: any) {
      console.log(typeof (error));
      console.log(error.status, "error");
      if (error.response.status === 409) {
        setBtnLoading({ state: 'error', message: 'El email ya se encuentra registrado' });
      } else {

        setBtnLoading({ state: 'error', message: 'Error al crear el gerente' });
      }
    }

  }

  return (
    <div className="container min-h-screen mx-auto flex justify-center items-center">
      <Card className="lg:w-1/2">
        <CardHeader>
          <CardTitle>{id ? "Editar Gerente" : "Nuevo Gerente"}</CardTitle>
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
                      <Input placeholder="" disabled={location.state?.gerente && true} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mailGerente"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com"  {...field} />
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
                      <Textarea placeholder="" disabled={location.state?.gerente && true} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="liquidaEnByma"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="mx-2">
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Liquida en Byma</FormLabel>
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
  )
}
