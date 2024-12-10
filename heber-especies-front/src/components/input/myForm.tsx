import React, { useState } from 'react';
import Input from './input';

const MyForm: React.FC = () => {
  const [name, setName] = useState('');
  const [nameStatus, setNameStatus] = useState<'error' | 'success' | 'warning' | 'notice' | 'password' | undefined>(undefined);

  const [password, setPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<'error' | 'success' | 'warning' | 'notice' | 'password' | undefined>(undefined);

  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState<'error' | 'success' | 'warning' | 'notice' | 'password' | undefined>(undefined);

  const handleBlur = (value: string, setStatus: React.Dispatch<React.SetStateAction<'error' | 'success' | 'warning' | 'notice' | 'password' | undefined>>) => {
    if (value === '') {
      setStatus('error');
    } else if (value.length < 3) {
      setStatus(undefined);
    } else if (value.length < 5) {
      setStatus('success');
    } else if (value.length < 8) {
      setStatus('notice');
    } else {
      setStatus('warning');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '20px' }}>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={() => handleBlur(name, setNameStatus)}
        status={nameStatus}
        placeholder="Ingrese su nombre"
        type="text"
        errorMessage="El nombre no puede ser vacío"
        successMessage="El nombre es correcto"
        warningMessage="El nombre debe tener al menos 3 caracteres"
        noticeMessage="El nombre es correcto"
        size="m"
      />

      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => handleBlur(password, setPasswordStatus)}
        status={passwordStatus}
        placeholder="Ingrese su contraseña"
        type="password"
        isPassword={true}
        size="s"
      />

      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => handleBlur(email, setEmailStatus)}
        status={emailStatus}
        placeholder="Correo electrónico"
        type="email"
        size="l"
      />
    </div>
  );
};

export default MyForm;
