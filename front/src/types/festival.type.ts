import type { IAdresse } from "./Profile.type";

export interface IFestival {
  id?:number;
  name: string;
  start_date: string;
  end_date?: string;
  adress : IAdresse;
}

export interface IUpdateFestival { 
  name?: string;
  start_date?: string;
  end_date?: string;
  adress?: IAdresse;
}