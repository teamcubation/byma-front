import axios from "axios";
import { useCallback, useEffect, useState } from "react";


export interface HookLoginResponse {
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
export type formData = {
    username: string;
    password: string;
}

export default function useAuth() {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [loginResponse, setLoginResponse] = useState<HookLoginResponse | null>(null);

    const ERROR_MESSAGE = "Error en el inicio de sesión";


    const login = useCallback(async (data: formData) => {

        setIsLoading(true);
        setIsError(false);
        setErrorMessage("");

        try {
            const response = await axios.post<HookLoginResponse>("https://dummyjson.com/auth/login", data);
            setLoginResponse(response.data);
            localStorage.setItem("accessToken", response.data.accessToken);
            setIsAuthenticated(true);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setIsError(true);
                setErrorMessage(error.response?.data?.message || ERROR_MESSAGE);
            } else {
                setIsError(true);
                setErrorMessage(ERROR_MESSAGE);
            }
        } finally {
            setIsLoading(false);
        }
    }, [setIsLoading, setIsError, setErrorMessage, setLoginResponse, setIsAuthenticated]
    )

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [setIsAuthenticated]);

    return {
        login,
        isAuthenticated,
        isLoading,
        isError,
        errorMessage,
        loginResponse,
        setIsError,
        setErrorMessage
    }

}


