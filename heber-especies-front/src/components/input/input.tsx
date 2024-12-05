import React from 'react';
import { useState } from 'react';
import "./input.scss";

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
  isPassword?: boolean;
  size?: 's' | 'm' | 'l';
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
  size = 's',
  noticeMessage
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const getInputClass = () => {
    let className = size;

    if (isPassword) {
      className += ' password';
    } else if (status === 'user') {
      className += ' user';
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
    <div className={`input__container ${getInputClass()}`}>
      <input
        className="input__s"
        type={isPassword ? (passwordVisible ? "text" : "password") : type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      {isPassword && !status && (
        <i
          className={passwordVisible ? "password--eyeClose" : "password--eye"}
          onClick={handlePasswordToggle}
        ></i>
      )}

      {status === 'error' && errorMessage && (
        <div className="error__text">{errorMessage}</div>
      )}
      {status === 'success' && successMessage && (
        <div className="success__text">{successMessage}</div>
      )}
      {status === 'warning' && warningMessage && (
        <div className="warning__text">{warningMessage}</div>
      )}
      {status === 'notice' && noticeMessage && (
        <div className="notice__text">{noticeMessage}</div>
      )}
    </div>
  );
};

export default Input;
