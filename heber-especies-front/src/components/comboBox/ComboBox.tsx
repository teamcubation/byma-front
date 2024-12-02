import React, { useState, useRef, useEffect } from "react";
import "./ComboBox.css";

interface ComboBoxProps {
  items: string[];
  placeholder?: string;
  enableManualInput?: boolean;
}

const ComboBox: React.FC<ComboBoxProps> = ({
  items = ["ítem 1", "ítem 2", "ítem 3", "ítem 4", "ítem 5", "ítem 6", "ítem 7", "ítem 8"],
  placeholder = "Seleccione una opción",
  enableManualInput = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const comboBoxRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    setInputValue(item);
    setIsOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setSelectedItem(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen && 
        comboBoxRef.current && 
        !comboBoxRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="combo-box-container">
      <div className="combo-box-container__label_container">
        <label className="combo-box-container__label">Lorem ipsum</label>
      </div>
      <div className="combo-box" onClick={handleToggle} ref={comboBoxRef}>
        {enableManualInput ? (
          <div className="combo-box__input-container">
            <input
              type="text"
              className="combo-box__input"
              value={inputValue}
              placeholder={placeholder}
              onChange={handleInputChange}
              onClick={() => setIsOpen(true)}
            />
            <div className="combo-box__icon-search"></div>
          </div>
        ) : (
          <div className="combo-box__input">
            <span className={`combo-box__placeholder ${selectedItem ? "combo-box__placeholder--selected" : ""}`}>
              {selectedItem || placeholder}
            </span>
            <div className="combo-box__icon"></div>
          </div>
        )}
        {isOpen && (
          <div className="combo-box__dropdown">
            { (enableManualInput ? items
              .filter(item => item.toLowerCase().includes(inputValue.toLowerCase())) : items)
              .map((item, index) => (
                <div
                  key={index}
                  className={`combo-box__item ${selectedItem === item ? "combo-box__item--selected" : ""}`}
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
