import React from 'react';
import './Checkbox.css'; // Asegúrate de tener tu CSS importado

interface CheckboxProps {
  isDisabled: boolean; // Prop para controlar si está habilitado o deshabilitado
}

const Checkbox: React.FC<CheckboxProps> = ({ isDisabled }) => {
  return (
    <label className="custom-checkbox">
      <input type="checkbox" disabled={isDisabled} />
      <span className="checkbox-box"></span>
    </label>
  );
};

export default Checkbox;
