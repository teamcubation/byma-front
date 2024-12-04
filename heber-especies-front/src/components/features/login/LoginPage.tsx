
// pages/LoginPage.tsx
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { LoginLayout } from './components/LoginLayout';
import { LoginCard } from './components/LoginCard';

export const LoginPage = () => {
    const { isLoading, error, handleLogin, clearError } = useAuth();
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
    }, [searchParams]);

    return (
        <LoginLayout>
            <LoginCard
                onSubmit={handleLogin}
                isLoading={isLoading}
                error={error}
                onErrorClose={clearError}
            />
        </LoginLayout>
    );
};

export default LoginPage;