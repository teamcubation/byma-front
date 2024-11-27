import React from "react";
import "./inputText.css";


interface InputTextProps {
  placeholder?: string;
}

const InputText: React.FC<InputTextProps> = ({ placeholder = "Escribe aquí..." }) => {
  return (
    <>
    <div className="input-container">
      <input type="text" className="input-s" placeholder={placeholder} />
    </div>
    </>
  );
};

export default InputText;
