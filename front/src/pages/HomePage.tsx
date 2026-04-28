
import Caroussel from "../components/Caroussel";
import { Fade } from "react-awesome-reveal";
import { Link, useNavigate } from "react-router";
import Button from "../components/ui/button";
import TornEdge from "../components/TornEdge";
import { useForm, type RegisterOptions } from "react-hook-form";
import { useAuthStore } from "../stores/auth.store";

interface SigninFormData {
  email: string;
  password: string;
}

interface IForm {
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

const HomePage = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormData>();

  // 1. On récupère la string (ou une string vide pour éviter le null)
  const rawData = localStorage.getItem("auth-storage") ?? "{}";

  // 2. On parse
  const storage = JSON.parse(rawData);

  // 3. On accède au password (souvent caché dans .state)
  const password = storage.state?.user?.password;
  console.log(password)
  // Ou selon ta structure : storage.password

  const onSubmit = async (data: SigninFormData) => {
    const user = {
      id: 19,
      email: data.email,
      password: password,
      role: "organisateur",
    };
    setUser(user);
    setAccessToken("eyjkr5fre4h4t4j6y5t4jt4uy465uy");
    navigate("/profile");
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
        validate: (v: string) =>
          v === password || "Mot de passe ou email incorrect",
      },
    },
  ];

  return (
    <div className="flex flex-col  items-center  ">
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
                <a className="text-zinc-600 text-xs hover:text-red-700 transition-colors cursor-pointer self-start">
                  Mot de passe oublié ?
                </a>
                {/* Bouton principal */}
                <Button textButton="SE CONNECTER" />
                {/* Bouton secondaire */}
                <Link
                  to="/register"
                  className="w-full border border-zinc-700 hover:border-red-700 text-zinc-400 hover:text-red-500 py-3 text-sm font-bold tracking-widest uppercase text-center transition-colors"
                >
                  S'inscrire
                </Link>
              </form>
            </div>
          </Fade>
        </div>

        <TornEdge position="bottom" />
      </div>
    </div>
  );
};

export default HomePage;
