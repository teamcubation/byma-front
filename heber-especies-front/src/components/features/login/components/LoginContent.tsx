
// components/LoginContent.tsx
import { CardContent } from '@/components/ui/card';
import { LoginForm } from './LoginForm';
import { LoginFormData } from '../types';

interface LoginContentProps {
    onSubmit: (data: LoginFormData) => Promise<void>;
    isLoading: boolean;
}

export const LoginContent = ({ onSubmit, isLoading }: LoginContentProps) => (
    <CardContent>
        <div className="flex flex-col gap-16">
            <div>
                <h2 className="text-3xl mb-5 font-semibold text-white mt-24">Bienvenido</h2>
                <p className="text-white text-2xl">Accedé con tu usuario y contraseña</p>
            </div>
            <LoginForm onSubmit={onSubmit} isLoading={isLoading} />
        </div>
    </CardContent>
);
