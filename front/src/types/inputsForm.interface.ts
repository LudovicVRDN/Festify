import type { Path, RegisterOptions } from "react-hook-form";
import type { IUser } from "./user.type";

export interface IInputOption {
  label: string;
  value: string | number;
}

export interface Iinputs {
  name:  Path<IUser>;
  label: string;
  type: string;
  options?: IInputOption[]
  placeholder?: string;
  rules?: RegisterOptions<IUser, Path<IUser>>;
}