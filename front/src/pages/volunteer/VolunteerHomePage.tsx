
import Slider from "../../components/Slider";
import TornEdge from "../../components/TornEdge";
import Button from "../../components/ui/button";
import { Link } from "react-router";
import { Fade } from "react-awesome-reveal";

interface IFestival {
  name: string;
  date: string;
  city: string;
  country: string;
}

const VolunteerHomePage = () => {
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

interface NotificationBenevole {
  id: string;
  date: string;
  categorie: 'Planning' | 'Logistique' | 'Urgence';
  message: string;
}

const notificationsFestival: NotificationBenevole[] = [
  {
    id: "notif-001",
    date: "2026-06-12 08:30",
    categorie: "Planning",
    message: "Rappel : Votre shift au stand 'Billetterie' commence dans 30 minutes."
  },
  {
    id: "notif-002",
    date: "2026-06-12 12:15",
    categorie: "Logistique",
    message: "Les paniers repas sont disponibles au point info bénévoles."
  },
  {
    id: "notif-003",
    date: "2026-06-12 14:00",
    categorie: "Urgence",
    message: "Besoin de renfort immédiat à l'entrée Sud (flux important)."
  },
  {
    id: "notif-004",
    date: "2026-06-11 18:00",
    categorie: "Planning",
    message: "Briefing général de fin de journée sur la Grande Scène à 19h."
  }
];

  return (
    <div>
      <h1 className="font-metal text-xl text-festify-red lg:text-4xl mt-5 text-center ">
        Et si tu participais a ces festival ?{" "}
      </h1>
      <Fade direction="down" delay={500}>
      <Slider />
      </Fade>
      <TornEdge position="top" />
      <section className="bg-black flex  flex-col items-center gap-5 lg:gap-10  px-5 ">
        <h1 className="font-metal text-xl lg:text-4xl text-festify-red text-center mb-5">
          Ces festivals sont proches de chez toi ! Alors ? Let's go ?
        </h1>
        <article className="border border-neutral-800 overflow-auto scrollbar-hide px-4 pb-2 w-90 md:w-200 xl:w-300 h-80 rounded-2xl">
          {festivalList.map((festival) => (
            <div
              key={festival.name}
              className="w-full lg:h-30  flex justify-between items-center bg-transparent border-b border-zinc-700  py-2 text-white "
            >
              <h2 className="text-zinc-300 text-xs lg:text-base tracking-widest uppercase max-w-30 ">
                {festival.name}
              </h2>
              <div className="max-w-30 lg:max-w-60 hidden lg:block">
                <p className="text-zinc-300 text-xs lg:text-base tracking-widest uppercase">
                  Ton festival aura lieu <br />
                  le : {festival.date}, <br />a : {festival.city} en{" "}
                  {festival.country}
                </p>
              </div>
              <div className="flex flex-col gap-1 w-30 ">
                <Link to={"/festival/:id"}>
                  {" "}
                  <Button textButton="Plus d'infos" variant="grey" />{" "}
                </Link>
                <Link to={"/festival/:id/mission"}>
                  <Button textButton="Missions" variant="red" />
                </Link>
                
              </div>
            </div>
          ))}
        </article>
        <h1 className="font-metal text-xl lg:text-4xl text-festify-red text-center mb-5">
          Voici toutes tes missions :
        </h1>
      </section>
      <section className="flex flex-col lg:flex-row bg-black justify-center items-center gap-10">
        <article className="border border-neutral-800 overflow-auto scrollbar-hide px-4 pb-2 w-90 md:w-150 h-50 rounded-2xl">
          {notificationsFestival.map((notification) => (
            <div
              key={notification.id}
              className="w-full lg:h-25 flex justify-between items-center bg-transparent border-b border-zinc-700  py-2 text-white "
            >
              <h2 className="text-zinc-300 text-xs lg:text-base  tracking-widest uppercase max-w-50 lg:max-w-80">
                {notification.message}
              </h2>

              <p className="text-zinc-300 text-xs lg:text-base  tracking-widest uppercase">
                le : {notification.date}
              </p>
            </div>
          ))}
        </article>
        <div className="flex flex-col gap-2">
        <Button textButton="Voir tes missions" variant="red"/>
         <Button textButton="Voir tes compétences" variant="grey"/>
         </div>
      </section>

      <TornEdge position="bottom" />
    </div>
  );
};

export default VolunteerHomePage;
