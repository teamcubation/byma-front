export type InputFieldProps = {
    name: string;
    label: string;
    type?: string;
    disabled?: boolean;
    form: any;
    placeholder?: string;
    isCheckbox?: boolean;
    status?: 'error' | 'success' | 'warning' | 'notice' | 'password' | 'user' | undefined;
    errorMessage?: string;
    successMessage?: string;
    warningMessage?: string;
    noticeMessage?: string;
  };