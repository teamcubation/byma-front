import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Toaster } from '@/components/ui/sonner'
import { waitFor } from '@/utils/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { CheckCircle2, CircleX, Eye, EyeOff, Loader2, Lock, LockKeyhole, Mail, User } from 'lucide-react'
import { useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import logoByma from '@/assets/img/BYMA-Logo-Login.svg'
import logoBymaBlanco from '@/assets/img/BYMA-Logo-Login-2.svg'
import { Link } from 'react-router-dom'

type Props = {}

export interface LoginResponse {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    accessToken: string;
    refreshToken: string;
}

const formSchema = z.object({
    username: z
        .string()
        .min(1, { message: "El nombre de usuario es requerido" }),
    // .email({ message: "El email no tiene el formato correcto" }),
    password: z
        .string()
        .min(1, { message: "La contraseña es requerida" }),
    // .regex(
    //     /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
    //     {
    //         message: "La contraseña debe tener al menos 1 letra mayúscula, 1 número y 1 carácter especial",
    //     }
    // ),
});

function LoginPage({ }: Props) {

    const [toastId, setToastId] = useState<string | number | undefined>();
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState<LoginResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((visible) => !visible);
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "all",
        defaultValues: {
            username: "",
            password: "",
        }
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);

        setError(null);
        setIsLoading(true);

        setToastId(toast.loading((
            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-4'>
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <h2 className='ps-4 text-xl font-bold'>Cargando...</h2>
                </div>
                <div className='ps-14'>
                    <p>Por favor espere...</p>
                </div>
            </div>
        ), {
            className: "p-4 min-w-[450px] h-fit border-2 border-gray-400 bg-white text-background-foreground",
            unstyled: true
        }))

        try {
            const response = await axios.post<LoginResponse>('https://dummyjson.com/auth/login', values)
            toast.success((
                <div className='p-4 min-w-[450px] flex flex-row items-start gap-4 bg-background'>
                    <div className=''>
                        <CheckCircle2 strokeWidth={1} size={24} />
                    </div>
                    <div className=''>
                        <h2 className='text-xl font-bold'>Login Exitoso</h2>
                        <p>Bienvenido/a {response.data.username}</p>
                    </div>
                </div>
            ), {
                id: toastId,
                className: "w-fit h-fit border-2 border-green-400 bg-background ",
                unstyled: true,
                position: "top-center",
                duration: 10000
            });
            await waitFor(10000);
            setIsLoading(false);
            setUser(response.data);
            toast.dismiss(toastId);

        } catch (error) {
            if (axios.isAxiosError(error)) {
                // El error es de Axios
                setError(error.response?.data?.message || "Error en el inicio de sesión");
            } else {
                // Error genérico o desconocido
                setError("Ocurrió un error inesperado");
            }
            //toast.error("Error en el inicio de sesión", { id: toastId });
        } finally {
            toast.dismiss(toastId);
            setToastId(undefined);
        }

        setIsLoading(false);
    }
    return (
        <>
            <section className={`w-full min-h-screen bg-[#152D5C]`}>
                <div className='h-full px-6 bg-contain bg-center bg-no-repeat bg-fondo-login grid grid-cols-12 gap-6'>
                    <Card className='bg-[#1090921A] rounded-[50px] px-10 col-start-8 col-span-4 border-none shadow-black shadow-lg backdrop-blur-md place-self-center'>
                        <CardHeader className='relative border-b-2 border-verde-dark min-h-[250px] flex justify-center items-center'>
                            <p className='w-3/4 text-white text-2xl text-center'>La plataforma de BYMA para registrar tus operaciones Bilaterales.</p>
                            <div className='absolute bottom-0 left-3 transform translate-y-1/2 -translate-x-2/3'>
                                <img src={logoByma} alt="logo byma fondo azul" className='w-[360px]' />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className='flex flex-col gap-16'>
                                <div>
                                    <h2 className='text-3xl mb-5 font-semibold text-white mt-24'>Bienvenido</h2>
                                    <p className='text-white text-2xl'>Accedé con tu usuario y contraseña</p>
                                </div>


                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)}>
                                        <FormField
                                            control={form.control}
                                            name="username"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className='text-white'>Usuario:</FormLabel>
                                                    <FormControl >
                                                        <div className='relative'>
                                                            <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${form.formState.errors.username && "text-red-500"}`} strokeWidth={1} size={24} />

                                                            <Input
                                                                className={`pl-12 pr-10 text-white ${form.formState.errors.username && "border-red-500"}`}
                                                                placeholder='jose99'
                                                                disabled={isLoading}
                                                                {...field}
                                                            />
                                                            {form.formState.errors.username && (
                                                                <CircleX className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500" strokeWidth={1} size={24} />
                                                            )}
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage className='' />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className='text-white'>Contraseña:</FormLabel>
                                                    <FormControl >
                                                        <div className='relative'>
                                                            <LockKeyhole
                                                                className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${form.formState.errors.password && "text-red-500"}`}
                                                                strokeWidth={1}
                                                                size={24} />

                                                            <Input
                                                                className={`pl-12 pr-10 text-white ${form.formState.errors.password && "border-red-500"}`}
                                                                type={showPassword ? "text" : "password"}
                                                                placeholder='••••••••••••••'
                                                                disabled={isLoading}
                                                                {...field}
                                                            />

                                                            {form.formState.errors.password && (
                                                                <CircleX className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500" strokeWidth={1} size={24} />
                                                            )}
                                                            {/* <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            className="absolute right-1 top-1/2 transform -translate-y-1/2"
                                                            onClick={togglePasswordVisibility}
                                                        >
                                                            {showPassword ? (
                                                                <EyeOff className="text-gray-400" strokeWidth={1} size={24}/>
                                                            ) : (
                                                                <Eye className=" text-gray-400" strokeWidth={1} size={24}/>
                                                            )}
                                                            <span className="sr-only">canbiar visibilidad de la contraseña</span>
                                                        </Button> */}

                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
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
                                    </form>

                                </Form>
                            </div>
                        </CardContent>
                        <CardFooter className='flex-col gap-28 mb-16 items-center justify-center'>
                            <Link to="/" className='text-white text-sm'>¿Olvidaste la contraseña?</Link>
                            <img src={logoBymaBlanco} alt="logo Byma" />
                        </CardFooter>
                    </Card>

                </div>
            </section>
        </>
    )
}

export default LoginPage