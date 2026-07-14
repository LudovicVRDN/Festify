import { useNavigate } from "react-router";
import TornEdge from "../../components/TornEdge";
import Button from "../../components/ui/button";
import api from "../../api/axios.instance";
import { useAuthStore } from "../../stores/auth.store";
import type { IFestival } from "../../types/festival.type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Modal from "../../components/ui/modal";
import FestivalListCard from "../../components/FestivalListCard";
import MissionListCard from "../../components/MissionListCard";
import { useEffect, useState } from "react";
import type { IMission } from "../../types/misison.type";
import { getStatus } from "../../utils/getStatus";

const OrganizerHomePage = () => {
  const role = useAuthStore((state) => state.user?.role);
  const id = useAuthStore((state) => state.user?.id);
  const [status, setStatus] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const {
    data,
    isPending,
    error } = useQuery<IFestival[]>({
      queryKey: ["festival", id],
      queryFn: async () => {
        const res = await api.get(`/user/${id}/festival`);
        return res.data;
      },
      enabled: !!id,
    });

  const deleteFestival = async (festivalId: number | undefined) => {
    try {
      await api.delete(`/festival/${festivalId}`);
      queryClient.invalidateQueries({ queryKey: ["festival"] });
    } catch (error) {
      console.error("Error deleting festival:", error);
    }
  };

  const {
    data: missions,
    isPending: missionsIsPending,
    error: missionsError }
    = useQuery<IMission[]>({
      queryKey: ["mission", id],
      queryFn: async () => {
        const res = await api.get(`/missions`);
        console.log("réponse brute:", res.data);
        return res.data;
      },
    });

  const deleteMission = async (missionId: number | undefined) => {
    try {
      await api.delete(`/missions/${missionId}`);
      queryClient.invalidateQueries({ queryKey: ["mission"] });

    } catch (error) {
      console.error("Error deleting festival:", error);
    }
  };

  useEffect(() => {
    console.log(missions)
    if (data) {
      const statuses = data.reduce<Record<string, string>>((acc, festival) => {
        acc[festival.id!] = getStatus(festival.start_date, festival.end_date);
        return acc;
      }, {});
    }
  }, [missions]);


  if (isPending || missionsIsPending) return <span>Loading...</span>;
  if (error || missionsError)
    return (
      <Modal
        buttonText="Un soucis"
        message="Aie c'est cassé"
        onClick={() => navigate("/")}
      />
    );


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
      <div className="">
        <TornEdge position="top" />
        <section className="bg-[#000000] flex  flex-col items-center gap-5   px-5 ">
          <Button
            textButton="Organise un nouveau Festival"
            variant="red"
            onClick={() => navigate("/organisateur/festival/create")}
          />
          <h2 className="line-title text-lg w-100 lg:w-150 text-red-hot">
            Mes Festivals
          </h2>

          <ul className="overflow-auto scrollbar-hide px-4 pt-3 pb-2 w-90 md:w-180 lg:w-225 xl:min-w-330 max-h-80 rounded-2xl">
            {data?.map((festival) => (
              <li>
                <FestivalListCard
                  name={festival.name}
                  city={festival.adress.city}
                  role={role!}
                  date={festival.start_date}
                  status={getStatus(festival.start_date, festival.end_date)}
                  showMore={() => navigate(`/festival/${festival.id}/edit`)}
                  handleDelete={() => deleteFestival(festival.id)}
                />
              </li>
            ))}
          </ul>
          <h2 className="font-metal text-xl lg:text-4xl text-festify-red text-center mb-5">
            Organise tes missions :
          </h2>

          <Button
            textButton="Planifie tes nouvelles missions"
            variant="red"
            onClick={() => navigate("/missions/create")}
          />

          <ul className=" overflow-auto scrollbar-hide px-4 pb-2 h-80 w-90 md:w-150  lg:w-225 xl:min-w-330 rounded-2xl">
            {missionsIsPending ? (
              <span>Chargement...</span>
            ) : (missions?.slice()
              .sort((a, b) => a.festival.name.localeCompare(b.festival.name))
              .map((mission) => (
                <li>
                  <MissionListCard
                    mission={mission}
                    status={getStatus(mission.time_start, mission.time_end)}
                    button={false}
                    role={role!}
                    handleDelete={() => deleteMission(mission.id)}
                    modify={false}
                  />
                </li>
              ))
            )}
          </ul>
        </section>
        <TornEdge position="bottom" />
      </div>
    </div>
  );
};

export default OrganizerHomePage;
