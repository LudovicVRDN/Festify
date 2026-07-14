
import TornEdge from "../../components/TornEdge"
import type { IFestival } from "../../types/festival.type"
import { useNavigate, useParams } from "react-router";
import api from "../../api/axios.instance";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Modal from "../../components/ui/modal";
import Button from "../../components/ui/button";
import { useRef } from "react";
import type { IMission } from "../../types/misison.type";
import MissionListCard from "../../components/MissionListCard";
import { useAuthStore } from "../../stores/auth.store";
import MissionEditModal, { type MissionEditModalHandle } from "../../components/MissionModal";
import FestivalEditModal, { type FestivalEditModalHandle } from "../../components/FestivalModal";

const FestivalEditPage = () => {
  const role = useAuthStore((state) => state.user?.role);
  const params = useParams();
  const festivalModalRef = useRef<FestivalEditModalHandle>(null);
  const misisonModalForm = useRef<MissionEditModalHandle>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const id = useAuthStore((state) => state.user?.id);

  const {
    data: festivals,
    isPending: isFestivalsPending,
    error: festivalsError
  } = useQuery<IFestival[]>({
    queryKey: ["festival", id],
    queryFn: async () => {
      const res = await api.get(`/user/${id}/festival`);
      return res.data;
    },
    enabled: !!id,
  });

  const {
    data,
    isPending,
    error
  } = useQuery<IFestival>({
    queryKey: ['festival', params.festivalId],
    queryFn: () => api.get(`/user/${params.festivalId}/festival/details`).then(r => r.data)
  })

  const {
    data: missions,
    isPending: missionsIsPending,
    error: errorsMissions
  } = useQuery<IMission[]>({
    queryKey: ['missions', data?.id],
    queryFn: () => api.get(`/missions/${params.festivalId}`).then(r => r.data)
  })

  const deleteFestival = async () => {
    try {
      await api.delete(`/festival/${params.festivalId}`);
      navigate('/');
    } catch (error) {
      console.error("Error deleting festival:", error);
    }
  };

  const deleteMission = async (missionId: number | undefined) => {
    try {
      await api.delete(`/missions/${missionId}`);
      queryClient.invalidateQueries({ queryKey: ["missions"] });
    } catch (error) {
      console.error("Error deleting festival:", error);
    }
  };

  if (isPending || missionsIsPending || isFestivalsPending) return <span>Loading...</span>
  if (error || errorsMissions || festivalsError) return <Modal buttonText="Un soucis" message="Aie c'est cassé" onClick={() => navigate('/')} />

  if (!data) {
    navigate('/notFound');
    return null
  }
  return (
    <div className="bg-metal-dark bg-metal-grid min-h-screen">
      <div className="md:w-150 lg:w-200  m-auto py-15">
        <p className="text-center line-title text-lg text-red-hot font-metal pb-2">
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
      <div >
        <TornEdge position="top" />
        <article className="bg-black flex flex-col lg:flex-row items-center justify-center gap-4">
          <div className="flex flex-col justify-center items-center gap-4 " >
            <h1 className="font-metal  text-festify-red text-5xl  text-center ">{`${data.name}`}</h1>
            <article className="  p-5">
              <ul className="flex flex-col gap-5 items-center">
                <li className="text-zinc-300  text-lg md:text-2xl tracking-widest uppercase">Ton festival a lieu à {`${data.adress.city}`}</li>
                <li className="text-zinc-300 text-lg md:text-2xl tracking-widest uppercase">L'adresse exacte: {`${data.adress.street} ${data.adress.postalCode}`}</li>
                <li className="text-zinc-300 text-lg md:text-2xl tracking-widest uppercase">Il commence le {`${data.start_date.split("T")[0]}`}</li>
                <li className="text-zinc-300 text-lg md:text-2xl tracking-widest uppercase">Il finit le  {`${data.end_date?.split("T")[0]}`}</li>
              </ul>
            </article>

            <Button textButton="Modifier le festival" variant='grey' onClick={() => festivalModalRef.current?.open(data)} />
            <Modal buttonText="Supprimer le festival" message="Êtes-vous sûr de vouloir supprimer ce festival ?" onClick={deleteFestival} />
          </div>
          <FestivalEditModal ref={festivalModalRef} festivalId={params.festivalId!} />
          <div className="flex flex-col items-center gap-5">
            <h2 className="font-metal  text-festify-red text-5xl  text-center ">Les missions de ton festival :</h2>
            <Button
              textButton="Planifie tes nouvelles missions"
              variant="red"
              onClick={() => navigate("/missions/create")}
            />

            <ul >
              {missions?.map((mission) => {
                return (
                  <MissionListCard mission={mission} button={true} handleDelete={() => deleteMission(mission.id)} modify={true} role={role!}
                    showMore={() => {
                      misisonModalForm.current?.open(mission)

                    }} />
                )
              })}
            </ul>
          </div>
          <MissionEditModal ref={misisonModalForm} festivalId={params.festivalId!} festivals={festivals} />
        </article>
        <TornEdge position="bottom" />
      </div>
    </div>
  )


}

export default FestivalEditPage
