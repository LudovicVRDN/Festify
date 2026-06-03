import Caroussel from "../components/Caroussel";
import { Fade } from "react-awesome-reveal";
import { Link, useNavigate } from "react-router";
import Button from "../components/ui/button";
import TornEdge from "../components/TornEdge";
import {
  useForm,
  type RegisterOptions,
} from "react-hook-form";
import { useAuthStore } from "../stores/auth.store";
import type { IUser } from "../types/user.type";
import api from "../api/axios.instance";
import { useRef, useState } from "react";


interface SigninFormData {
  email: string;
  password: string;
}

interface IForm {
  email: string;
  password: string;
}
export interface LoginCredentials {
  email: string;
  password: string;
}

interface Iinputs {
  name: keyof IForm;
  label: string;
  type: string;
  placeholder?: string;
  rules?: RegisterOptions<IForm, keyof IForm>;
}
interface Idata {
  access_token: string;
  refreshToken: string;
}
export interface AuthResponse {
  accessToken: string;
  data: Idata;
  user: IUser;
}

const HomePage = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [isEmailSend, setEmailSend] = useState(false);
  const handleResetPassword = async (resetData: { email: string }) => {
    try {
      console.log(resetData);
      await api.post("/auth/forgot-password", resetData);
      setEmailSend(true)
    } catch (error: any) {
      console.log("Erreur :", error.response.status);
    }
  };

  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>();

  const {
    register: registerReset,
    handleSubmit: handleResetSubmit,
    formState: { errors: resetErrors },
  } = useForm<{ email: string }>();

  const handleConfirm = handleResetSubmit((data: { email: string }) => {
    handleResetPassword(data);
    modalRef.current?.close();
  });

  const onSubmit = async (formdata: SigninFormData) => {
    try {
      const { data } = await api.post<AuthResponse>("/auth/login", formdata);
      setUser(data.user);
      setAccessToken(data.data.access_token);
      const role = useAuthStore.getState().user?.role;
      navigate(`/${role}`);
    } catch (error: any) {
      if (error.response) {
        console.log("Erreur :", error.response.status);
        alert(error.response.data.message || "Identifiants incorrects");
      } else {
        console.log("Erreur réseau (vérifie si NestJS est lancé)");
      }
    }
  };

  const loginInput: Iinputs[] = [
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
      },
    },
  ];

  return (
    <div className="flex flex-col items-center  ">
      <Caroussel />

      <div className="relative w-full -translate-y-10 ">
        <TornEdge position="top" />
        <div className="  bg-black lg:h-130 h-190 lg:px-16 flex flex-col justify-center items-center lg:items-baseline pt-20 lg:flex-row-reverse gap-5 lg:justify-evenly">
          <Fade direction="down" delay={500}>
            <div className="flex flex-col">
              <h1 className="text-5xl text-festify-red font-metal">
                Login now !
              </h1>
              <p className="py-6 lg:text-xl w-90 lg:w-110">
                <span className="lg:text-2xl text-xl">
                  Fais vibrer ton festival avec Festify !{" "}
                </span>
                <br />
                De l'organisation millimétrée au bénévolat sur le terrain,
                rejoins les rangs de ceux qui font vibrer la terre. Festify te
                donne les clés : parce qu'on n'a pas besoin d'être sous les
                projecteurs pour faire briller la scène !
              </p>
            </div>
            <div className=" w-50 p-4 h-100  ">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6  lg:w-100 "
              >
                {/* Input Email */}
                {loginInput.map((field) => (
                  <div key={field.name} className="flex flex-col">
                    <label className="text-zinc-300 text-xs tracking-widest uppercase">
                      {field.label}
                    </label>
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
                <div>
                  <button
                    type="button"
                    className="text-zinc-600 text-sm hover:text-red-700 transition-colors cursor-pointer self-start"
                    onClick={() => modalRef?.current?.showModal()}
                  >
                    Mot de passe oublié
                  </button>
                  {isEmailSend &&(
                    <p className="text-red-500 text-xs italic mt-2 ml-2">Un email a été envoyé sur ton adresse mail si elle est correcte !</p>
                  )}
                </div>

                {/* Bouton principal */}
                <Button textButton="SE CONNECTER" variant="red" />
                {/* Bouton secondaire */}
                <Link to="/register">
                  <Button textButton="S'inscrire" variant="grey" />
                </Link>
              </form>
            </div>
          </Fade>
          <dialog ref={modalRef} id="my_modal_1" className="modal">
            <div className="modal-box bg-black border border-festify-glassred  ">
              <h3 className="font-bold text-lg">Mot de passe oublié</h3>
              <p className="py-4">Entre ton adresse Email</p>
              <div>
                <form onSubmit={handleConfirm} className="flex flex-col gap-5">
                  <label className="text-zinc-300 text-xs tracking-widest uppercase">
                    Ton Email:
                  </label>
                  <input
                    type="email"
                    placeholder="Ton adresse Email"
                    className="bg-transparent border-b border-zinc-700 focus:border-red-700 outline-none py-2 text-white placeholder:text-zinc-600 transition-colors"
                    {...registerReset("email", {
                      required: "L'email est requis",
                    })}
                  />
                  {resetErrors.email && (
                    <p className="text-red-500 text-xs italic mt-1">
                      {resetErrors.email.message}
                    </p>
                  )}
                  <Button variant="grey" textButton="Valider"/>
                  <Button textButton="Annuler" variant="red" />
                </form>
              </div>
            </div>
          </dialog>
        </div>

        <TornEdge position="bottom" />
      </div>
    </div>
  );
};

export default HomePage;
