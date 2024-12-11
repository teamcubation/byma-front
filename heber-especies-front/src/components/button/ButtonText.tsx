import React from 'react';
import './ButtonText.scss';

interface ButtonTextProps {
  onClick?: (e: any) => void; // Evento al hacer clic
  text: string;         // Texto del botón
  disable?: boolean;     // Indica si el botón está deshabilitado
  className?: string;   // Clases adicionales para personalización
  icon?: string;        // Icono del botón
  size?: 'small' | 'medium' | 'large'; // Tamaño del botón
}

const ButtonText = ({  onClick, 
    text, 
    disable = false, 
    className = "", 
    icon = "",
    size = 'medium'}: ButtonTextProps) => {
        const baseClass = 'button';
        const sizeClass = `button__size--${size}`;
        const iconClass = icon ? '' : 'button--no-icon';
      
        const buttonClasses = [
          baseClass,
          sizeClass,
          className.includes('button--terciary') ? 'button--terciary' : baseClass,
          className,
          iconClass,
        ].join(' ');

    return (
        <button 
            onClick={onClick}
            disabled={disable}
            className={buttonClasses}>
            {icon && (
                <div className="button__icon-wrapper button__icon">
                    <img src={icon} alt="icon" />
                </div>
            )}

            <span className={`button__text`}>{text}</span>
        </button>
    );
};

export default ButtonText;