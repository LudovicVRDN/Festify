import TornEdge from "../../components/TornEdge";
import Button from "../../components/ui/button";
import { useNavigate } from "react-router";
import type { IFestival } from "../../types/festival.type";
import FestivalListCard from "../../components/FestivalListCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../api/axios.instance";
import Modal from "../../components/ui/modal";
import { useAuthStore } from "../../stores/auth.store";
import MissionListCard from "../../components/MissionListCard";
import type { IMission } from "../../types/misison.type";


const VolunteerHomePage = () => {
  const role = useAuthStore((state) => state.user?.role);
  const navigate = useNavigate();
  const id = useAuthStore((state) => state.user?.id);

  const {
    data,
    isPending,
    error } = useQuery<IFestival[]>({
      queryKey: ["festival"],
      queryFn: async () => {
        const res = await api.get(`/festival`);
        const user = await api.get(`/user/${id}`);
        const filtredFestival = res.data.filter(
          (festival: IFestival) =>
            (festival.adress.postalCode ?? "").slice(0, 2) ===
            user.data.profile.adress.postalCode.slice(0, 2),
        );
        return res.data;
      },
    });

  const {
    data: missions,
    isPending: missionsIsPending,
    error: missionsError,
  } = useQuery<IMission[]>({
    queryKey: ["missions"],
    queryFn: async () => {
      const res = await api.get(`/missions/mine`)
      return res.data
    },

  })


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
        <article className=" overflow-auto scrollbar-hide px-4 pb-2 w-90 md:w-150  lg:w-225 xl:min-w-330 h-80 rounded-2xl">
          {data?.map((festival) => (
            <FestivalListCard
              name={festival.name}
              role={role!}
              city={festival.adress.city}
              date={festival.start_date}
              showMore={() => navigate(`/festival/${festival.id}/details`)}
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
        <ul className="overflow-auto scrollbar-hide px-4 pb-2 h-80 w-90 md:w-150 lg:w-225 xl:min-w-330 rounded-2xl">
          {missionsIsPending ? (
            <span>Chargement...</span>
          ) : (
            missions?.slice()
              .sort((a, b) => a.festival.name.localeCompare(b.festival.name))
              .map((mission) => (
                // 1. Ajout de la 'key' unique sur le li
                <li key={mission.id}>
                  <div
                    className={`clipped-card w-full relative flex flex-col xl:flex-row items-center gap-4 
            p-4 mb-2 transition-colors bg-[#111] hover:border-2 border-l-2 
            ${isPast ? "border-[#2a2a2a] opacity-70" : "border-red-700"}`}
                  >
                    <div className="flex gap-5 w-full"> {/* Ajout de w-full pour l'alignement */}
                      <div className="clipped-icon w-10 h-10 flex items-center justify-center bg-[#1e0808] border border-[#2f1010] shrink-0">
                        <MissionIcon
                          className={`w-5 h-5 ${isPast ? "text-[#444]" : "text-red-400"}`}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-bold uppercase tracking-widest ${isPast ? "text-[#555]" : "text-[#e0e0e0]"}`}
                        >
                          {mission.title}
                          {status && <StatusBadge status={status} />}
                        </p>
                        <div className="flex gap-3 mt-1">
                          <IconFestivalCard
                            icon="calendar"
                            label={new Date(mission.time_start).toLocaleDateString("fr-FR")}
                          />
                          <IconFestivalCard
                            icon="map-pin"
                            // 2. Sécurisation de l'accès à l'adresse avec '?.'
                            label={
                              mission.festival.name + ", " + (mission.festival.adress?.city || "Ville non renseignée")
                            }
                          />
                          <p className="text-[11px] text-[#555]">
                            Volontaire requis: {mission.volunteer_needed}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div> {/* 3. Fermeture correcte de la div 'clipped-card' */}
                </li>
              ))
          )}
        </ul>
        <div className="flex flex-col gap-2">
          <Button textButton="Voir tes missions" variant="red" />

        </div>
      </section>

      <TornEdge position="bottom" />
    </div>
  );
};

export default VolunteerHomePage;
