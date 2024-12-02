import React, { useState } from "react";
import "./ComboBox.css";

interface ComboBoxProps {
  items: string[];
  placeholder?: string;
  enableManualInput?: boolean; // Nueva prop para habilitar entrada manual
}

const ComboBox: React.FC<ComboBoxProps> = ({
  items = ["ítem 1", "ítem 2", "ítem 3", "ítem 4", "ítem 5", "ítem 6", "ítem 7", "ítem 8"],
  placeholder = "Seleccione una opción",
  enableManualInput = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState(""); // Valor del input para entrada manual

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    setInputValue(item); // Actualiza el input con el valor seleccionado
    setIsOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setSelectedItem(null); // Limpia la selección actual si el usuario escribe
  };

  return (
    <div className="combo-box-container">
      <div className="container-combo-box-label">
        <label className="combo-box-label">Lorem ipsum</label>
      </div>
      <div className="combo-box" onClick={handleToggle}>
        {enableManualInput ? (
          // Input editable si la entrada manual está habilitada
          <div className="combo-box-input-container">
            <input
              type="text"
              className="combo-box-input"
              value={inputValue}
              placeholder={placeholder}
              onChange={handleInputChange}
              onClick={() => setIsOpen(true)} // Abre el menú al hacer clic en el input
            />
            <div className="combo-box-input-icon-search"></div>
          </div>
        ) : (
          // Modo de solo selección
          <div className="combo-box-input">
            <span className={`combo-box-placeholder ${selectedItem ? "selected" : ""}`}>
              {selectedItem || placeholder}
            </span>
            <div className="combo-box-icon"></div>
          </div>
        )}
        {isOpen && (
          <div className="combo-box-dropdown">
            { (enableManualInput ? items
              .filter(item => item.toLowerCase().includes(inputValue.toLowerCase())) : items)
              .map((item, index) => (
                <div
                  key={index}
                  className={`combo-box-item ${selectedItem === item ? "selected-item" : ""}`}
                  onClick={() => handleSelect(item)}
                >
                  {item}
                </div>
              )) }
          </div>
        )}
      </div>
    </div>
  );
};

export default ComboBox;
