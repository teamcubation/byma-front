import React from "react";
import "./RadioButton.css";

interface RadioButtonProps {
  id: string;
  name: string;
  label?: string;
  checked: boolean;
  onChange: (value: string) => void;
  disabled?: boolean;

}

const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  name,
  label,
  checked,
  disabled,
  onChange,
}) => {
  const handleChange = () => {
    onChange(id);
  };

  return (
    <div className="radio-container">
      <input
        type="radio"
        id={id}
        name={name}
        checked={checked}
        onChange={handleChange}
        className="radio-input"
        disabled={disabled}
      />
      <label htmlFor={id} className="radio-label"></label>
      <span className="radio-label-text">{label}</span>
    </div>
  );
};

export default RadioButton;
