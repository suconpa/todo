import React from "react";
import { Button } from "@mui/material";

interface ButtonProps {
  color: string;
  children: React.ReactNode;
  margin?: string;
  onClick: () => void;
}

const ButtonSu: React.FC<ButtonProps> = ({
  color,
  children,
  margin,
  onClick,
}) => {
  return (
    <>
      <Button
        style={{ color }}
        variant="contained"
        sx={{ margin: margin || "30px" }}
        onClick={onClick}
      >
        {children}
      </Button>
    </>
  );
};

export default ButtonSu;
