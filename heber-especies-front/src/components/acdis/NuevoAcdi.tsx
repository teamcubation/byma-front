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
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { waitFor } from "../../utils/utils";
import { useNavigate, useParams } from "react-router-dom";
import { getAcdiById, createAcdi, updateAcdi } from "../../services/AcdiService"
import Input from "../input/input";
import Checkbox from "../checkbox/checkbox";
import TextArea from "../textarea/textarea";

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
    .min(1, { message: "Las observaciones son requeridas" })
    .max(255, {
      message: "Las observaciones superan la cantidad máxima de caracteres",
    }),
  mail: z.string().email({ message: "El email no tiene el formato correcto" }),
});

type FormSchema = z.infer<typeof formSchema>;

export const NuevoAcdi = () => {
  const [formReady, setFormReady] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [isCheckedBilletera, setIsCheckedBilletera] = useState(false);
  const [isCheckedLiquidaEnByma, setIsCheckedLiquidaEnByma] = useState(false);
  const [isCheckedHabilitado, setIsCheckedHabilitado] = useState(false);


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

      toast.success(`ACDI ${id ? "modificado" : "creado"} con exito`, { id: toastId });
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
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="Id de organización"
                    status={form.formState.errors.idOrganizacion ? 'error' : undefined}
                    errorMessage={form.formState.errors.idOrganizacion?.message}
                    size="l"
                    isDisabled={id ? true : false}
                  />
                </FormControl>
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
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="Denominación"
                    status={form.formState.errors.denominacion ? 'error' : undefined}
                    errorMessage={form.formState.errors.denominacion?.message}
                    size="l"
                    isDisabled={id ? true : false}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="liquidaEnByma"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Liquida en Byma</FormLabel>

                <FormControl>
                  <Checkbox
                    isDisabled={false}
                    isChecked={field.value}
                    onToggle={(checked) => {
                      field.onChange(checked);
                      setIsCheckedLiquidaEnByma(checked);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="habilitado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Habilitado</FormLabel>

                <FormControl>
                  <Checkbox
                    isDisabled={id ? true : false}
                    isChecked={field.value}
                    onToggle={(checked) => {
                      field.onChange(checked);
                      setIsCheckedHabilitado(checked);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="billeteras"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billeteras</FormLabel>

                <FormControl>
                  <Checkbox
                    isDisabled={id ? true : false}
                    isChecked={field.value}
                    onToggle={(checked) => {
                      field.onChange(checked);
                      setIsCheckedBilletera(checked);
                    }}
                  />
                </FormControl>
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
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="Email"
                    status={form.formState.errors.mail ? 'error' : undefined}
                    errorMessage={form.formState.errors.mail?.message}
                    size="l"
                  />                </FormControl>
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
                  <TextArea
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="Observaciones"
                    status={form.formState.errors.observaciones ? 'error' : undefined}
                    errorMessage={form.formState.errors.observaciones?.message}
                    size="l"
                    isDisabled={id ? true : false}
                  />                </FormControl>
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
