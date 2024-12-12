import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { set, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import  Input  from "../../input/input"
import { Button } from "../../ui/button"
import { toast } from "sonner";
import BtnLoading from "../../utils/BtnLoading"
import { useState } from "react";
import { TypeBtnLoading } from "../../utils/BtnLoading";
import { waitFor } from "../../../utils/utils";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Checkbox from "../../checkbox/checkbox"
import TextArea from "../../textarea/textarea"
export const FormGerente = () => {

  const [btnLoading, setBtnLoading] = useState<TypeBtnLoading>({ state: null, message: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [isChecked, setIsChecked] = useState(false);


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
        response = await axios.patch(`${import.meta.env.VITE_GERENTE_BASE_URL}/gerentes/${id}`, data, { headers: { 'Content-Type': 'application/json' } });
      } else {
        response = await axios.post(`${import.meta.env.VITE_GERENTE_BASE_URL}/gerentes`, data, { headers: { 'Content-Type': 'application/json' } });
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
    <div className="container p-2 min-h-screen mx-auto flex justify-center items-center">
      <Card className="w-full lg:w-1/2">
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
                    <Input
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      placeholder="Denominación"
                      status={form.formState.errors.denominacion ? 'error' : undefined}
                      errorMessage={form.formState.errors.denominacion?.message}
                      size="l"
                      isDisabled={id ? true : false}
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mailGerente"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Input
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      placeholder="example@gmail.com"
                      status={form.formState.errors.mailGerente ? 'error' : undefined}
                      errorMessage={form.formState.errors.mailGerente?.message}
                      size="l"
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="observaciones"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observaciones</FormLabel>
                    <TextArea
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      placeholder="Observaciones"
                      status={form.formState.errors.observaciones ? 'error' : undefined}
                      errorMessage={form.formState.errors.observaciones?.message}
                      isDisabled={id ? true : false}
                      size="l"
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="liquidaEnByma"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="align-label">Liquida en Byma</FormLabel>
                    <FormControl className="mx-2">
                      <Checkbox
                        isDisabled={false}
                        isChecked={field.value}
                        onToggle={(checked) => {
                          field.onChange(checked);
                          setIsChecked(checked);
                        }}
                      />
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
  )
}
