import React from "react";
import './ButtonIcon.css';

interface ButtonIconProps {
  onClick?: () => void;
  icon: string;
}

const ButtonIcon = ({ onClick, icon }: ButtonIconProps) => {
  console.log("icon= ", icon);
  return (
    <button className="button-icon" onClick={onClick}>
      <span className="button__icon">
        <img src={icon} alt="icon" />
      </span>
    </button>
  );
};

export default ButtonIcon;