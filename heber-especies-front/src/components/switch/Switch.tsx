import React, { useState } from 'react';
import './Switch.css'; // Importamos los estilos CSS

interface SwitchProps {
  disabled: boolean;  // Prop para saber si el switch está deshabilitado
}

const Switch: React.FC<SwitchProps> = ({ disabled }) => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    if (!disabled) {
      setIsOn(!isOn);
    }
  };

  return (
    <div 
      className={`switch ${isOn ? 'on' : 'off'} ${disabled ? 'disabled' : ''}`} 
      onClick={toggleSwitch}
    >
      <div className="switch-rectangle"></div>
      <div className="switch-ellipse"></div>
    </div>
  );
};

export default Switch;
