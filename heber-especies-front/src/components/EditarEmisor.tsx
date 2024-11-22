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
    try {
      setBtnLoading({ state: 'loading', message: especie ? 'Editando especie...' : 'Creando especie...' });
  
      // Si existe el id de especie, editamos
      const response = await fetch(especie ? `http://localhost:8080/api/v1/especies/${id}` : 'http://localhost:8080/api/v1/especies', {
        method: especie ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      console.log(response);
  
      // Simulamos una breve espera para mejorar la UX
      await waitFor(2000);
  
      if (response.status === 200) {
        setBtnLoading({ state: 'success', message: especie ? 'Especie editada correctamente' : 'Especie creada correctamente' });
        await waitFor(2000); // Breve espera antes de navegar
        navigate('/abm-especies');
      } else if (response.status === 409) {
        setBtnLoading({ state: 'error', message: 'El id de especie ya se encuentra registrado' });
      } else {
        setBtnLoading({ state: 'error', message: 'Error al editar o crear la especie' });
      }
    } catch (error) {
      console.error('Error al procesar la especie:', error);
      setBtnLoading({ state: 'error', message: 'Error inesperado al procesar la especie' });
    } finally {
      // Aseguramos que el estado de carga se limpie si ocurre algún problema
      if (btnLoading.state === 'loading') {
        setBtnLoading({ state: 'loading', message: '' });
      }
    }
  };
  

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
