import React from 'react';
import './Checkbox.scss';

interface CheckboxProps {
  isDisabled?: boolean;
  isChecked: boolean;
  onToggle: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ isDisabled = false, isChecked, onToggle }) => {
  const handleChange = () => {
    if (!isDisabled) {
      onToggle(!isChecked);
    }
  };

  return (
    <label
      className={`checkbox ${isChecked ? 'checkbox--checked' : ''} ${
        isDisabled ? 'checkbox--disabled' : ''
      }`}
    >
      <input
        type="checkbox"
        className="checkbox__input"
        disabled={isDisabled}
        checked={isChecked}
        onChange={handleChange}
      />
      <span className="checkbox__box"></span>
    </label>
  );
};

export default Checkbox;
