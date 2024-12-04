// components/LoginHeader.tsx
import { CardHeader } from '@/components/ui/card';
import logoByma from '@/assets/img/BYMA-Logo-Login.svg';

export const LoginHeader = () => (
    <CardHeader className="relative border-b-2 border-verde-dark min-h-[250px] flex justify-center items-center">
        <p className="w-3/4 text-white text-2xl text-center">
            La plataforma de BYMA para registrar tus operaciones Bilaterales.
        </p>
        <div className="absolute bottom-0 left-3 transform translate-y-1/2 -translate-x-2/3">
            <img src={logoByma} alt="logo byma fondo azul" className="w-[360px]" />
        </div>
    </CardHeader>
);