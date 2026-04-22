import React from "react";
import { Fade } from "react-awesome-reveal";
import Button from "../../components/ui/button";
import {
  useForm,
  type RegisterOptions,
  type SubmitHandler,
} from "react-hook-form";
import { useNavigate } from "react-router";

interface IForm {
  email: string;
  password: string;
  confirmPassword: string;
  nom: string;
  prenom: string;
  adresse: string;
  codePostal: number;
  ville: string;
}
interface Iinputs {
  name: keyof IForm;
  label: string;
  type: string;
  placeholder?: string;
  rules?: RegisterOptions<IForm, keyof IForm>;
}

const RegisteringPage = () => {
  const formFields: Iinputs[] = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Email",
      rules: {
        required: "Adresse Email requise",
        validate: (v: any) => String(v).includes(".") || "Format incorrect",
      },
    },
    {
      name: "password",
      label: "Mot de Passe",
      type: "password",
      placeholder: "Mot De Passe",
      rules: {
        required: "Mot de passe requis",
        minLength: { value: 12, message: "Trop court (12 min)" },
        validate: {
          hasUpperCase: (v: any) =>
            /[A-Z]/.test(v) || "Doit contenir une majuscule",
          hasLowerCase: (v: any) =>
            /[a-z]/.test(v) || "Doit contenir une minuscule",
          hasNumber: (v: any) => /[0-9]/.test(v) || "Doit contenir un chiffre",
          hasSpecial: (v: any) =>
            /[^A-Za-z0-9]/.test(v) || "Doit contenir un caractère spécial",
        },
      },
    },
    {
      name: "confirmPassword",
      label: "Confirmer le MDP",
      type: "password",
      placeholder: "Confirmer le mot de passe",
      rules: {
        required: "Confirmation requise",
        validate: (value: any) => 
          value === password || "Les mots de passe ne correspondent pas"
      }
    },
    {
      name: "nom",
      label: "Nom",
      type: "text",
      placeholder: "Nom",
      rules: { required: "Inscrit ton nom" },
    },
    {
      name: "prenom",
      label: "Prénom",
      type: "text",
      placeholder: "Prénom",
      rules: { required: "Inscrit ton prénom" },
    },
    {
      name: "adresse",
      label: "Adresse",
      type: "text",
      placeholder: "Adresse",
      rules: { required: "Adresse obligatoire" },
    },
    {
      name: "codePostal",
      label: "Code Postal",
      type: "number",
      placeholder: "Code Postal",
      rules: { required: "Code postal obligatoire" },
    },
    {
      name: "ville",
      label: "Ville",
      type: "text",
      placeholder: "Ville",
      rules: { required: "Ville obligatoire" },
    },
  ];
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IForm>();

  const handleForm: SubmitHandler<IForm> = (data: IForm) => {
    if (data.password === data.confirmPassword) {
      console.log("http !!");
      //send request http
      console.log(data);
      //response from server
      const response = "ok";
      if (response === "ok") {
        navigate("/signin");
      }
    }
  };
  const password = watch("password");

  return (
    <Fade direction="down" delay={400} className="w-full flex justify-center">
      <article className="flex flex-col-reverse lg:flex-row-reverse gap-5 p-2">
        <form
          onSubmit={handleSubmit(handleForm)}
          className="fieldset bg-neutral-800  border-red-950 rounded-box border p-4 "
        >
          <legend className="fieldset-legend">Login</legend>
          <section className="flex flex-col lg:flex-row  justify-between items-center">
            <div className="grid grid-cols-2 grid-rows-3 gap-5 justify-items-end">
              {formFields.map((field) => (
                <div key={field.name}>
                  <label className="label">{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="input lg:w-60"
                    {...register(field.name, field.rules)}
                  />
                  {errors[field.name] && (
                    <p className="text-red-500 text-xs italic mt-2 ml-2">
                      {errors[field.name]?.message}
                    </p>
                  )}
                </div>
              ))}
             
            </div>
          </section>
          <Button textButton="S'inscrire" />
        </form>
        <div className=" border-l-6 border-red-950 rounded-lg p-6 bg-neutral-800 lg:w-180 ">
          <h1 className="font-metal text-xl lg:text-4xl text-red-900">
            Rejoins Festify !{" "}
          </h1>
          <p className="lg:text-xl text-md">
            "Derrière chaque mur de son, chaque faisceau de lumière et chaque
            émotion partagée dans la poussière d'un festival, se cache une armée
            de passionnés. De l'organisation millimétrée en amont au bénévolat
            pur sur le terrain, rejoins dès maintenant les rangs de ceux qui
            font vibrer la terre sous les pieds de milliers de personnes.
            <br />
            Festify te donne les clés de la machine : parce qu'on n'a pas besoin
            d'être sous les projecteurs pour faire briller la scène, nous avons
            créé un espace où ta rigueur, ton énergie et ton dévouement trouvent
            leur place. Que tu sois là pour piloter la logistique, gérer
            l'accueil ou orchestrer l'ombre, ton engagement est le moteur de
            l'événement.
            <br />
            Ne te contente plus de participer, viens bâtir l'expérience. Crée
            ton profil, rejoins la communauté et prépare-toi à vivre
            l'adrénaline des coulisses. L'aventure humaine commence ici, au cœur
            de l'organisation, là où le chaos devient harmonie."
          </p>
        </div>
      </article>
    </Fade>
  );
};

export default RegisteringPage;
