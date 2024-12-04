import React from 'react';
import './textarea.scss';

interface TextAreaProps {
  size?: 'l' | 'm' | 's';
  placeholder: string;
}

const TextArea: React.FC<TextAreaProps> = ({ size = "m", placeholder}) => {
  return (
    <textarea
      className={`input-textarea input-textarea--${size}`}
      placeholder={placeholder}
    ></textarea>
  );
};

export default TextArea;
