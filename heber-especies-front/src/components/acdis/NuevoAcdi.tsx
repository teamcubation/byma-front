import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { waitFor } from "../../utils/utils";
import { useNavigate, useParams } from "react-router-dom";
import { getAcdiById, createAcdi, updateAcdi } from "../../services/AcdiService"

const formSchema = z.object({
  idOrganizacion: z
    .string()
    .min(1, { message: "La Organizacion es requerida" })
    .max(55, {
      message: "La organizacion supera la cantidad máxima de caracteres",
    }),
  denominacion: z
    .string()
    .min(1, { message: "La denominación es requerida" })
    .max(255, {
      message: "La denominación supera la cantidad máxima de caracteres",
    }),
  liquidaEnByma: z.boolean(),
  habilitado: z.boolean(),
  billeteras: z.boolean(),
  observaciones: z
    .string()
    .min(1, { message: "La denominación es requerida" })
    .max(255, {
      message: "La denominación supera la cantidad máxima de caracteres",
    }),
  mail: z.string().email({ message: "El email no tiene el formato correcto" }),
});

type FormSchema = z.infer<typeof formSchema>;

export const NuevoAcdi = () => {
  const [formReady, setFormReady] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idOrganizacion: "",
      denominacion: "",
      liquidaEnByma: true,
      habilitado: true,
      billeteras: false,
      observaciones: "",
      mail: "",
    },
  });

  useEffect(() => {
    if (id) {
      const fetchAcdi = async () => {
        try {
          const data = await getAcdiById(id);
          form.reset(data);
          setFormReady(true);
        } catch (error) {
          toast.error("Error al cargar el ACDI");
        }
      };
      fetchAcdi();
    } else {
      setFormReady(true);
    }
  }, [id]);

  const onSubmit = async (data: FormSchema) => {
    try {
      const toastId = toast.loading(`${id ? "Modificando" : "Creando"} Acdi`);
      await waitFor(2000);
      id ? await updateAcdi(id, data) : await createAcdi(data);

      toast.success(`ACDI ${id ? "modificado" : "creado"} con éxito`, { id: toastId });
      await waitFor(2000);
      navigate("/abm-acdis");
    } catch (error) {
      toast.error("Error inesperado");
    }
  };

  const handleTitle = () =>
    id ? (
      <h2 className="text-center text-xl font-semibold">Modificar Acdi</h2>
    ) : (
      <h2 className="text-center text-xl font-semibold">Crear Acdi</h2>
    );

  return (
    <div className="flex flex-col gap-4 w-6/12 mx-auto">
      {handleTitle()}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-6"
        >
          <FormField
            control={form.control}
            name="idOrganizacion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Id de organización</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Id Organizacion"
                    {...field}
                    disabled={Boolean(id)}
                  />
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
                  <Input
                    placeholder="Denominacion"
                    {...field}
                    disabled={Boolean(id)}
                  />
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
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Liquida en Byma</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="habilitado"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={Boolean(id)}
                  />
                </FormControl>
                <FormLabel>Habilitado</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="billeteras"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={Boolean(id)}
                  />
                </FormControl>
                <FormLabel>Billeteras</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mail"
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
            name="observaciones"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observaciones</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} disabled={Boolean(id)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button>Guardar</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
