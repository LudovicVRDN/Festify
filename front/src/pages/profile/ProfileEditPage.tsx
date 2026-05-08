import { useEffect, useState } from "react";
import TornEdge from "../../components/TornEdge";
import { Fade } from "react-awesome-reveal";
import Button from "../../components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { IUser } from "../../types/user.type";
import type { Iinputs } from "../../types/inputsForm.interface";
import { useNavigate } from "react-router";
import type { IAdresse, IProfile } from "../../types/Profile.type";
import api from "../../api/axios.instance";


interface ProfileEditProps {
  userId: number | undefined;
}

const ProfileEditPage = ({ userId }: ProfileEditProps) => {

  const navigate = useNavigate();
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [adress, setAdresse] = useState<IAdresse | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  const fetchProfile = async () => {
    try {
      const profileDB = await api.get<IProfile>(
        `http://localhost:3000/profile/${userId}`,
      );
      const adresseDB = await api.get<IAdresse>(
        `http://localhost:3000/adress/${userId}`,
      );
      const userDB = await api.get<IUser>(
        `http://localhost:3000/user/${userId}`,
      );
      setProfile(profileDB.data);
      setAdresse(adresseDB.data);
      setUser(userDB.data);
    } catch (error) {
      console.error("Erreur lors de la récupération:", error);
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUser>({
    mode: "onChange",
  });

  useEffect(() => {
    const fetchAllData = async () => {
      await fetchProfile();
    };
    fetchAllData();
  }, [userId]);

  useEffect(() => {
    if (user && profile && adress) {
      const { password, ...userWithoutPassword } = user;
      reset({
        ...userWithoutPassword,
        password: "",
        confirmPassword: "",
        profile: {
          ...profile,
          adress: adress,
        },
      });
    }
  }, [user, profile, adress, reset]);

  const formFields: Iinputs[] = [
    {
      name: "email",
      label: "Email",
      type: "email",
      value: `${user?.email}`,
      rules: {
        required: "Adresse Email requise",
        validate: (v: any) => String(v).includes(".") || "Format incorrect",
      },
    },
    {
      name: "profile.lastname",
      label: "Nom",
      type: "text",
      value: `${profile?.lastname}`,
      rules: { required: "Inscrit ton nom" },
    },
    {
      name: "profile.firstname",
      label: "Prénom",
      type: "text",
      value: `${profile?.firstname}`,
      rules: { required: "Inscrit ton prénom" },
    },
    {
      name: "profile.adress.street",
      label: "Adresse",
      type: "text",
      value: `${adress?.street}`,
      rules: { required: "Adresse obligatoire" },
    },
    {
      name: "profile.adress.postalCode",
      label: "Code Postal",
      type: "string",
      value: `${adress?.postalCode}`,
      rules: { required: "Code postal obligatoire" },
    },
    {
      name: "profile.adress.city",
      label: "Ville",
      type: "text",
      value: `${adress?.city}`,
      rules: { required: "Ville obligatoire" },
    },
  ];
  const handleForm: SubmitHandler<IUser> = async (data: IUser) => {
    const { confirmPassword, password, ...userWithoutPasswords } = data;
    const userToSend = password
      ? { ...userWithoutPasswords, password }
      : userWithoutPasswords;
    try {
      const newUser = await api.patch<Date>(
        `http://localhost:3000/user/${userId}/update`,
        userToSend,
      );
      navigate(`/profile/${userId}`);
    } catch (error: any) {
      if (error.response) {
        console.log("Erreur :", error.response.status);
        alert(error.response.data.message || "Identifiants incorrects");
      } else {
        console.log("Erreur réseau (vérifie si NestJS est lancé)");
      }
    }
  };

  return (
    <div>
      <div className="my-5">
        <TornEdge position="top" />
        <article className="flex flex-col  items-center gap-5 p-2 bg-black">
          <Fade direction="down" delay={500}>
            <h1 className="font-metal text-xl lg:text-4xl text-festify-red">
              Modifie ton profil{" "}
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

                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        defaultValue={field.value}
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

                <Button textButton="Valider" variant="red" />
              </form>
            </div>
          </Fade>
        </article>
        
        <TornEdge position="bottom" />
      </div>
    </div>
  );
};

export default ProfileEditPage;
