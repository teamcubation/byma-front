
// components/LoginCard.tsx
import { Card } from '@/components/ui/card';
import { LoginHeader } from './LoginHeader';
import { LoginContent } from './LoginContent';
import { LoginFooter } from './LoginFooter';
import { LoginFormData } from '../types';

interface LoginCardProps {
    onSubmit: (data: LoginFormData) => Promise<void>;
    isLoading: boolean;
    error: string | null;
    onErrorClose: () => void;
}

export const LoginCard = ({ onSubmit, isLoading, error, onErrorClose }: LoginCardProps) => (
    <Card className="bg-[#1090921A] rounded-[50px] px-10 col-start-8 col-span-4 border-none shadow-black shadow-lg backdrop-blur-md place-self-center">
        <LoginHeader />
        <LoginContent onSubmit={onSubmit} isLoading={isLoading} />
        <LoginFooter error={error} onErrorClose={onErrorClose} />
    </Card>
);