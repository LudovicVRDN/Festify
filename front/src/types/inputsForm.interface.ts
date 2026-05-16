import type { Path, RegisterOptions } from "react-hook-form";
import type { IUser } from "./user.type";
import type { ISkill } from "./skill.type";

export interface IInputOption {
  label: string;
  value: string | number;
}

export interface Iinputs {
  name:  Path<IUser>;
  label: string;
  type: string;
  value?: string
  options?: IInputOption[]
  placeholder?: string;
  rules?: RegisterOptions<IUser, Path<IUser>>;
}

export interface ISkillsInput{
    
  name: keyof ISkill;
  label: string;
  placeholder: string;
  type: string;
  value?:string,
  rules: object;
}
