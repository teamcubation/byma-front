import React from 'react';
import './Checkbox.css';

interface CheckboxProps {
  isDisabled: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ isDisabled }) => {
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        className="checkbox__input"
        disabled={isDisabled}
      />
      <span className="checkbox__box"></span>
    </label>
  );
};

export default Checkbox;
