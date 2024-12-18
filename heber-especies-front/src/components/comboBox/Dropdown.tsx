import React from "react";
import "./ComboBox.scss";
import Checkbox from "../checkbox/checkbox"
import { TypeItem } from "./types/typeItem";

interface DropdownProps {
  items: TypeItem[];
  selectedItems: TypeItem[];
  onSelect: (item: TypeItem) => void;
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

  if (items.length === 0) {
    return <div className={`combo-box__dropdown ${
      isOpen ? "combo-box__dropdown--open" : ""
    }`}>
      <div className="combo-box__item">
        Sin elementos
      </div>
    </div>;
  }
  
  const filteredItems = enableManualInput
    ? items.filter((item) => item.name.toLowerCase().includes(inputValue.toLowerCase()))
    : items;

  return (
    <div className={`combo-box__dropdown ${
      isOpen ? "combo-box__dropdown--open" : ""
    }`}>
      {filteredItems.map((item) => (
        <div
          key={item.id}
          className={`combo-box__item ${
            selectedItems.some((selected) => selected.id === item.id) ? "combo-box__item--selected" : ""
          }`}
          onClick={() => onSelect(item)}
        >
          {enableMultiselect ? (
            <div className="combo-box__checkbox">
              <Checkbox
                isChecked={selectedItems.some((selected) => selected.id === item.id)}
                onToggle={() => onSelect(item)}
              />
              <div className="combo-box__item-checkbox">
                {item.name}
              </div>
            </div>
          ) : (
            <>{item.name}</>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dropdown;