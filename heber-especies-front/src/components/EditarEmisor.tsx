import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export const EditarEmisor = () => {
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

  const onSubmit = (data: FormSchema) => {
    console.log(data)
  }

  return (
    <div className="flex flex-col gap-6">
      <h1>Formulario para editar</h1>

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
            <Button type="submit">Crear</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
