// components/FormInput.tsx
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CircleX } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

interface FormInputProps {
    form: UseFormReturn<any>;
    name: string;
    label: string;
    placeholder: string;
    type?: string;
    icon: React.ReactNode;
    disabled?: boolean;
}

export const FormInput = ({ form, name, label, placeholder, type = "text", icon, disabled }: FormInputProps) => (
    <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
            <FormItem className="relative">
                <FormLabel className="text-white">{label}</FormLabel>
                <FormControl>
                    <div className="relative">
                        <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 
                            ${form.formState.errors[name] && "text-red-500"}`}>
                            {icon}
                        </div>
                        <Input
                            className={`pl-12 pr-10 text-white ${form.formState.errors[name] && "border-red-500"}`}
                            type={type}
                            placeholder={placeholder}
                            disabled={disabled}
                            {...field}
                        />
                        {form.formState.errors[name] && (
                            <CircleX 
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500" 
                                strokeWidth={1} 
                                size={24} 
                            />
                        )}
                    </div>
                </FormControl>
                <FormMessage className="absolute -bottom-1 left-0 transform translate-y-full" />
            </FormItem>
        )}
    />
);
