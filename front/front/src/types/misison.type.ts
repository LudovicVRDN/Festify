import type { Path, RegisterOptions } from "react-hook-form";
import type { IFestival } from "./festival.type";

export interface IMission {
    id?:number,
    title: string;
    volunteer_needed : number;
    description : string;
    is_full: Boolean;
    time_start: string;
    time_end: string
    festival:IFestival;
    inscription?: { user_id: number }[];
}

export interface IMissionInputs {
      name: Path<IMission>;
      label: string;
      placeholder: string;
      type: string;
      value?: string,
      rules: object;
    options?: { label: string; value: string | number }[];
    }
