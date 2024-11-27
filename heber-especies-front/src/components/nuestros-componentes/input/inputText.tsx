import React from 'react';
//import './inputText.css';
import "./input2.css"

type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  status?: 'error' | 'success' | 'warning' | 'notice' | "password" | undefined;
  placeholder?: string;
  type?: string
};

const Input: React.FC<InputProps> = ({ value, onChange, onBlur, status, placeholder, type = 'text' }) => {
  const getInputClass = () => {
    switch (status) {
      case 'error':
        return 'error';
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'notice':
        return 'notice';
      case "password":
        return 'password';
      default:
        return '';
    }
  };

  return (
    <div className={`input-container ${getInputClass()}`}>
      <input
        className="input-s"
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
