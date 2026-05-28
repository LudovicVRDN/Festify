import type { IAdresse } from "./Profile.type";

export interface IFestival {
  name: string;
  start_date: string;
  end_date?: string;
  adress : IAdresse;
}
