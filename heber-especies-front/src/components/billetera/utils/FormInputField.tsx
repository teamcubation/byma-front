import {
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
  } from "../../ui/form";
  import { Input } from "../../ui/input";
  import { Checkbox } from "../../ui/checkbox";
  import { InputFieldProps } from "../types/typeInputFieldProps";
  
  export const FormInputField = ({
    name,
    label,
    type = "text",
    disabled = false,
    form,
    placeholder,
    isCheckbox = false,
  }: InputFieldProps) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {isCheckbox ? (
            <>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>{label}</FormLabel>
            </>
          ) : (
            <>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type={type}
                  disabled={disabled}
                  placeholder={placeholder}
                />
              </FormControl>
            </>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );