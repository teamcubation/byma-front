import React, { useState, useRef, useEffect } from "react";
import "./ComboBox.css";
import Dropdown from "./Dropdown";

interface ComboBoxProps {
  items: string[];
  placeholder?: string;
  enableManualInput?: boolean;
  enableMultiselect?: boolean;
}

const ComboBox: React.FC<ComboBoxProps> = ({
  items = ["ítem 1", "ítem 2", "ítem 3", "ítem 4", "ítem 5", "ítem 6", "ítem 7", "ítem 8"],
  placeholder = "Seleccione una opción",
  enableManualInput = false,
  enableMultiselect = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const comboBoxRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item: string) => {
    if (enableMultiselect) {
      setSelectedItems((prev) =>
        prev.includes(item) ? prev.filter((selected) => selected !== item) : [...prev, item]
      );
    } else {
      setSelectedItems([item]);
      setInputValue(item);
      setIsOpen(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (!enableMultiselect) {
      setSelectedItems([]);
    }
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
      <div className="combo-box" ref={comboBoxRef}>
        {enableManualInput ? (
          <div className="combo-box__input-container" onClick={handleToggle}>
            <input
              type="text"
              className="combo-box__input"
              value={inputValue}
              placeholder={placeholder}
              onChange={handleInputChange}
            />
            <div className="combo-box__icon-search"></div>
          </div>
        ) : (
          <div className="combo-box__input" onClick={handleToggle}>
            <span
              className={`combo-box__placeholder ${
                selectedItems.length > 0 ? "combo-box__placeholder--selected" : ""
              }`}
            >
              {selectedItems.join(", ") || placeholder}
            </span>
            <div className="combo-box__icon"></div>
          </div>
        )}
        {
          <Dropdown
          items={items}
          selectedItems={selectedItems}
          onSelect={handleSelect}
          enableMultiselect={enableMultiselect}
          inputValue={inputValue}
          enableManualInput={enableManualInput}
          isOpen={isOpen}
        />
        }
      </div>
    </div>
  );
};

export default ComboBox;