import React from "react";

interface ButtonProps {
  textButton: string;
}

const Button = ({ textButton }: ButtonProps) => {
  return (
    <button className="btn btn-neutral bg-festify-red text-zinc-400 font-bold tracking-wide mt-4">
      {textButton}
    </button>
  );
};

export default Button;