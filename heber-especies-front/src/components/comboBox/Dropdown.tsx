import React from "react";
import "./ComboBox.css";

interface DropdownProps {
  items: string[];
  selectedItems: string[];
  onSelect: (item: string) => void;
  enableMultiselect: boolean;
  inputValue: string;
  enableManualInput: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  selectedItems,
  onSelect,
  enableMultiselect,
  inputValue,
  enableManualInput,
}) => {
  const filteredItems = enableManualInput
    ? items.filter((item) => item.toLowerCase().includes(inputValue.toLowerCase()))
    : items;

  return (
    <div className="combo-box__dropdown">
      {filteredItems.map((item, index) => (
        <div
          key={index}
          className={`combo-box__item ${
            selectedItems.includes(item) ? "combo-box__item--selected" : ""
          }`}
          onClick={() => onSelect(item)}
        >
          {enableMultiselect ? (
            <label>
              <input
                type="checkbox"
                checked={selectedItems.includes(item)}
                onClick={(e) => e.stopPropagation()}
                onChange={() => onSelect(item)}
              />
              {item}
            </label>
          ) : (
            <>{item}</>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dropdown;