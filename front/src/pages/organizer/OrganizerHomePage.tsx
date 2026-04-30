import { Link } from "react-router";
import TornEdge from "../../components/TornEdge";
import FestivalDetailPage from "../festival/FestivalDetailPage";
import Button from "../../components/ui/button";
import Slider from "../../components/Slider";

interface IFestival {
  name: string;
  date: string;
  city: string;
  country: string;
}

interface IMission {
  title: string;
  volunter_needed: number;
  is_full: boolean;
  description: string;
  festival: IFestival;
}

const OrganizerHomePage = () => {
  const festivalList: IFestival[] = [
    {
      name: "Hellfest Open Air",
      date: "2026-06-18",
      city: "Clisson",
      country: "France",
    },
    {
      name: "Tomorrowland",
      date: "2026-07-17",
      city: "Boom",
      country: "Belgique",
    },
    {
      name: "Wacken Open Air",
      date: "2026-07-29",
      city: "Wacken",
      country: "Allemagne",
    },
    {
      name: "Sziget Festival",
      date: "2026-08-05",
      city: "Budapest",
      country: "Hongrie",
    },
    {
      name: "Graspop Metal Meeting",
      date: "2026-06-25",
      city: "Dessel",
      country: "Belgique",
    },
  ];

  const missionList: IMission[] = [
    {
      title: "Gestion de la scène principale",
      volunter_needed: 10,
      is_full: false,
      description:
        "Aider à l'installation et à la gestion du matériel scénique.",
      festival: {
        name: "Hellfest Open Air",
        date: "2026-06-18",
        city: "Clisson",
        country: "France",
      },
    },
    {
      title: "Accueil du public",
      volunter_needed: 15,
      is_full: true,
      description:
        "Accueillir et orienter les festivaliers à l'entrée du site.",
      festival: {
        name: "Tomorrowland",
        date: "2026-07-17",
        city: "Boom",
        country: "Belgique",
      },
    },
    {
      title: "Sécurité périmétrique",
      volunter_needed: 8,
      is_full: false,
      description: "Surveiller les accès et assurer la sécurité du périmètre.",
      festival: {
        name: "Wacken Open Air",
        date: "2026-07-29",
        city: "Wacken",
        country: "Allemagne",
      },
    },
    {
      title: "Gestion des stands alimentaires",
      volunter_needed: 12,
      is_full: true,
      description:
        "Aider à la distribution et à la gestion des stands de nourriture.",
      festival: {
        name: "Sziget Festival",
        date: "2026-08-05",
        city: "Budapest",
        country: "Hongrie",
      },
    },
    {
      title: "Communication et réseaux sociaux",
      volunter_needed: 5,
      is_full: false,
      description: "Couvrir l'événement en temps réel sur les réseaux sociaux.",
      festival: {
        name: "Graspop Metal Meeting",
        date: "2026-06-25",
        city: "Dessel",
        country: "Belgique",
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
        date: "2026-06-18",
        city: "Clisson",
        country: "France",
      },
    },
  ];

  return (
    <div className="lg:mt-10">
      <h1 className="font-metal text-xl text-festify-red lg:text-4xl  text-center ">
        Et si c'était ton festival ?{" "}
      </h1>
      <Slider />
      <TornEdge position="top" />
      <section className="bg-black flex  flex-col items-center gap-5   px-5 ">
        <h1 className="font-metal text-xl lg:text-4xl text-festify-red text-center mb-5">
          Prêt à créer le festival qui va marquer l'histoire ?
        </h1>
        <Link to="festival/create">
          <Button textButton="Organise un nouveau Festival" variant="red" />
        </Link>
        <article className="border border-neutral-800 overflow-auto scrollbar-hide px-4 pb-2 w-95 md:w-150 lg:w-225 xl:w-300 h-80 rounded-2xl">
          {festivalList.map((festival) => (
            <div
              key={festival.name}
              className="w-full lg:h-30 flex justify-between items-center bg-transparent border-b border-zinc-700  py-2 text-white "
            >
              <h2 className="text-zinc-300 text-xs lg:text-base tracking-widest uppercase max-w-15 lg:max-w-30 wrap-break-word">
                {festival.name}
              </h2>
              <div className="max-w-30 lg:max-w-60 hidden lg:block">
                <p className="text-zinc-300 text-xs lg:text-base tracking-widest uppercase">
                  Ton festival aura lieu <br />
                  le : {festival.date}, <br />a : {festival.city} en{" "}
                  {festival.country}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <Link to={"/festival/:id"}>
                  {" "}
                  <Button textButton="Plus d'infos" variant="grey" />{" "}
                </Link>
                <Button textButton="Supprimer" variant="red"/>
              </div>
            </div>
          ))}
        </article>
        <h1 className="font-metal text-xl lg:text-4xl text-festify-red text-center mb-5">
          Organise tes missions :
        </h1>
        <Link to="missions/create">
          <Button textButton="Planifie tes nouvelles missions" variant="red"/>
        </Link>
        <article className="border border-neutral-800 overflow-auto scrollbar-hide px-4 pb-2 h-80 w-95 md:w-150  lg:w-225 xl:w-300 rounded-2xl">
          {missionList.map((mission) => (
            <div
              key={mission.title}
              className="w-full lg:h-30 flex justify-between items-center bg-transparent border-b border-zinc-700  py-2 text-white "
            >
              <h2 className="text-zinc-300 text-xs lg:text-base tracking-widest uppercase max-w-15 lg:max-w-30 wrap-break-word   ">
                {mission.title}
              </h2>
              <div className="max-w-30 lg:max-w-60 ">
                <p className="text-zinc-300 text-xs lg:text-base tracking-widest uppercase hidden lg:block">
                  Cette mission a lieu <br />
                  le : {mission.festival.date}, 
                  </p>
                  <p className="text-zinc-300 text-xs lg:text-base tracking-widest uppercase w-25 wrap-break-word lg:w-60">
                   {mission.festival.name}
                </p>
              </div>
              <div className="flex flex-col gap-1 ">
                <Link to={"/missions/:id"}>
                  {" "}
                  <Button textButton="Plus d'infos" variant="grey" />{" "}
                </Link>
                <Button textButton="Supprimer" variant="red"/>
              </div>
            </div>
          ))}
        </article>
      </section>
      <TornEdge position="bottom" />
    </div>
  );
};

export default OrganizerHomePage;
