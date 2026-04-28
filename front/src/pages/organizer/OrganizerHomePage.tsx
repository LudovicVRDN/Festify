import { Link } from "react-router";
import TornEdge from "../../components/TornEdge";
import FestivalDetailPage from "../festival/FestivalDetailPage";

interface IFestival {
  name: string;
  date: string;
  city: string;
  country: string;
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

  return (
    <div>
      <h1 className="font-metal text-xl lg:text-4xl text-festify-red text-center p-5">
        Prêt à créer le festival qui va marquer l'histoire ?
      </h1>

      <TornEdge position="top" />
      <section className="bg-black flex h-75 flex-col items-center ">
        <article className="border border-neutral-800 overflow-auto scrollbar-hide px-4 w-300">
        {festivalList.map((festival) => (
          <div
            key={festival.name}
            className="w-full lg:h-18 flex justify-between items-center bg-transparent border-b border-zinc-700  py-2 text-white "
          >
            <h2 className="text-zinc-300 text-xs tracking-widest uppercase max-w-20 ">
              {festival.name}
            </h2>
            <div className="max-w-30 lg:max-w-45">
              <p className="text-zinc-300 text-xs tracking-widest uppercase">
                Ton festival aura lieu <br />
                le : {festival.date}, <br />
                a : {festival.city} en {festival.country}
              </p>
            </div>
            <div className="flex flex-col">
              <Link to={"/festival/:id"}>Plus d'infos</Link>
            <button>Supprimer </button>
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
