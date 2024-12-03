import React from 'react';
import './Button.css';

interface ButtonProps {
  onClick?: () => void; // Evento al hacer clic
  text: string;         // Texto del botón
  disable?: boolean;     // Indica si el botón está deshabilitado
  className?: string;   // Clases adicionales para personalización
  icon?: string;        // Icono del botón
}

const Button = ({ onClick, text, disable = false, className = "", icon = "" }: ButtonProps) => {
    return (
        <button onClick={onClick}
            disabled={disable}
            className={`button button__size--medium ${className} ${!icon ? 'button--no-icon' : ''}`}>
            {icon && (
                <div className="button__icon-wrapper">
                    <div className={`button__icon ${icon}`}></div>
                </div>
            )}

            <span className={`button__text`}>{text}</span>
        </button>
    );
};

export default Button;