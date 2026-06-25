import Slider from "../../components/Slider";
import TornEdge from "../../components/TornEdge";
import Button from "../../components/ui/button";
import { useNavigate } from "react-router";
import { Fade } from "react-awesome-reveal";
import type { IFestival } from "../../types/festival.type";
import FestivalListCard from "../../components/FestivalListCard";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios.instance";
import Modal from "../../components/ui/modal";
import { useAuthStore } from "../../stores/auth.store";
import MissionListCard from "../../components/MissionListCard";

const VolunteerHomePage = () => {
  const navigate = useNavigate();
  const id = useAuthStore((state) => state.user?.id);

  const { data, isPending, error } = useQuery<IFestival[]>({
    queryKey: ["festival"],
    queryFn: async () => {
      const res = await api.get(`/festival`);
      const user = await api.get(`/user/${id}`);
      const filtredFestival = res.data.filter(
        (festival: IFestival) =>
          (festival.adress.postalCode ?? "").slice(0, 2) ===
          user.data.profile.adress.postalCode.slice(0, 2),
      );
      return filtredFestival;
    },
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

  interface NotificationBenevole {
    id: string;
    date: string;
    categorie: "Planning" | "Logistique" | "Urgence";
    message: string;
  }

  const notificationsFestival: NotificationBenevole[] = [
    {
      id: "notif-001",
      date: "2026-06-12 08:30",
      categorie: "Planning",
      message:
        "Rappel : Votre shift au stand 'Billetterie' commence dans 30 minutes.",
    },
    {
      id: "notif-002",
      date: "2026-06-12 12:15",
      categorie: "Logistique",
      message: "Les paniers repas sont disponibles au point info bénévoles.",
    },
    {
      id: "notif-003",
      date: "2026-06-12 14:00",
      categorie: "Urgence",
      message: "Besoin de renfort immédiat à l'entrée Sud (flux important).",
    },
    {
      id: "notif-004",
      date: "2026-06-11 18:00",
      categorie: "Planning",
      message: "Briefing général de fin de journée sur la Grande Scène à 19h.",
    },
  ];

  if (isPending) return <span>Loading...</span>;
  if (error)
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
          Festival Volunteer
        </p>
        <h1 className="font-metal text-4xl lg:text-6xl text-center mb-5">
          Prêt à participer aux festivals qui vont{" "}
          <span className="text-red-hot">marquer l'histoire </span> ?
        </h1>
        <p className="text-neutral-500 text-center text-lg font-metal">
          Participe aux évenements Rock & Metal
        </p>
      </div>

      <TornEdge position="top" />
      <section className="bg-black flex  flex-col items-center gap-5 lg:gap-10  px-5 ">
        <div className="w-90 lg:w-250">
          <h2 className="line-title font-metal text-xl lg:text-3xl text-festify-red text-center mb-5">
            Tout les festivals dans ta région
          </h2>
        </div>
        <article className=" overflow-auto scrollbar-hide px-4 pb-2 w-90 md:w-200 xl:w-300 h-80 rounded-2xl">
          {data?.map((festival) => (
            <FestivalListCard
              name={festival.name}
              city={festival.adress.city}
              date={festival.start_date}
              status={getStatus(festival.start_date, festival.end_date)}
            />
          ))}
        </article>
        <div className="w-90 lg:w-250">
          <h2 className="line-title font-metal text-xl lg:text-3xl text-festify-red text-center mb-5">
            Voici toutes tes missions :
          </h2>
        </div>
      </section>
      <section className="flex flex-col  bg-black justify-center items-center gap-10">
        <article className=" overflow-auto scrollbar-hide px-4 pb-2 w-90 md:w-200 xl:w-300 h-80 rounded-2xl">
          {notificationsFestival.map((notification) => (
            <MissionListCard
              city={notification.categorie}
              date={notification.date}
              mission={notification.message}
              festival="ici"
              status="En Cours"
            />
          ))}
        </article>
        <div className="flex flex-col gap-2">
          <Button textButton="Voir tes missions" variant="red" />
          <Button textButton="Voir tes compétences" variant="grey" />
        </div>
      </section>

      <TornEdge position="bottom" />
    </div>
  );
};

export default VolunteerHomePage;
