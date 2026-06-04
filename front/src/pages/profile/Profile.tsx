import { useEffect, useRef, useState } from "react";
import type { IAdresse, IProfile } from "../../types/Profile.type";
import TornEdge from "../../components/TornEdge";
import type { IUser } from "../../types/user.type";
import { useNavigate } from "react-router";
import Button from "../../components/ui/button";
import { Fade } from "react-awesome-reveal";
import profilePic from "../../assets/profile.jpg";
import api from "../../api/axios.instance";
import Modal from "../../components/ui/modal";
import { useAuthStore } from "../../stores/auth.store";
import { useForm} from "react-hook-form";

interface IProfileProps {
  id: number | undefined;
}

interface IResetPasswordInputs {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}
const Profile = ({ id }: IProfileProps) => {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [adress, setAdresse] = useState<IAdresse | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [isModified, setIsModified] = useState<boolean>(false);
  const modalRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  const {
    register: registerReset,
    handleSubmit: handleResetSubmit,
    watch,
    formState: { errors: resetErrors },
  } = useForm<IResetPasswordInputs>();

  const handleConfirm = handleResetSubmit((data) => {
    handleModifyPassword(data);
    modalRef.current?.close();
  });

  const handleModifyPassword = async (modifyData: IResetPasswordInputs) => {
    try {
      const payload = {
        currentPassword: modifyData.currentPassword,
        newPassword : modifyData.password
      }
      await api.patch(`/user/${id}/update/password`, payload);
      setIsModified(true);
    } catch (error: any) {
      console.log("Erreur :", error.response.status);
    }
  };

  const fetchProfile = async () => {
    console.log("Hello");
    try {
      const profileDB = await api.get<IProfile>(`/profile/${id}`);
      const adresseDB = await api.get<IAdresse>(`/adress/${id}`);
      const userDB = await api.get<IUser>(`/user/${id}`);
      setProfile(profileDB.data);
      setAdresse(adresseDB.data);
      setUser(userDB.data);
    } catch (error) {
      console.error("Erreur lors de la récupération:", error);
    }
  };
  const deleteProfile = async () => {
    try {
      console.log("Data supprimée");
      await api.delete(`/user/${id}`);
      useAuthStore.getState().logout();
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la récupération:", error);
    }
  };
  const password = watch('password')

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      <TornEdge position="top" />

      <section className="bg-black flex flex-col lg:flex-row items-center gap-5 justify-center">
        <section className="bg-black flex flex-col items-center gap-5">
          <h1 className="font-metal text-xl text-festify-red lg:text-4xl text-center ">{`Bienvenue ${profile?.firstname}`}</h1>
          <Fade direction="down" delay={500}>
            <div className=" px-4 pb-2 flex flex-col lg:flex-row justify-center items-center  p-3">
              <div className="flex flex-col items-center ">
                <h2 className="tracking-widest uppercase text-festify-red lg:text-2xl text-lg text-center w-90">
                  Informations personnelles
                </h2>
                <p className="bg-transparent border-b border-zinc-700 outline-none pt-2 pb-2 lg:pb-4 text-white ">
                  <span className="text-festify-red text-base lg:text-lg  tracking-widest uppercase">
                    Ton nom:
                  </span>{" "}
                  {` ${profile?.lastname}`}
                </p>
                <p className="bg-transparent border-b border-zinc-700 outline-none pt-2 pb-2 lg:pb-4 text-white ">
                  <span className="text-festify-red text-base lg:text-lg tracking-widest uppercase">
                    Ton prénom:
                  </span>
                  {` ${profile?.firstname}`}
                </p>
              </div>
              <div className="flex flex-col w-60 items-center ">
                <h2 className="tracking-widest uppercase text-festify-red lg:text-2xl text-lg text-center">
                  Adresse
                </h2>
                <p className="bg-transparent border-b border-zinc-700 outline-none pt-2 pb-2 lg:pb-4 text-white ">
                  <span className="text-festify-red text-base lg:text-lg  tracking-widest uppercase">
                    Ta ville:
                  </span>
                  {` ${adress?.city}`}
                </p>

                <p className="bg-transparent border-b border-zinc-700 outline-none pt-2 pb-2 lg:pb-4 text-white ">
                  <span className="text-festify-red text-base lg:text-lg  tracking-widest uppercase">
                    Ta rue:
                  </span>
                  {` ${adress?.street}`}
                </p>
                <p className="bg-transparent border-b border-zinc-700 outline-none pt-2 pb-2 lg:pb-4 text-white ">
                  <span className="text-festify-red text-base lg:text-lg  tracking-widest uppercase">
                    Code postal:
                  </span>
                  {` ${adress?.postalCode}`}
                </p>
              </div>
            </div>
            <div className=" px-4 pb-2 flex flex-col justify-center items-center gap-5 lg:gap-15 p-3">
              <h2 className="tracking-widest uppercase text-festify-red lg:text-2xl text-lg text-center">
                Informations de connexion
              </h2>
              <p className="bg-transparent border-b border-zinc-700 outline-none pt-2 pb-2 lg:pb-4 text-white ">
                <span className="text-festify-red text-base lg:text-lg tracking-widest uppercase">
                  Ton Email:
                </span>
                {` ${user?.email}`}
              </p>
            </div>
            {}
            <div className=" flex flex-col gap-5 w-55">
                <Button textButton="Modifie ton profil" variant="grey" onClick={() => navigate(`/profile/${id}/update`)} />
              <Button
                textButton="Modifie ton mot de passe"
                variant="grey"
                onClick={() => modalRef?.current?.showModal()}
              />
              {isModified &&(
                  <p className="text-red-500 text-xs italic mt-2 ml-2">Ton mot de passe est bien modifié !</p>
              )}

              <dialog ref={modalRef} id="my_modal_1" className="modal">
                <div className="modal-box bg-black border border-festify-glassred  ">
                  <h3 className="font-bold text-lg">Modifie ton Mot passe</h3>
                  <p className="py-4">Ton nouveau mot de passe doit contenir au moins 8 caractères, un chiffre et un caractère spécial</p>
                  <div>
                    <form
                      onSubmit={handleConfirm}
                      className="flex flex-col gap-5"
                    >
                      <label className="text-zinc-300 text-xs tracking-widest uppercase">
                        Ton mot de passe actuel:
                      </label>
                      <input
                        type="password"
                        placeholder="Ton mot de passe actuel"
                        className="bg-transparent border-b border-zinc-700 focus:border-red-700 outline-none py-2 text-white placeholder:text-zinc-600 transition-colors"
                        {...registerReset("currentPassword", {
                          required: "Ton Mot de passe est requis",
                          validate: {
                            hasUpperCase: (v: any) =>
                              /[A-Z]/.test(v) || "Doit contenir une majuscule",
                            hasLowerCase: (v: any) =>
                              /[a-z]/.test(v) || "Doit contenir une minuscule",
                            hasNumber: (v: any) =>
                              /[0-9]/.test(v) || "Doit contenir un chiffre",
                            hasSpecial: (v: any) =>
                              /[^A-Za-z0-9]/.test(v) ||
                              "Doit contenir un caractère spécial",
                          },
                        })}
                      />
                      <label className="text-zinc-300 text-xs tracking-widest uppercase">
                        Ton nouveau mot de passe:
                      </label>
                      <input
                        type="password"
                        placeholder="Ton nouveau mot de passe"
                        className="bg-transparent border-b border-zinc-700 focus:border-red-700 outline-none py-2 text-white placeholder:text-zinc-600 transition-colors"
                        {...registerReset("password", {
                          required: "Ton Mot de passe est requis",
                          validate: {
                            hasUpperCase: (v: any) =>
                              /[A-Z]/.test(v) || "Doit contenir une majuscule",
                            hasLowerCase: (v: any) =>
                              /[a-z]/.test(v) || "Doit contenir une minuscule",
                            hasNumber: (v: any) =>
                              /[0-9]/.test(v) || "Doit contenir un chiffre",
                            hasSpecial: (v: any) =>
                              /[^A-Za-z0-9]/.test(v) ||
                              "Doit contenir un caractère spécial",
                          },
                        })}
                      />
                      <label className="text-zinc-300 text-xs tracking-widest uppercase">
                        Confirme ton nouveau mot de passe:
                      </label>
                      <input
                        type="password"
                        placeholder="Confirme ton nouveau mot de passe"
                        className="bg-transparent border-b border-zinc-700 focus:border-red-700 outline-none py-2 text-white placeholder:text-zinc-600 transition-colors"
                        {...registerReset("confirmPassword", {
                          required: "Ton Mot de passe est requis",
                          validate: (value: any) =>
                            value === password ||
                            "Les mots de passe ne correspondent pas",
                        })}
                      />
                      {resetErrors.password && (
                        <p className="text-red-500 text-xs italic mt-1">
                          {resetErrors.password.message}
                        </p>
                      )}
                      <Button variant="grey" textButton="Valider" />
                      <Button textButton="Annuler" variant="red" onClick={() => modalRef?.current?.close()} />
                    </form>
                  </div>
                </div>
              </dialog>

              <Modal
                buttonText="Supprimer le profil"
                message="Veux tu vraiment supprimer ton profil ?"
                onClick={() => {
                  deleteProfile();
                }}
              />
            </div>
          </Fade>
        </section>
        <img src={profilePic} className="lg:w-145 lg:h-180 w-80 h-100" />
      </section>
      <TornEdge position="bottom" />
    </div>
  );
};

export default Profile;
