import React from 'react';
import './TextArea.css';

interface TextAreaProps {
  size?: 'l' | 'm' | 's';
}

const TextArea: React.FC<TextAreaProps> = ({ size = "m" }) => {
  return (
    <textarea
      className={`input-textarea input-textarea--${size}`}
      placeholder="Escribe aquí..."
    ></textarea>
  );
};

export default TextArea;
