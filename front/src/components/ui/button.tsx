import React from "react";

interface ButtonProps {
  textButton: string;
  variant: "red" | "grey";
}

const Button = ({ textButton , variant }: ButtonProps) => {
  const variants ={
    grey:"w-full border border-zinc-700 hover:border-red-700 text-zinc-400 hover:text-red-500 py-3 text-sm font-bold tracking-widest uppercase text-center transition-colors",
    red:"btn btn-neutral bg-festify-red text-zinc-400 font-bold tracking-wide tracking-widest uppercase text-center"
  }
  return (
    <button className={`${variants[variant]}`}>
      {textButton}
    </button>
  );
};

export default Button;