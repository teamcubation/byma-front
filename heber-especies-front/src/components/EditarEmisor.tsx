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
import { useLocation, useNavigate, useParams } from "react-router-dom"

export const EditarEmisor = () => {
  const [btnLoading, setBtnLoading] = useState<TypeBtnLoading>({ state: null, message: "" });
  
  const navigate = useNavigate();
  const {id} = useParams();
  const location = useLocation();
  console.log(id, "id emisor");
  console.dir(location.state.emisor, "emisor");

  const formSchema = z.object({
    id: z.number(),
    denominacion: z.string()
      .min(1, { message: "La denominación es requerida" })
      .max(255, { message: "La denominación supera la cantidad máxima de caracteres" }),
    email: z.string().email({ message: "El email no tiene el formato correcto" }),
    cuentaEmisor: z.string()
      .min(1, { message: "La cuenta de emisor es requerida" })
      .max(255, { message: "La cuenta de emisor supera la cantidad máxima de caracteres" }),
    idOrganizacion: z.string(),
    idEntidadLegal: z.string()
  })

  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: location.state.emisor.id,
      denominacion: location.state.emisor.denominacion,
      email: location.state.emisor.email,
      cuentaEmisor: location.state.emisor.cuentaEmisor,
      idOrganizacion: location.state.emisor.idOrganizacion,
      idEntidadLegal: location.state.emisor.idEntidadLegal,
    },
  })

  const onSubmit = async (data: FormSchema) => {
    setBtnLoading({ state: 'loading', message: 'Creando emisor...' });
    const response = await fetch('http://localhost:8080/api/emisores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    console.log(response);

    await waitFor(2000);

    if (response.status === 201) {
      setBtnLoading({ state: 'success', message: 'Emisor creado correctamente' });
      navigate('/abm-emisores');
    } else if (response.status === 409) {
      setBtnLoading({ state: 'error', message: 'El email ya se encuentra registrado' });
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
    </div>
  )
}
