import React from "react";
import "./ComboBox.scss";
import Checkbox from "./checkbox/Checkbox";

interface DropdownProps {
  items: string[];
  selectedItems: string[];
  onSelect: (item: string) => void;
  enableMultiselect: boolean;
  inputValue: string;
  enableManualInput: boolean;
  isOpen: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  selectedItems,
  onSelect,
  enableMultiselect,
  inputValue,
  enableManualInput,
  isOpen
}) => {
  const filteredItems = enableManualInput
    ? items.filter((item) => item.toLowerCase().includes(inputValue.toLowerCase()))
    : items;

  return (
    <div className={`combo-box__dropdown ${
      isOpen ? "combo-box__dropdown--open" : ""
    }`}>
      {filteredItems.map((item, index) => (
        <div
          key={index}
          className={`combo-box__item ${
            selectedItems.includes(item) ? "combo-box__item--selected" : ""
          }`}
          onClick={() => onSelect(item)}
        >
          {enableMultiselect ? (
            <div className="combo-box__checkbox">
              <Checkbox
                isChecked={selectedItems.includes(item)}
                onToggle={() => onSelect(item)}
              />
              <div className="combo-box__item-checkbox">
                {item}
              </div>
            </div>
          ) : (
            <>{item}</>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dropdown;