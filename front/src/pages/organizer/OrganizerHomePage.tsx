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

interface IMission {
  title: string;
  volunter_needed: number;
  is_full: boolean;
  description: string;
  festival: IFestival;
}

const OrganizerHomePage = () => {
  const id = useAuthStore((state) => state.user?.id);
  const [status, setStatus] = useState<string | null>(null);

  const navigate = useNavigate();

  const { data, isPending, error } = useQuery<IFestival[]>({
    queryKey: ["festival", id],
    queryFn: async () => {
      const res = await api.get(`/user/${id}/festival`);
      return res.data;
    },
    enabled: !!id,
  });

  function toDay(date: Date | string): Date {
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  function getStatus(
    startString: string,
    endString: string | undefined,
  ): string {
    const now = toDay(new Date());
    const start = toDay(startString);
    const end = toDay(endString!);

    if (now < start) return "future";
    else if (now > end) return "past";
    else return "ongoing";
  }

  useEffect(() => {
    if (data) {
      const statuses = data.reduce<Record<string, string>>((acc, festival) => {
        acc[festival.id!] = getStatus(festival.start_date, festival.end_date);
        return acc;
      }, {});
    }
  }, []);
  if (isPending) return <span>Loading...</span>;
  if (error)
    return (
      <Modal
        buttonText="Un soucis"
        message="Aie c'est cassé"
        onClick={() => navigate("/")}
      />
    );

  const missionList: IMission[] = [
    {
      title: "Gestion de la scène principale",
      volunter_needed: 10,
      is_full: false,
      description:
        "Aider à l'installation et à la gestion du matériel scénique.",
      festival: {
        name: "Hellfest Open Air",
        start_date: "2026-06-18",
        adress: {
          city: "clisson",
          postalCode: "25252",
          street: "Rue machin",
        },
      },
    },
    {
      title: "Accueil du public",
      volunter_needed: 15,
      is_full: true,
      description:
        "Accueillir et orienter les festivaliers à l'entrée du site.",
      festival: {
        name: "Hellfest Open Air",
        start_date: "2026-06-18",
        adress: {
          city: "clisson",
          postalCode: "25252",
          street: "Rue machin",
        },
      },
    },
    {
      title: "Sécurité périmétrique",
      volunter_needed: 8,
      is_full: false,
      description: "Surveiller les accès et assurer la sécurité du périmètre.",
      festival: {
        name: "Hellfest Open Air",
        start_date: "2026-06-18",
        adress: {
          city: "clisson",
          postalCode: "25252",
          street: "Rue machin",
        },
      },
    },
    {
      title: "Gestion des stands alimentaires",
      volunter_needed: 12,
      is_full: true,
      description:
        "Aider à la distribution et à la gestion des stands de nourriture.",
      festival: {
        name: "Hellfest Open Air",
        start_date: "2026-06-18",
        adress: {
          city: "clisson",
          postalCode: "25252",
          street: "Rue machin",
        },
      },
    },
    {
      title: "Communication et réseaux sociaux",
      volunter_needed: 5,
      is_full: false,
      description: "Couvrir l'événement en temps réel sur les réseaux sociaux.",
      festival: {
        name: "Hellfest Open Air",
        start_date: "2026-06-18",
        adress: {
          city: "clisson",
          postalCode: "25252",
          street: "Rue machin",
        },
      },
    },
    {
      title: "Nettoyage et éco-responsabilité",
      volunter_needed: 20,
      is_full: false,
      description:
        "Assurer la propreté du site et sensibiliser au tri des déchets.",
      festival: {
        name: "Hellfest Open Air",
        start_date: "2026-06-18",
        adress: {
          city: "clisson",
          postalCode: "25252",
          street: "Rue machin",
        },
      },
    },
  ];

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

          <article className="overflow-auto scrollbar-hide px-4 pt-3 pb-2 w-90 md:w-180 lg:w-225 xl:min-w-330 max-h-80 rounded-2xl">
            {data?.map((festival) => (
              <FestivalListCard
                name={festival.name}
                city={festival.adress.city}
                date={festival.start_date}
                status={getStatus(festival.start_date, festival.end_date)}
              />
            ))}
          </article>
          <h2 className="font-metal text-xl lg:text-4xl text-festify-red text-center mb-5">
            Organise tes missions :
          </h2>

          <Button
            textButton="Planifie tes nouvelles missions"
            variant="red"
            onClick={() => navigate("/missions/create")}
          />

          <article className=" overflow-auto scrollbar-hide px-4 pb-2 h-80 w-90 md:w-150  lg:w-225 xl:min-w-330 rounded-2xl">
            {missionList.map((mission) => (
              <MissionListCard
                city={mission.festival.adress.city}
                date={mission.festival.start_date}
                mission={mission.description}
                festival={mission.festival.name}
                status="En Cours"
              />
            ))}
          </article>
        </section>
        <TornEdge position="bottom" />
      </div>
    </div>
  );
};

export default OrganizerHomePage;
