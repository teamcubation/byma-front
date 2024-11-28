import React, { useState } from 'react';
import CustomCheckbox from './checkbox';


const App: React.FC = () => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <div>
      
      <CustomCheckbox checked={checked} onChange={handleCheckboxChange} />

      <p>{checked ? 'Checkbox marcado' : 'Checkbox desmarcado'}</p>
    </div>
  );
};

export default App;
