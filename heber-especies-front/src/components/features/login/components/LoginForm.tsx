
// components/LoginForm.tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Loader2, User, LockKeyhole } from 'lucide-react';
import { LoginFormData } from '../types';
import { FormInput } from './FormInputs';
import { z } from 'zod';

interface LoginFormProps {
    onSubmit: (data: LoginFormData) => Promise<void>;
    isLoading: boolean;
}


const loginFormSchema = z.object({
    username: z.string().min(1, { message: "test El nombre de usuario es requerido" }),
    password: z.string().min(1, { message: "test La contraseña es requerida" }),
});


export const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginFormSchema),
        mode: "all",
        defaultValues: {
            username: "",
            password: "",
        }
    });

    return (
        <Form {...form}>
            <form className="flex flex-col gap-4 rounded-lg" onSubmit={form.handleSubmit(onSubmit)}>
                <FormInput
                    form={form}
                    name="username"
                    label="Usuario:"
                    placeholder="jose99"
                    icon={<User strokeWidth={1} size={24} />}
                    disabled={isLoading}
                />
                <FormInput
                    form={form}
                    name="password"
                    label="Contraseña:"
                    type="password"
                    placeholder="••••••••••••••"
                    icon={<LockKeyhole strokeWidth={1} size={24} />}
                    disabled={isLoading}
                />
                <Button type="submit" className="w-full bg-white" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin mr-1" />
                            Cargando...
                        </>
                    ) : (
                        "Enviar"
                    )}
                </Button>
            </form>
        </Form>
    );
};