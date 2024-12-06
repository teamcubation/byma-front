import logoBymaBlanco from '@/assets/img/BYMA-Logo-Login-2.svg'
import logoByma from '@/assets/img/BYMA-Logo-Login.svg'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import useAuth from '@/utils/hooks/useAuth'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import AlertByma from './AlertByma'
import LogInForm from './LogInForm'

type Props = {}

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

    const { login, setIsError, setErrorMessage, isLoading, isError, errorMessage, loginResponse, isAuthenticated } = useAuth();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await login(values);
    }

    useEffect(() => {
        
        if(loginResponse) {
            toast.success("Bienvenido " + loginResponse.firstName + " " + loginResponse.lastName);
        }

        if (searchParams.get('message')) {
            setIsError(true);
            setErrorMessage(searchParams.get('message') as string);
            setSearchParams({});
        }

        if (isAuthenticated) {
            navigate("/abm-gerentes");
        }
    }, [isAuthenticated, isError, searchParams, loginResponse, setIsError, setErrorMessage, setSearchParams]);

    return (
        <>
            <section className={`w-full h-[100dvh] grid grid-rows-1 grid-cols-1 bg-[#152D5C]`}>
                <div className='relative px-6 bg-contain bg-center bg-no-repeat bg-fondo-login grid grid-cols-12 grid-rows-1 content-stretch gap-6'>
                    {
                        isError && (
                            <AlertByma message={errorMessage} onClose={() => setIsError(false)} />
                        )
                    }
                    <Card className='bg-[#1090921A] rounded-[50px] px-10 py-8 col-start-8 col-span-4 border-none shadow-black shadow-lg backdrop-blur-md flex flex-col justify-between'>
                        <CardHeader className='relative pb-6 h-fit border-b-2 border-verde-dark flex justify-center items-center'>
                            <p className='w-3/4 text-white text-xl text-center'>La plataforma de BYMA para registrar tus operaciones Bilaterales.</p>
                            <div className='absolute bottom-0 transform translate-y-1/2 -translate-x-1/2'>
                                <img src={logoByma} alt="logo byma fondo azul" className='w-3/4' />
                            </div>
                        </CardHeader>
                        <CardContent className='mt-12 py-0 flex flex-col gap-4'>
                                <div>
                                    <h2 className='text-2xl mb-5 font-semibold text-white'>Bienvenido</h2>
                                    <p className='text-white text-xl'>Accedé con tu usuario y contraseña</p>
                                </div>

                            <LogInForm onSubmit={onSubmit} isLoading={isLoading} />
                        </CardContent>
                        <CardFooter className='py-0 flex justify-center items-center'>
                            <img src={logoBymaBlanco} alt="logo Byma" className='w-1/2' />
                        </CardFooter>
                    </Card>

                </div>
            </section>
        </>
    )
}

export default LoginPage