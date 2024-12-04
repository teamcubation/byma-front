
// pages/LoginPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { LoginForm } from './components/LoginForm';
import { ErrorAlert } from './components/ErrorAlert';
import { LoginFormData, LoginResponse } from './types';
import logoByma from '@/assets/img/BYMA-Logo-Login.svg';
import logoBymaBlanco from '@/assets/img/BYMA-Logo-Login-2.svg';

export const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const accessToken = window.localStorage.getItem('accessToken');
        if (accessToken) {
            navigate('/abm-gerentes');
        }

        const message = searchParams.get('message');
        if (message) {
            alert(message);
        }
    }, [navigate, searchParams]);

    const handleSubmit = async (values: LoginFormData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post<LoginResponse>('https://dummyjson.com/auth/login', values);
            window.localStorage.setItem('accessToken', response.data.accessToken);
            navigate('/abm-gerentes');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || "Error en el inicio de sesión");
            } else {
                setError("Error en el inicio de sesión");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="w-full min-h-screen bg-[#152D5C]">
            <div className="h-full px-6 bg-contain bg-center bg-no-repeat bg-fondo-login grid grid-cols-12 gap-6">
                <Card className="bg-[#1090921A] rounded-[50px] px-10 col-start-8 col-span-4 border-none shadow-black shadow-lg backdrop-blur-md place-self-center">
                    <CardHeader className="relative border-b-2 border-verde-dark min-h-[250px] flex justify-center items-center">
                        <p className="w-3/4 text-white text-2xl text-center">
                            La plataforma de BYMA para registrar tus operaciones Bilaterales.
                        </p>
                        <div className="absolute bottom-0 left-3 transform translate-y-1/2 -translate-x-2/3">
                            <img src={logoByma} alt="logo byma fondo azul" className="w-[360px]" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-16">
                            <div>
                                <h2 className="text-3xl mb-5 font-semibold text-white mt-24">Bienvenido</h2>
                                <p className="text-white text-2xl">Accedé con tu usuario y contraseña</p>
                            </div>
                            <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
                        </div>
                    </CardContent>
                    <CardFooter className="relative flex-col gap-28 mb-16 items-center justify-center">
                        <Link to="/" className="text-white text-sm">¿Olvidaste la contraseña?</Link>
                        {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
                        <img src={logoBymaBlanco} alt="logo Byma" />
                    </CardFooter>
                </Card>
            </div>
        </section>
    );
};

export default LoginPage;
