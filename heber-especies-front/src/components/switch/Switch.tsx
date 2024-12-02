import React, { useState } from 'react';
import './Switch.css';

interface SwitchProps {
  disabled: boolean;
  size? : "s | l";
}

const Switch: React.FC<SwitchProps> = ({ disabled, size = 's' }) => {
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
