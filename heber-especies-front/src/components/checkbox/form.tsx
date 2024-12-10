import React, { useState } from 'react';
import Checkbox from './checkbox';

const App: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false); 

  const handleCheckboxToggle = (checked: boolean) => {
    setIsChecked(checked);
  };

  return (
    <div>
      
      <Checkbox
        isDisabled={isDisabled}
        isChecked={isChecked}
        onToggle={handleCheckboxToggle}
      />

      <button onClick={() => setIsDisabled(!isDisabled)}>
        {isDisabled ? 'Habilitar Checkbox' : 'Deshabilitar Checkbox'}
      </button>
    </div>
  );
};

export default App;
