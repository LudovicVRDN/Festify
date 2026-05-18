import { useEffect, useState } from "react";
import type { IAdresse, IProfile } from "../../types/Profile.type";
import TornEdge from "../../components/TornEdge";
import type { IUser } from "../../types/user.type";
import { Link, useNavigate } from "react-router";
import Button from "../../components/ui/button";
import { Fade } from "react-awesome-reveal";
import profilePic from "../../assets/profile.jpg";
import api from "../../api/axios.instance";
import Modal from "../../components/ui/modal";
import { useAuthStore } from "../../stores/auth.store";

interface IProfileProps {
  id: number | undefined;
}
const Profile = ({ id }: IProfileProps) => {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [adress, setAdresse] = useState<IAdresse | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate()

  const fetchProfile = async () => {
    console.log("Hello");
    try {
      const profileDB = await api.get<IProfile>(
        `/profile/${id}`,
      );
      const adresseDB = await api.get<IAdresse>(
        `/adress/${id}`,
      );
      const userDB = await api.get<IUser>(`/user/${id}`);
      setProfile(profileDB.data);
      setAdresse(adresseDB.data);
      setUser(userDB.data);
      
    } catch (error) {
      console.error("Erreur lors de la récupération:", error);
    }
  };
  const deleteProfile = async () =>{
    try{
      console.log('Data supprimée')
      await api.delete(`/user/${id}`)
      useAuthStore.getState().logout()
      navigate('/')
    
    }catch(error){
      console.error("Erreur lors de la récupération:", error);
    }
  }

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
            <Link to={`/profile/${id}/update`}>
              <Button textButton="Modifie ton profil" variant="grey" />
            </Link>
              <Link to={`/profile/${id}/update`}>
                <Button textButton="Modifie ton mot de passe" variant="grey" />
              </Link>
            <Modal type='validation' buttonText="Supprimer le profil" message="Veux tu vraiment supprimer ton profil ?" onClick={() => { deleteProfile() }} />
              </div>
          </Fade>
        </section>
        <img src={profilePic} className="lg:w-145 lg:h-180 w-80 h-100"  />
      </section>
      <TornEdge position="bottom" />
    </div>
  );
};

export default Profile;
