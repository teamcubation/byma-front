import React, { useState } from 'react';
import './Checkbox.css';

const CustomCheckbox: React.FC = () => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <label className="custom-checkbox">
      <input type="checkbox" checked={checked} onChange={handleCheckboxChange} />
      <span className="checkbox-box"></span>
    </label>
  );
};

export default CustomCheckbox;
