import React from 'react';
import { useState } from 'react';
import "./input2.css";

type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  status?: 'error' | 'success' | 'warning' | 'notice' | 'password' | 'user' | undefined;
  placeholder?: string;
  type?: string;
  errorMessage?: string;
  successMessage?: string;
  warningMessage?: string;
  noticeMessage?: string;
  isPassword?: boolean
};

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  onBlur,
  status,
  placeholder,
  type = 'text',
  isPassword = false,
  errorMessage,
  successMessage,
  warningMessage,
  noticeMessage
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  }
  const getInputClass = () => {
    let className = '';

    if (isPassword) {
      className = 'password';
    } else if (status === 'user') {
      className = 'user';
    }

    switch (status) {
      case 'error':
        className += ' error';
        break;
      case 'success':
        className += ' success';
        break;
      case 'warning':
        className += ' warning';
        break;
      case 'notice':
        className += ' notice';
        break;
      default:
        break;
    }

    return className.trim();
  };


  return (
    <div className={`input-container ${getInputClass()}`}>
      <input
        className="input-s"
        type={isPassword ? (passwordVisible ? "text" : "password") : type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      {/* Renderiza íconos dependiendo del estado */}
      {isPassword && !status && (
        <i
          className={passwordVisible ? "password-eyeClose" : "password-eye"}
          onClick={handlePasswordToggle}
        ></i>
      )}
      

      {/* Mensajes de estado */}
      {status === 'error' && errorMessage && (
        <div className="error-text">{errorMessage}</div>
      )}
      {status === 'success' && successMessage && (
        <div className="success-text">{successMessage}</div>
      )}
      {status === 'warning' && warningMessage && (
        <div className="warning-text">{warningMessage}</div>
      )}
      {status === 'notice' && noticeMessage && (
        <div className="notice-text">{noticeMessage}</div>
      )}
    </div>


  );
};

export default Input;
