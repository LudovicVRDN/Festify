import { useNavigate } from "react-router";
import TornEdge from "../../components/TornEdge";
import Button from "../../components/ui/button";
import api from "../../api/axios.instance";
import { useAuthStore } from "../../stores/auth.store";
import type { IFestival } from "../../types/festival.type";
import { useQuery } from "@tanstack/react-query";
import Modal from "../../components/ui/modal";
import FestivalListCard from "../../components/FestivalListCard";
import MissionListCard from "../../components/MissionListCard";
import { useEffect, useState } from "react";
import type { IMission } from "../../types/misison.type";
import { getStatus } from "../../utils/getStatus";

const OrganizerHomePage = () => {
  const id = useAuthStore((state) => state.user?.id);
  const [status, setStatus] = useState<string | null>(null);

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

  useEffect(() => {
    console.log(missions)
    if (data) {
      const statuses = data.reduce<Record<string, string>>((acc, festival) => {
        acc[festival.id!] = getStatus(festival.start_date, festival.end_date);
        return acc;
      }, {});
    }
  }, [missions]);


  if (isPending) return <span>Loading...</span>;
  if (error)
    return (
      <Modal
        buttonText="Un soucis"
        message="Aie c'est cassé"
        onClick={() => navigate("/")}
      />
    );

  // const missionList: IMission[] = [
  //   {
  //     title: "Gestion de la scène principale",
  //     volunteer_needed: 10,
  //     is_full: false,
  //     time_start: "2026-07-10",
  //     time_end: "2026-07-15",
  //     description:
  //       "Aider à l'installation et à la gestion du matériel scénique.",
  //     festival: {
  //       name: "Hellfest Open Air",
  //       start_date: "2026-06-18",
  //       adress: {
  //         city: "clisson",
  //         postalCode: "25252",
  //         street: "Rue machin",
  //       },
  //     },
  //   },
  //   {
  //     title: "Accueil du public",
  //     volunteer_needed: 15,
  //     is_full: true,
  //     description:
  //       "Accueillir et orienter les festivaliers à l'entrée du site.",
  //     time_start: "2026-07-10",
  //     time_end: "2026-07-15",
  //     festival: {
  //       name: "Hellfest Open Air",
  //       start_date: "2026-06-18",
  //       adress: {
  //         city: "clisson",
  //         postalCode: "25252",
  //         street: "Rue machin",
  //       },
  //     },
  //   },
  //   {
  //     title: "Sécurité périmétrique",
  //     volunteer_needed: 8,
  //     is_full: false,
  //     description: "Surveiller les accès et assurer la sécurité du périmètre.",
  //     time_start: "2026-07-10",
  //     time_end: "2026-07-15",
  //     festival: {
  //       name: "Hellfest Open Air",
  //       start_date: "2026-06-18",
  //       adress: {
  //         city: "clisson",
  //         postalCode: "25252",
  //         street: "Rue machin",
  //       },
  //     },
  //   },
  //   {
  //     title: "Gestion des stands alimentaires",
  //     volunteer_needed: 12,
  //     is_full: true,
  //     time_start: "2026-07-10",
  //     time_end: "2026-07-15",
  //     description:
  //       "Aider à la distribution et à la gestion des stands de nourriture.",
  //     festival: {
  //       name: "Hellfest Open Air",
  //       start_date: "2026-06-18",
  //       adress: {
  //         city: "clisson",
  //         postalCode: "25252",
  //         street: "Rue machin",
  //       },
  //     },
  //   },
  //   {
  //     title: "Communication et réseaux sociaux",
  //     volunteer_needed: 5,
  //     is_full: false,
  //     time_start: "2026-07-10",
  //     time_end: "2026-07-15",
  //     description: "Couvrir l'événement en temps réel sur les réseaux sociaux.",
  //     festival: {
  //       name: "Hellfest Open Air",
  //       start_date: "2026-06-18",
  //       adress: {
  //         city: "clisson",
  //         postalCode: "25252",
  //         street: "Rue machin",
  //       },
  //     },
  //   },
  //   {
  //     title: "Nettoyage et éco-responsabilité",
  //     volunteer_needed: 20,
  //     is_full: false,
  //     time_start: "2026-06-10",
  //     time_end: "2026-06-15",
  //     description:
  //       "Assurer la propreté du site et sensibiliser au tri des déchets.",
  //     festival: {
  //       name: "Hellfest Open Air",
  //       start_date: "2026-06-18",
  //       adress: {
  //         city: "clisson",
  //         postalCode: "25252",
  //         street: "Rue machin",
  //       },
  //     },
  //   },
  // ];

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
                  date={festival.start_date}
                  status={getStatus(festival.start_date, festival.end_date)}
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
            ) : (missions?.map((mission) => (
              <li>
                <MissionListCard
                  mission={mission}
                  status={getStatus(mission.time_start, mission.time_end)}
                  button={true}
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
