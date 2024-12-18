import React, { useState, useRef, useEffect } from "react";
import "./ComboBox.scss";
import Dropdown from "./Dropdown";
import { TypeItem } from "./types/typeItem";

interface ComboBoxProps {
  title: string;
  items: TypeItem[];
  placeholder?: string;
  enableManualInput?: boolean;
  enableMultiselect?: boolean;
  onItemSelected: (item: TypeItem[]) => void;
}

const ComboBox: React.FC<ComboBoxProps> = ({
  title,
  items,
  placeholder = "Seleccione una opción",
  enableManualInput = false,
  enableMultiselect = false,
  onItemSelected
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<TypeItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const comboBoxRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const existItem = (items : TypeItem[], item : TypeItem) => {
    return items.some((selected) => selected.id === item.id && selected.name === item.name);
  }

  const handleSelect = (item: TypeItem) => {
    if (enableMultiselect) {
      setSelectedItems((prev) =>
        existItem(prev, item)
      ? prev.filter(() => !existItem(prev, item)) : [...prev, item]
      );
    } else {
      setSelectedItems([item]);
      onItemSelected([item]);
      setInputValue(item.name);
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
        <label className="combo-box-container__label">{title}</label>
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
              {(selectedItems.map((item) => item.name)).join(", ") || placeholder}
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