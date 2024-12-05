import React, { useState } from 'react';
import Input from './input';
const MyForm: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputStatus, setInputStatus] = useState<'error' | 'success' | 'warning' | 'notice' | "password" | undefined>(undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    if (inputValue === '') {
      setInputStatus('error');
    } else if (inputValue.length < 3) {
      setInputStatus(undefined);
    } else {
      setInputStatus('success');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '20px' }}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        status={inputStatus}
        placeholder="Ingrese su nombre"
        type="text"
        errorMessage='El nombre no puede ser vacio'
        successMessage='El nombre es correcto'
        warningMessage='El nombre debe tener al menos 3 caracteres'
        noticeMessage='El nombre es correcto'
        size='m'
      />
    <div></div>
      <Input
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        status={inputStatus}
        placeholder="Ingrese su contraseña"
        type="password"
        isPassword={true}
        size='s'
      />
      <Input
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        status={inputStatus}
        placeholder="Correo electrónico"
        type="email"
        size='l'
      />
    </div>
  );
};

export default MyForm;
