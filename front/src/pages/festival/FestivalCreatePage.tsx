import type { IFestivalInput } from "../../types/inputsForm.interface";
import TornEdge from "../../components/TornEdge";
import { Fade } from "react-awesome-reveal";
import Button from "../../components/ui/button";
import type { IFestival } from "../../types/festival.type";
import { useForm, type SubmitHandler } from "react-hook-form";
import photo from "../../assets/createfesti.jpg";
import api from "../../api/axios.instance";
import { useNavigate } from "react-router";

const FestivalCreatePage = () => {
  const festivalInput: IFestivalInput[] = [
    {
      name: "name",
      label: "Nom du festival",
      placeholder: "Nom du festival",
      type: "text",
      rules: { required: "Rentre le nom du festival !" },
    },

    {
      name: "adress.street",
      label: "Adresse du festival",
      placeholder: "Adresse du festival",
      type: "text",
      rules: { required: "L'adresse du festival est requise" },
    },
    {
      name: "adress.city",
      label: "Ville du festival",
      placeholder: "Ville du festival",
      type: "text",
      rules: { required: "La ville du festival est requise" },
    },
    {
      name: "adress.postalCode",
      label: "Code Postal",
      placeholder: "Code Postal",
      type: "text",
      rules: { required: "Le Code Postal est requis" },
    },
    {
      name: "start_date",
      label: "Date de début",
      placeholder: "Date de début",
      type: "date",
      rules: {
        required: "La date de début est requise",
        validate: (value: any) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return (
            new Date(value) >= today ||
            "Le festival ne peut pas commencer dans le passé"
          );
        },
      },
    },
    {
      name: "end_date",
      label: "Date de fin",
      placeholder: "Date de fin",
      type: "date",
      rules: {
        required: "La date de fin est requise",
        validate: (value: any) => {
          const start = getValues("start_date");
          if (!start) return true;
          return (
            new Date(value) >= new Date(start) ||
            "La date de fin doit être après la date de début"
          );
        },
      },
    },
  ];
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<IFestival>({
    mode: "onChange",
  });
  const navigate = useNavigate();

  const handleForm: SubmitHandler<IFestival> = async (data: IFestival) => {
    console.log(data);
    try {
      await api.post(`/festival`, data);
      reset();
      navigate("/");
    } catch (error) {
      console.error("Erreur :", error);
    }
  };
  return (
    <div className="bg-metal-dark bg-metal-grid min-h-screen">
      <div className="md:w-150 lg:w-200  m-auto py-15">
        <p className="text-center line-title text-xl text-red-hot font-metal pb-2">
          Festival Manager
        </p>
        <h1 className="font-metal text-4xl lg:text-6xl text-center mb-5">
          Prêt à créer le festival qui va{" "}
          <span className="text-red-hot">marquer l'histoire </span> ?
        </h1>
        <p className="text-neutral-500 text-center text-lg font-metal">
          Gère tes évenements Rock & Metal
        </p>
      </div>
      <TornEdge position="top" />
      <article className="flex flex-col items-center gap-5 p-2 bg-black">
        <Fade direction="down" delay={500}>
          <h1 className="font-metal text-xl lg:text-4xl text-festify-red">
            A toi de créer ton propore Festival !{" "}
          </h1>
          <div className="flex flex-col lg:flex-row justify-center lg:min-h-115">
            <form
              onSubmit={handleSubmit(handleForm)}
              className="grid grid-cols-2 gap-x-12 gap-y-8 justify-center items-start bg-black lg:w-150 p-5"
            >
              {festivalInput.map((field) => {
                const fieldError = field.name
                  .split(".")
                  .reduce((obj: any, key: string) => obj?.[key], errors);

                return (
                  <div key={field.name} className="flex flex-col ">
                    <label className="text-zinc-300 text-xs tracking-widest uppercase mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="bg-transparent border-b border-zinc-700 focus:border-red-700 outline-none py-2 text-white placeholder:text-zinc-600 transition-colors"
                      {...register(field.name, field.rules)}
                    />
                    {/* L'erreur s'affiche de la même façon pour les deux ! */}
                    {fieldError && (
                      <p className="text-red-500 text-xs italic mt-2 ml-2">
                        {fieldError.message}
                      </p>
                    )}
                  </div>
                );
              })}

              <Button textButton="Créer" variant="red" />
            </form>
            <img src={`${photo}`} className="w-90 lg:w-180 m-auto lg:ml-10" />
          </div>
        </Fade>
      </article>
      <TornEdge position="bottom" />
    </div>
  );
};

export default FestivalCreatePage;
