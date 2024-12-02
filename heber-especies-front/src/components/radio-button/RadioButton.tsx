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
    <div className="group__container">
      <input
        type="radio"
        id={id}
        name={name}
        checked={checked}
        onChange={handleChange}
        className="group__input"
        disabled={disabled}
      />
      <label
        htmlFor={id}
        className={`group__label ${
          disabled ? "group__label--disabled" : ""
        } ${checked ? "group__label--checked" : ""}`}
      ></label>
      {label && <span className="group__text">{label}</span>}
    </div>
  );
};

export default RadioButton;
