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
import './login.scss'

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
            <section className={`login-container`}>
                <div className='card-wrapper'>
                    {
                        isError && (
                            <AlertByma message={errorMessage} onClose={() => setIsError(false)} />
                        )
                    }
                    <Card className='card_container'>
                        <CardHeader className='card_header'>
                            <p className='card_header_text'>La plataforma de BYMA para registrar tus operaciones Bilaterales.</p>
                            <div className='card_header_logo-container'>
                                <img src={logoByma} alt="logo byma fondo azul" className='card_header_logo-container_img' />
                            </div>
                        </CardHeader>
                        <CardContent className='card_content'>
                                <div>
                                    <h2 className='card_content_title'>Bienvenido</h2>
                                    <p className='card_content_text'>Accedé con tu usuario y contraseña</p>
                                </div>

                            <LogInForm onSubmit={onSubmit} isLoading={isLoading} />
                        </CardContent>
                        <CardFooter className='card_footer'>
                            <img src={logoBymaBlanco} alt="logo Byma" className='card_footer_img' />
                        </CardFooter>
                    </Card>

                </div>
            </section>
        </>
    )
}

export default LoginPage