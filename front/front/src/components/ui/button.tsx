import React from "react";

interface ButtonProps {
  textButton: string;
  variant: "red" | "grey";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
}

const Button = ({ textButton, variant, onClick }: ButtonProps) => {
  const variants = {
    grey: "clipped-btn btn  btn-neutral border border-zinc-700 hover:border-red-700 text-zinc-400 hover:text-red-500 font-bold tracking-wide tracking-widest uppercase text-center transition-colors ",
    red: "clipped-btn btn  bg-festify-glassred  text-zinc-400 font-bold tracking-wide tracking-widest uppercase text-center hover:border-white",
  };
  return (
    <button className={`${variants[variant]}`} onClick={onClick}>
      {textButton}
    </button>
  );
};

export default Button;
