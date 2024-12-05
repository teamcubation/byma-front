import React from 'react';
import './ButtonWithIcon.css';

interface ButtonWithIconProps {
    onClick?: () => void; // Evento al hacer clic
    className?: string;   // Clases adicionales para personalización
    theme?: 'light'| 'dark'; // Tema del botón
    icon?: string;        // Icono del botón
  }

  const ButtonWithIcon = ({onClick, className="", icon="button-icon__icon--bell-black", theme= 'light'}: ButtonWithIconProps) => {
    const buttonClasses = [
        'button-icon',
        `button-icon__${theme}-mode`,
        className,
      ].join(' ');
    return (
        <button onClick={onClick}
            className={buttonClasses}>
            <div className="button-icon__icon-wrapper">
            <img src={icon} alt="icon" />
            </div>
        </button>
    );
};

export default ButtonWithIcon;