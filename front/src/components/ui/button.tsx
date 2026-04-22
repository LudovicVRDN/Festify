import React from "react";

interface ButtonProps {
  textButton: string;
}

const Button = ({ textButton }: ButtonProps) => {
  return (
    <button className="btn btn-neutral bg-red-900 mt-4">
      {textButton}
    </button>
  );
};

export default Button;