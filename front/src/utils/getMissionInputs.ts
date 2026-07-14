import type { UseFormGetValues } from "react-hook-form";
import type { IFestival } from "../types/festival.type";
import type { IMission, IMissionInputs } from "../types/misison.type";

export const getMissionsInputs = (getValues: UseFormGetValues<IMission>, festivals?: IFestival[], festival?: IFestival): IMissionInputs[] => [
    {
        name: "festival",
        label: "Festival",
        placeholder: "Choisis un festival",
        type: "select",
        rules: { required: "Sélectionne un festival !" },
        options: 
             festivals?.map((f) => ({ label: f.name, value: f.id as number }))
    },
    {
        name: "title",
        label: "Titre de la mission",
        placeholder: "Titre de la mission",
        type: "text",
        rules: { required: "Rentre le Titre de la mission !" },
    },
    {
        name: "description",
        label: "Description de la mission",
        placeholder: "Description de la mission",
        type: "text",
        rules: { required: "Rentre la Description de la mission !" },
    },
    {
        name: "time_start",
        label: "Début de la mission",
        placeholder: "Début de la mission",
        type: "date",
        rules: {
            required: "Rentre le Titre de la mission !",
            validate: (value: any) => {
                const festivalId = Number(getValues("festival"));
                  const currentFestival = festivals?.find((f) => f.id === festivalId) ?? festival;
                if (!currentFestival) return true;
                return (
                    new Date(value) >= new Date(currentFestival.start_date) ||
                    "La mission doit commencer après le début du festival"
                );
            },
        },
    },
    {
        name: "time_end",
        label: "Fin de la mission",
        placeholder: "Titre de la mission",
        type: "date",
        rules: {
            required: "Rentre le Titre de la mission !",
            validate: (value: any) => {
                const festivalId = Number(getValues("festival"));
                const currentFestival = festivals?.find((f) => f.id === festivalId) ?? festival;
                if (!currentFestival || !currentFestival.end_date) return true;;
                return (
                    new Date(value) <= new Date(currentFestival.end_date) ||
                    "La mission doit se terminer avant la fin du festival"
                );
            },
        },
    },
    {
        name: "volunteer_needed",
        label: "Nombre de volontaires nécéssaires",
        placeholder: "Nombre de volontaires nécéssaires",
        type: "number",
        rules: { required: "De combien de volontaires as-tu besoin?" },
    },
];

export const getUpdateMissionsInputs = (getValues: UseFormGetValues<IMission>, festivals?: IFestival[], festival?: IFestival): IMissionInputs[] => [

    {
        name: "title",
        label: "Titre de la mission",
        placeholder: "Titre de la mission",
        type: "text",
        rules: { required: "Rentre le Titre de la mission !" },
    },
    {
        name: "description",
        label: "Description de la mission",
        placeholder: "Description de la mission",
        type: "text",
        rules: { required: "Rentre la Description de la mission !" },
    },
    {
        name: "time_start",
        label: "Début de la mission",
        placeholder: "Début de la mission",
        type: "date",
        rules: {
            required: "Rentre le Titre de la mission !",
            validate: (value: any) => {
                const festivalId = Number(getValues("festival"));
                  const currentFestival = festivals?.find((f) => f.id === festivalId) ?? festival;
                if (!currentFestival) return true;
                return (
                    new Date(value) >= new Date(currentFestival.start_date) ||
                    "La mission doit commencer après le début du festival"
                );
            },
        },
    },
    {
        name: "time_end",
        label: "Fin de la mission",
        placeholder: "Titre de la mission",
        type: "date",
        rules: {
            required: "Rentre le Titre de la mission !",
            validate: (value: any) => {
                const festivalId = Number(getValues("festival"));
                const currentFestival = festivals?.find((f) => f.id === festivalId) ?? festival;
                if (!currentFestival || !currentFestival.end_date) return true;;
                return (
                    new Date(value) <= new Date(currentFestival.end_date) ||
                    "La mission doit se terminer avant la fin du festival"
                );
            },
        },
    },
    {
        name: "volunteer_needed",
        label: "Nombre de volontaires nécéssaires",
        placeholder: "Nombre de volontaires nécéssaires",
        type: "number",
        rules: { required: "De combien de volontaires as-tu besoin?" },
    },
];