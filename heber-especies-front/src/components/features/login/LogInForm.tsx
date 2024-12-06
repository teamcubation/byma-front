import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleX, Loader2, LockKeyhole, User } from "lucide-react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { z } from "zod"
import LogInFormItem from "./LogInFormItem"



const formSchema = z.object({
    username: z
        .string()
        .min(1, { message: "El nombre de usuario es requerido" }),
    password: z
        .string()
        .min(1, { message: "La contraseña es requerida" }),

});

type Props = {
    isLoading: boolean,
    onSubmit: (data: z.infer<typeof formSchema>) => Promise<void>
}
function LogInForm({ isLoading, onSubmit }: Props) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "all",
        defaultValues: {
            username: "",
            password: "",
        }
    })
    return (
        <>
            <Form {...form}>
                <form className={`flex flex-col gap-4`} onSubmit={form.handleSubmit(onSubmit)}>
                    
                    <LogInFormItem
                        form={form}
                        name="username"
                        label="Usuario:"
                        isLoading={isLoading}
                        placeholder='jose99'
                        startContent={<User className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${form.formState.errors.username && "text-red-500"}`} strokeWidth={1} size={24} />}
                        endContent={<CircleX className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500" strokeWidth={1} size={24} />} />
                    
                    <LogInFormItem
                        form={form}
                        name="password"
                        label="Contraseña:"
                        placeholder='••••••••••••••'
                        type="password" 
                        isLoading={isLoading}
                        startContent={<LockKeyhole className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${form.formState.errors.password && "text-red-500"}`} strokeWidth={1} size={24} />}
                        endContent={<CircleX className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500" strokeWidth={1} size={24} />}
                    />


                    {
                        isLoading ? (
                            <Button type='submit' className='w-full bg-white' disabled={isLoading}>
                                <Loader2 className="animate-spin mr-1" />
                                Cargando...
                            </Button>
                        ) : (
                            <Button type='submit' className='w-full bg-white' disabled={isLoading}>Enviar</Button>
                        )
                    }
                    <Link to="/" className='text-white text-sm text-center'>¿Olvidaste la contraseña?</Link>

                </form>

            </Form>
        </>
    )
}

export default LogInForm