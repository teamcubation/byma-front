import React from 'react';
import './textarea.scss';

interface TextAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: () => void;
  status?: 'error' | undefined;
  placeholder?: string;
  size?: 'l' | 'm' | 's';
  errorMessage?: string;
  isDisabled?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  onBlur,
  status,
  placeholder,
  size = 'm',
  errorMessage,
  isDisabled = false
}) => {
  const getTextAreaClasses = () => {
    const classes = ['input-textarea', `input-textarea--${size}`];

    if (status === 'error') {
      classes.push('input-textarea--error');
    }
    if (isDisabled) {
      classes.push('input-textarea--disabled');
    }

    return classes.join(' ');
  };

  return (
    <div className="textarea__container">
      <textarea
        className={getTextAreaClasses()}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={isDisabled}
      ></textarea>
      {status === 'error' && errorMessage && (
        <div className="textarea__error-text">{errorMessage}</div>
      )}
    </div>
  );
};

export default TextArea;