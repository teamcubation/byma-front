import logoBymaBlanco from '@/assets/img/BYMA-Logo-Login-2.svg'
import logoByma from '@/assets/img/BYMA-Logo-Login.svg'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import useAuth from '@/utils/hooks/useAuth'
import { useEffect } from 'react'
import { replace, useNavigate, useSearchParams } from 'react-router-dom'
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

    const REDIRECT_URL = "/abm-gerentes";

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
            navigate(REDIRECT_URL, {replace: true});
        }
    }, [isAuthenticated, isError, searchParams, loginResponse, setIsError, setErrorMessage, setSearchParams]);

    return (
        <>
            <section className={`login-container`}>
                <div className='card__wrapper'>
                    {
                        isError && (
                            <AlertByma message={errorMessage} onClose={() => setIsError(false)} />
                        )
                    }
                    <Card className='card__wrapper__container'>
                        <CardHeader className='card__wrapper__container__header'>
                            <p className='card__wrapper__container__header__text'>La plataforma de BYMA para registrar tus operaciones Bilaterales.</p>
                            <div className='card__wrapper__container__header__logo-container'>
                                <img src={logoByma} alt="logo byma fondo azul" className='card__wrapper__container__header__logo-container__img' />
                            </div>
                        </CardHeader>
                        <CardContent className='card__wrapper__container__content'>
                                <div>
                                    <h2 className='card__wrapper__container__content__title'>Bienvenido</h2>
                                    <p className='card__wrapper__container__content__text'>Accedé con tu usuario y contraseña</p>
                                </div>

                            <LogInForm onSubmit={onSubmit} isLoading={isLoading} />
                        </CardContent>
                        <CardFooter className='card__wrapper__container__footer'>
                            <img src={logoBymaBlanco} alt="logo Byma" className='card__wrapper__container__footer__img' />
                        </CardFooter>
                    </Card>

                </div>
            </section>
        </>
    )
}

export default LoginPage