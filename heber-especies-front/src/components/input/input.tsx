import React, { useState } from 'react';
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
  isDisabled?: boolean;
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
  noticeMessage,
  isDisabled = false, // Nueva prop
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const getInputClasses = () => {
    const classes = ['input__container'];

    // Size class
    classes.push(`input__container--${size}`);

    // State classes
    if (isPassword) {
      classes.push('input__container--password');
    } else if (status === 'user') {
      classes.push('input__container--user');
    }

    // Status classes
    switch (status) {
      case 'error':
        classes.push('input__container--error');
        break;
      case 'success':
        classes.push('input__container--success');
        break;
      case 'warning':
        classes.push('input__container--warning');
        break;
      case 'notice':
        classes.push('input__container--notice');
        break;
    }
    if (isDisabled) {
      classes.push('input__container--disabled');
    }

    return classes.join(' ');
  };

  return (
    <div className={getInputClasses()}>
      <input
        className="input__s"
        type={isPassword ? (passwordVisible ? "text" : "password") : type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={isDisabled}
      />
      
      {isPassword && !status && (
        <i
          className={`password--${passwordVisible ? 'eyeClose' : 'eye'}`}
          onClick={handlePasswordToggle}
        ></i>
      )}

      {status === 'error' && errorMessage && (
        <div className="input__error-text">{errorMessage}</div>
      )}

      {status === 'success' && successMessage && (
        <div className="input__success-text">{successMessage}</div>
      )}

      {status === 'warning' && warningMessage && (
        <div className="input__warning-text">{warningMessage}</div>
      )}

      {status === 'notice' && noticeMessage && (
        <div className="input__notice-text">{noticeMessage}</div>
      )}
    </div>
  );
};

export default Input;