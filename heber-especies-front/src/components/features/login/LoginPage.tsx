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
import useAuth from '@/utils/hooks/useAuth'

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

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const { login, isLoading, isError, errorMessage, loginResponse, isAuthenticated } = useAuth();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "all",
        defaultValues: {
            username: "",
            password: "",
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await login(values);
    }

    useEffect(() => {
        if (isError) {
            form.setError("root", { message: errorMessage });
            toast.error(errorMessage);
            return;
        }
        if(loginResponse) {
            toast.success("Bienvenido " + loginResponse.firstName + " " + loginResponse.lastName);
        }

        //debugger
        if (searchParams.get('message')) {
            toast.error(searchParams.get('message'));
        }

        if (isAuthenticated) {
            navigate("/abm-gerentes");
        }
    }, [isAuthenticated, isError, searchParams, loginResponse]);

    return (
        <>
            <section className={`w-full min-h-[100dvh] grid grid-rows-1 grid-cols-1 bg-[#152D5C]`}>
                <div className='relative px-6 bg-contain bg-center bg-no-repeat bg-fondo-login grid grid-cols-12 grid-rows-1 content-stretch gap-6'>
                    {
                        //TODO: extraer este codigo a un componente "Alerta"
                        form.formState.errors.root && (
                            <div className='absolute min-w-96 top-0 left-1/2 transform translate-y-1/4 -translate-x-1/2 text-white border-2 border-l-8 border-red-500 rounded-e-lg ps-2 pe-4 py-2 flex flex-row justify-between gap-3 z-10'>
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
                    <Card className='bg-[#1090921A] rounded-[50px] px-10 col-start-8 col-span-4 border-none shadow-black shadow-lg backdrop-blur-md flex flex-col'>
                        <CardHeader className='relative py-8 h-fit border-b-2 border-verde-dark flex justify-center items-center'>
                            <p className='w-3/4 text-white text-2xl text-center'>La plataforma de BYMA para registrar tus operaciones Bilaterales.</p>
                            <div className='absolute bottom-0 left-3 transform translate-y-1/2 -translate-x-2/3'>
                                <img src={logoByma} alt="logo byma fondo azul" className='w-[360px]' />
                            </div>
                        </CardHeader>
                        <CardContent className='pt-24'>
                            <div className='h-full flex flex-col gap-4'>
                                <div>
                                    <h2 className='text-3xl mb-5 font-semibold text-white'>Bienvenido</h2>
                                    <p className='text-white text-2xl'>Accedé con tu usuario y contraseña</p>
                                </div>


                                <Form {...form}>
                                    <form className={`flex flex-col gap-4`} onSubmit={form.handleSubmit(onSubmit)}>
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
                                                                type="password"
                                                                placeholder='••••••••••••••'
                                                                disabled={isLoading}
                                                                {...field}
                                                            />

                                                            {form.formState.errors.password && (
                                                                <CircleX className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500" strokeWidth={1} size={24} />
                                                            )}
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
                                        <Link to="/" className='text-white text-sm'>¿Olvidaste la contraseña?</Link>

                                    </form>

                                </Form>

                            </div>
                        </CardContent>
                        <CardFooter className='flex-grow relative flex justify-center items-end'>

                            <img src={logoBymaBlanco} alt="logo Byma" className='w-48' />
                        </CardFooter>
                    </Card>

                </div>
            </section>
        </>
    )
}

export default LoginPage