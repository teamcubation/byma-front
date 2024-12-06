import React from 'react'
import { Navigate } from 'react-router-dom'

type Props = {
    children: React.ReactNode
}

function PrivateRoute({ children }: Props) {

    const ERROR_MESSAGE = "Debes iniciar sesión";
    console.log(localStorage.getItem('accessToken'));

    if (localStorage.getItem('accessToken') === null) {
        return <Navigate to={`/login?message=${ERROR_MESSAGE}}`} replace />
    }
    return (
        <>{children}</>
    )
}

export default PrivateRoute