import React from 'react';
import './ButtonWithIcon.css';

interface ButtonWithIconProps {
    onClick?: () => void; // Evento al hacer clic
    className?: string;   // Clases adicionales para personalización
    darkMode?: boolean;   // Indica si el botón está en modo oscuro
    icon?: string;        // Icono del botón
  }

  const ButtonWithIcon = ({onClick, className="", icon="button-icon__icon--bell-black", darkMode=false}: ButtonWithIconProps) => {
    return (
        <button onClick={onClick}
            className={`button-icon  ${className} ${darkMode ? "button-icon__dark-mode" : "button-icon__light-mode"}`}>
            <div className="button-icon__icon-wrapper">
                <div className={`button-icon__icon ${icon}`}></div>
            </div>
        </button>
    );
};

export default ButtonWithIcon;