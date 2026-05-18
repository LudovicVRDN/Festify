import type { Path, RegisterOptions } from "react-hook-form";
import type { IUser } from "./user.type";
import type { ISkill } from "./skill.type";

export interface IInputOption {
  label: string;
  value: string | number;
}

export interface IResetPassword {
    newPassword: string;
    confirmPassword: string;
}

export interface IInputChangePassword {
    name: Path<IResetPassword>;
    label: string;
    type: string;
    placeholder?: string;
    rules?: RegisterOptions<IResetPassword, Path<IResetPassword>>;
}

export interface IFullProfileInputs {
  name: Path<IUser>;
  label: string;
  type: string;
  value?: string
  options?: IInputOption[]
  placeholder?: string;
  rules?: RegisterOptions<IUser, Path<IUser>>;
}

export interface ISkillsInput {

  name: keyof ISkill;
  label: string;
  placeholder: string;
  type: string;
  value?: string,
  rules: object;
}
