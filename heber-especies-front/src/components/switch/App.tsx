import React, { useState } from 'react';
import Switch from './Switch';

const ParentComponent: React.FC = () => {
  const [isSwitchDisabled, setIsSwitchDisabled] = useState(false);

  const toggleDisable = () => {
    setIsSwitchDisabled(!isSwitchDisabled);
  };

  return (
    <div>
      <button onClick={toggleDisable}>
        {isSwitchDisabled ? 'Habilitar' : 'Deshabilitar'} Switch
      </button>
      <Switch disabled={isSwitchDisabled} />
      <Switch disabled={isSwitchDisabled} size='l'/>
    </div>
  );
};

export default ParentComponent;
