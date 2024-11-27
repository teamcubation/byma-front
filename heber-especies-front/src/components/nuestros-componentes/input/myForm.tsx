import React, { useState } from 'react';
import Input from './inputText';
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
      setInputStatus('warning');
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
      />
    <div></div>
      <Input
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        status={"password"}
        placeholder="Ingrese su contraseña"
        type="password"
      />
      <Input
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        status={inputStatus}
        placeholder="Correo electrónico"
        type="email"
      />
    </div>
  );
};

export default MyForm;
