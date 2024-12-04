// hooks/useAuth.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoginFormData, LoginResponse } from '../types';

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (values: LoginFormData) => {
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

    return {
        isLoading,
        error,
        handleLogin,
        clearError: () => setError(null)
    };
};
