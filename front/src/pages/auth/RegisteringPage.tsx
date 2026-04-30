import { Fade } from "react-awesome-reveal";
import Button from "../../components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import registerPic from "../../assets/registerPic.jpg";
import TornEdge from "../../components/TornEdge";
import { useAuthStore } from "../../stores/auth.store";
import type { IUser } from "../../types/user.type";
import type { Iinputs } from "../../types/inputsForm.interface";
import axios from "axios";

const RegisteringPage = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

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
        minLength: { value: 8, message: "Trop court (8 min)" },
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
        required: "Veuillez confirmer le mot de passe",
        validate: (value: any) =>
          value === password || "Les mots de passe ne correspondent pas",
      },
    },
    {
      name: "role",
      label: "Statut",
      type: "radio",
      options: [
        { label: "Bénévole", value: "benevole" },
        { label: "Organisateur", value: "organisateur" },
      ],
      rules: {
        required: "Veuillez sélectionner un statut",
      },
    },
    {
      name: "profile.lastname",
      label: "Nom",
      type: "text",
      placeholder: "Nom",
      rules: { required: "Inscrit ton nom" },
    },
    {
      name: "profile.firstname",
      label: "Prénom",
      type: "text",
      placeholder: "Prénom",
      rules: { required: "Inscrit ton prénom" },
    },
    {
      name: "profile.adress.street",
      label: "Adresse",
      type: "text",
      placeholder: "Adresse",
      rules: { required: "Adresse obligatoire" },
    },
    {
      name: "profile.adress.postalCode",
      label: "Code Postal",
      type: "string",
      placeholder: "Code Postal",
      rules: { required: "Code postal obligatoire" },
    },
    {
      name: "profile.adress.city",
      label: "Ville",
      type: "text",
      placeholder: "Ville",
      rules: { required: "Ville obligatoire" },
    },
  ];
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IUser>({
  mode: "onChange" 
});

  const handleForm: SubmitHandler<IUser> = async (data: IUser) => {
    console.log(`Data envoyées : ${data}`);
    if (data.password === data.confirmPassword) {
      const { confirmPassword, ...userToSend } = data;
      try{
      await axios.post<String>(
        "http://localhost:3000/auth/register",
        userToSend,
      )
      navigate("/")
      }catch (error: any) {
      if (error.response) {
        console.log("Erreur :", error.response.status);
        alert(error.response.data.message || "Identifiants incorrects");
      } else {
        console.log("Erreur réseau (vérifie si NestJS est lancé)");
      }
    }
      
    }
  };
  const password = watch("password");

  return (
    <div className="my-5">
      <TornEdge position="top" />
      <article className="flex flex-col items-center gap-5 p-2 bg-black">
        <Fade direction="down" delay={500}>
          <h1 className="font-metal text-xl lg:text-4xl text-festify-red">
            Rejoins Festify !{" "}
          </h1>
          <div className="flex flex-col lg:flex-row justify-center lg:min-h-115">
            <form
              onSubmit={handleSubmit(handleForm)}
             className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-8 justify-center items-start bg-black lg:w-150 p-5"
            >
              {formFields.map((field) => {
                const fieldError = field.name
                  .split(".")
                  .reduce((obj: any, key: string) => obj?.[key], errors);

                return (
                  <div key={field.name} className="flex flex-col ">
                    <label className="text-zinc-300 text-xs tracking-widest uppercase mb-2">
                      {field.label}
                    </label>

                    {field.type === "radio" ? (
                      // CAS RADIO : On boucle sur les options
                      <div className="flex gap-6 py-2">
                        {field.options?.map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center gap-2 cursor-pointer text-white"
                          >
                            <input
                              type="radio"
                              value={option.value}
                            
                              {...register(field.name, field.rules)}
                            />
                            <span className="text-sm">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      // CAS CLASSIQUE (text, password, etc.)
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        className="bg-transparent border-b border-zinc-700 focus:border-red-700 outline-none py-2 text-white placeholder:text-zinc-600 transition-colors"
                        {...register(field.name, field.rules)}
                      />
                    )}

                    {/* L'erreur s'affiche de la même façon pour les deux ! */}
                    {fieldError && (
                      <p className="text-red-500 text-xs italic mt-2 ml-2">
                        {fieldError.message}
                      </p>
                    )}
                  </div>
                );
              })}

              <Button textButton="S'inscrire" variant="red" />
            </form>

            <img src={registerPic} alt="Stage picture" className="lg:w-200 " />
          </div>
        </Fade>
      </article>
      <TornEdge position="bottom" />
    </div>
  );
};

export default RegisteringPage;
