
// components/LoginFooter.tsx
import { CardFooter } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ErrorAlert } from './ErrorAlert';
import logoBymaBlanco from '@/assets/img/BYMA-Logo-Login-2.svg';

interface LoginFooterProps {
    error: string | null;
    onErrorClose: () => void;
}

export const LoginFooter = ({ error, onErrorClose }: LoginFooterProps) => (
    <CardFooter className="relative flex-col gap-28 mb-16 items-center justify-center">
        <Link to="/" className="text-white text-sm">¿Olvidaste la contraseña?</Link>
        {error && <ErrorAlert message={error} onClose={onErrorClose} />}
        <img src={logoBymaBlanco} alt="logo Byma" />
    </CardFooter>
);
