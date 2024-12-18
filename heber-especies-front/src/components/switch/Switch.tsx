import React, { useState } from 'react';
import './Switch.scss';

interface SwitchProps {
  disabled: boolean;
  size?: 's' | 'l';
  onChange: (item: boolean) => void; // Tamaño opcional: pequeño o grande
}

const Switch: React.FC<SwitchProps> = ({ disabled, size = 's', onChange }) => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    if (!disabled) {
      setIsOn(!isOn)
      onChange(!isOn);
    }
  };

  return (
    <div
      className={`switch ${size === 's' ? 'switch--small' : 'switch--large'} ${isOn ? 'switch--on' : 'switch--off'} ${disabled ? 'switch--disabled' : ''}`}
      onClick={toggleSwitch}
    >
      <div className="switch__rectangle"></div>
      <div className="switch__ellipse"></div>
    </div>
  );
};

export default Switch;