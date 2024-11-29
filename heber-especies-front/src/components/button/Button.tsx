import React from 'react';
import './Button.css';

interface ButtonProps {
  onClick?: () => void; // Evento al hacer clic
  text: string;         // Texto del botón
  disable?: boolean;     // Indica si el botón está deshabilitado
  className?: string;   // Clases adicionales para personalización
}

const Button = ({ onClick, text, disable=false, className }: ButtonProps) => {
    return (
        <button onClick={onClick}
            disabled={disable}
            className={`custom-button ${className}`}>
            <div className="icon-wrapper icon-add"></div>
            <span className="button-text">{text}</span>
        </button>
    );
};

export default Button;