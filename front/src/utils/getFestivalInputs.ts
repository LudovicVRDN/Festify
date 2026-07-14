
import type { IFestival } from "../types/festival.type";
import type { IFestivalInput } from "../types/inputsForm.interface";

export const getFestivalInputs = (data?: IFestival): IFestivalInput[] => [
  {
    name: "name",
    label: "Nom du festival",
    placeholder: "Nom du festival",
    value: `${data?.name ?? ""}`,
    type: "text",
    rules: { required: "Rentre le nom du festival !" },
  },
  {
    name: "adress.street",
    label: "Adresse du festival",
    placeholder: "Adresse du festival",
    value: `${data?.adress?.street ?? ""}`,
    type: "text",
    rules: { required: "L'adresse du festival est requise" },
  },
    {
    name: "adress.postalCode",
    label: "Code Postal du festival",
    placeholder: "Code postal du festival",
    value: `${data?.adress?.street ?? ""}`,
    type: "text",
    rules: { required: "Le code postal du festival est requise" },
  },
    {
    name: "adress.city",
    label: "Ville du festival",
    placeholder: "Ville du festival",
    value: `${data?.adress?.street ?? ""}`,
    type: "text",
    rules: { required: "La ville du festival est requise" },
  },
  
  // ...
  {
    name: "start_date",
    label: "Date de début",
    placeholder: "Date de début",
    value: data?.start_date?.split("T")[0] ?? "",
    type: "date",
    rules: { required: "La date de début est requise" },
  },
  {
    name: "end_date",
    label: "Date de fin",
    placeholder: "Date de fin",
    value: data?.end_date?.split("T")[0] ?? "",
    type: "date",
    rules: { required: "La date de fin est requise" },
  },
];