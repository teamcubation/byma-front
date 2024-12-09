import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ReactNode } from "react"
import { UseFormReturn } from "react-hook-form"

type Props = {
    form: UseFormReturn<any>,
    name: string,
    label: string,
    placeholder?: string,
    type?: "text" | "password" | "email" | "number" | "date" | "select" | "textarea" | "checkbox" | "radio",
    isLoading: boolean,
    startContent: ReactNode,
    endContent: ReactNode
}

export default function LogInFormItem({ form, name, label, placeholder, type = "text", isLoading, startContent, endContent }: Props) {
    return (
        <>
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem className='relative'>
                        <FormLabel className='text-white'>{label}</FormLabel>
                        <FormControl >
                            <div className='relative'>
                                {startContent}
                                <Input
                                    className={`pl-12 pr-10 text-white ${form.formState.errors[name] && "border-red-500"}`}
                                    placeholder={placeholder}
                                    type={type}
                                    disabled={isLoading}
                                    {...field}
                                />
                                {form.formState.errors[name] && (
                                    endContent
                                )}
                            </div>
                        </FormControl>
                        <FormMessage className='absolute -bottom-1 left-0 transform translate-y-full' />
                    </FormItem>
                )}
            />
        </>
    )
}