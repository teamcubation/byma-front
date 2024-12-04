
// components/ErrorAlert.tsx
import { Button } from '@/components/ui/button';
import { InfoIcon, X } from 'lucide-react';

interface ErrorAlertProps {
    message: string;
    onClose: () => void;
}

export const ErrorAlert = ({ message, onClose }: ErrorAlertProps) => (
    <div className="absolute top-0 transform translate-y-1/2 w-full text-white border-2 border-l-8 border-red-500 rounded-e-lg ps-2 pe-4 py-2 flex flex-row justify-between gap-3">
        <div className="flex gap-8">
            <div className="h-9 w-9 flex items-center justify-center">
                <InfoIcon className="text-red-500" strokeWidth={2} size={24} />
            </div>
            <div>
                <h3 className="text-base font-bold">Error al iniciar sesión</h3>
                <p className="text-sm">{message}</p>
            </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
            <X strokeWidth={2} size={24} />
        </Button>
    </div>
);