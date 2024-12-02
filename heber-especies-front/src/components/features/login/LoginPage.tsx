import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Toaster } from '@/components/ui/sonner'
import { waitFor } from '@/utils/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { CheckCircle2, CircleX, Eye, EyeOff, InfoIcon, Loader2, Lock, LockKeyhole, Mail, User, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import logoByma from '@/assets/img/BYMA-Logo-Login.svg'
import logoBymaBlanco from '@/assets/img/BYMA-Logo-Login-2.svg'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'

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
    password: z
        .string()
        .min(1, { message: "La contraseña es requerida" }),

});

function LoginPage({ }: Props) {

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();


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
        setIsLoading(true);


        try {
            const response = await axios.post<LoginResponse>('https://dummyjson.com/auth/login', values);
            console.log(response.data);
            window.localStorage.setItem('accessToken', response.data.accessToken);
            setIsLoading(false);
            navigate('/abm-gerentes');

        } catch (error) {
            if (axios.isAxiosError(error)) {
                form.setError("root", { message: error.response?.data?.message || "Error en el inicio de sesión" });
            } else {
                form.setError("root", { message: "Error en el inicio de sesión" });
            }
        } finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        const accessToken = window.localStorage.getItem('accessToken');
        if (accessToken) {
            navigate('/abm-gerentes');
        }
        if (searchParams.get('message')) {
            alert(searchParams.get('message'));
        }
    }, []);

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
                                    <form className={`flex flex-col gap-4 rounded-lg`} onSubmit={form.handleSubmit(onSubmit)}>
                                        <FormField
                                            control={form.control}
                                            name="username"
                                            render={({ field }) => (
                                                <FormItem className='relative'>
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
                                                    <FormMessage className='absolute -bottom-1 left-0 transform translate-y-full' />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem className='relative'>
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
                                                    <FormMessage className='absolute -bottom-1 left-0 transform translate-y-full' />
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
                        <CardFooter className='relative flex-col gap-28 mb-16 items-center justify-center'>
                            <Link to="/" className='text-white text-sm'>¿Olvidaste la contraseña?</Link>
                            {
                                //TODO: extraer este codigo a un componente "Alerta"
                                form.formState.errors.root && (
                                    <div className='absolute top-0 transform translate-y-1/2 w-full text-white border-2 border-l-8 border-red-500 rounded-e-lg ps-2 pe-4 py-2 flex flex-row justify-between gap-3'>
                                        <div className='flex gap-8'>
                                            <div className='h-9 w-9 flex items-center justify-center'>
                                                <InfoIcon className="text-red-500" strokeWidth={2} size={24} />
                                            </div>
                                            <div>
                                                <h3 className='text-base font-bold'>Error al iniciar sesión</h3>
                                                <p className='text-sm'>{form.formState.errors.root.message}</p>
                                            </div>
                                        </div>
                                        <Button className='' variant="ghost" size="icon" onClick={() => form.reset()}>
                                            <X strokeWidth={2} size={24} />
                                        </Button>
                                    </div>
                                )
                            }
                            <img src={logoBymaBlanco} alt="logo Byma" />
                        </CardFooter>
                    </Card>

                </div>
            </section>
        </>
    )
}

export default LoginPage