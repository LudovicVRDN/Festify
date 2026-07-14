import React from "react";
import MusicIcon from "./MusicIcon";
import StatusBadge from "./StatusBadge";

import IconFestivalCard from "./IconeFestivalCard";
import Button from "./ui/button";

interface cardProps {
  name: string;
  date: string;
  role: string,
  city: string | undefined;
  status: string;
  showMore?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  handleDelete?: (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => void | Promise<void>;
}

const FestivalListCard = ({
  name,
  date,
  role,
  city,
  status,
  showMore,
  handleDelete,
}: cardProps) => {
  const isPast = status === "past";
  const isOrganisateur = role === "organisateur";

  return (
    <div
      className={`clipped-card w-full relative flex flex-col md:flex-row items-center gap-4
      p-4 mb-2 transition-colors
      bg-[#111] hover:border-2
      border-l-2 ${isPast ? "border-[#2a2a2a] opacity-70" : "border-red-700"}`}
    >
      <div className="flex gap-5">
        <div className="clipped-icon w-10 h-10 flex items-center justify-center bg-[#1e0808] border border-[#2f1010] shrink-0">
          <MusicIcon
            className={`w-5 h-5 ${isPast ? "text-[#444]" : "text-red-400"}`}
          />
        </div>

        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-bold uppercase tracking-widest ${isPast ? "text-[#555]" : "text-[#e0e0e0]"}`}
          >
            {name}
            <StatusBadge status={status} />
          </p>
          <div className="flex gap-3 mt-1">
            <IconFestivalCard
              icon="calendar"
              label={new Date(date).toLocaleDateString("fr-FR")}
            />
            <IconFestivalCard icon="map-pin" label={city} />
          </div>
        </div>
      </div>

      <div className="flex gap-2 shrink-0 ml-auto">
        <Button textButton="Plus d'infos" variant="grey" onClick={showMore} />
        {isOrganisateur ? (
          <Button textButton="Supprimer" variant="red" onClick={handleDelete} />
        ) : (
          <Button textButton="Les missions" variant="red" onClick={showMore}/>
        )}
      </div>
    </div>
  );
};

export default FestivalListCard;
