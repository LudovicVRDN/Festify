import React from "react";
import { Fade } from "react-awesome-reveal";
import Button from "../../components/ui/button";
import {
  useForm,
  type RegisterOptions,
  type SubmitHandler,
} from "react-hook-form";
import { useNavigate } from "react-router";
import registerPic from "../../assets/registerPic.jpg"
import TornEdge from "../../components/TornEdge";

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
          value === password || "Les mots de passe ne correspondent pas",
      },
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
    <div className="my-5">
    <TornEdge position="top" />
      <article className="flex flex-col items-center gap-5 p-2 bg-black">
        <h1 className="font-metal text-xl lg:text-4xl text-festify-red">
          Rejoins Festify !{" "}
        </h1>
        <div className="flex flex-col lg:flex-row justify-center lg:h-115">
  
          
          <form className="flex flex-col lg:grid lg:grid-cols-2 lg:grid-rows-3 justify-center items-center gap-6 bg-black lg:w-150 p-5">
            {formFields.map((field) => (
              <div key={field.name} className="flex flex-col">
                <label className="text-zinc-300 text-xs tracking-widest uppercase">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="bg-transparent border-b border-zinc-700 focus:border-red-700 outline-none py-2 text-white placeholder:text-zinc-600 transition-colors"
                  {...register(field.name, field.rules)}
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-xs italic mt-2 ml-2">
                    {errors[field.name]?.message}
                  </p>
                )}
              </div>
            ))}

            <Button textButton="S'inscrire" />
          </form>
         
         
        <img src={registerPic} alt="Stage picture" className="lg:w-200 "/>
        </div>
      </article>
       <TornEdge position="bottom" />
    </div>
  );
};

export default RegisteringPage;
