import React from 'react';

interface ButtonProps {
  className: string;
  type: "button" | "submit";
  text: string;
  handleClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ className, type, text, handleClick }) => {
  return (
    <div>
      <button className={className} type={type} onClick={handleClick}>{text}</button>
    </div>
  );
};

export default Button;