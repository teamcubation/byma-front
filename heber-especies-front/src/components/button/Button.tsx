import React from 'react';
import './Button.css';

interface ButtonProps {
  onClick?: () => void; // Evento al hacer clic
  text: string;         // Texto del botón
  disable?: boolean;     // Indica si el botón está deshabilitado
  className?: string;   // Clases adicionales para personalización
}

const Button = ({ onClick, text, disable=false, className="" }: ButtonProps) => {
    return (
        <button onClick={onClick}
            disabled={disable}
            className={`button button--hover button--active  ${className} `}>
            <div className="button__icon-wrapper">
                <div className='button__icon--add'></div>
            </div>
            <span className="button__text">{text}</span>
        </button>
    );
};

export default Button;