import React from 'react'
import { Navigate } from 'react-router-dom'

type Props = {
    children: React.ReactNode
}

function PrivateRoute({ children }: Props) {

    console.log(localStorage.getItem('accessToken'));

    if (localStorage.getItem('accessToken') === null) {
        return <Navigate to="/login?message=Debes iniciar sesión" replace />
    }
    return (
        <>{children}</>
    )
}

export default PrivateRoute