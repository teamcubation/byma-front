import React from 'react';
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { InputFieldProps } from "../../types/typeInputFieldProps";
import Input from "@/components/input/input";
import Checkbox from "@/components/checkbox/checkbox";

export const FormInputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type = 'text',
  disabled = false,
  form,
  placeholder = '',
  isCheckbox = false,
  status,
  errorMessage,
  successMessage,
  warningMessage,
  noticeMessage,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {isCheckbox ? (
            <>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Checkbox
                  isDisabled={disabled}
                  isChecked={field.value}
                  onToggle={field.onChange}
                />
              </FormControl>
            </>
          ) : (
            <>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type={type}
                  isDisabled={disabled}
                  placeholder={placeholder}
                  size="l"
                  status={form.formState.errors[name] ? "error" : status}
                  errorMessage={form.formState.errors[name]?.message || errorMessage}
                  successMessage={successMessage}
                  warningMessage={warningMessage}
                  noticeMessage={noticeMessage}
                />
              </FormControl>
            </>
          )}
        </FormItem>
      )}
    />
  );
};

export default FormInputField;