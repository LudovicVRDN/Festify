import React from "react";
import StatusBadge from "./StatusBadge";
import IconFestivalCard from "./IconeFestivalCard";
import Button from "./ui/button";
import MissionIcon from "./MissionIcon";
import type { IMission } from "../types/misison.type";

interface cardProps {
  mission: IMission;
  button: boolean;
  role: string;
  modify: boolean;
  currentUserId?: number;
  status?: string;
  showMore?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  handleDelete?: (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => void | Promise<void>;
  handleRegister?: (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => void | Promise<void>;
}

const MissionListCard = ({
  mission,
  button,
  status,
  role,
  modify,
  currentUserId,
  showMore,
  handleDelete,
  handleRegister
}: cardProps) => {
  const isPast = status === "past";
  const isOrganisateur = role === "organisateur";

  const isRegistered = mission.volunteers?.some(
    (volunteer: any) => volunteer.id === currentUserId
  ) ?? false;

  return (
    <div
      className={`clipped-card w-full relative flex flex-col xl:flex-row items-center gap-4 
      p-4 mb-2 transition-colors
      bg-[#111] hover:border-2
      border-l-2 ${isPast ? "border-[#2a2a2a] opacity-70" : "border-red-700"}`}
    >
      <div className="flex gap-5">
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
              label={
                mission.festival.name + ", " + (mission.festival.adress?.city || "Ville non renseignée")
              }
            />
            <p className="text-[11px] text-[#555]">
              Volontaires requis: {mission.volunteer_needed}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 shrink-0 ml-auto">
        {button && (
          <Button textButton={modify ? 'Modifier' : 'Voir plus'} variant="grey" onClick={showMore} />
        )}

        {isOrganisateur ? (
          <Button textButton="Supprimer" variant="red" onClick={handleDelete} />
        ) : (
          /* On affiche le bouton "S'inscrire" uniquement si l'utilisateur n'est PAS encore inscrit */
          !isRegistered && (
            <Button
              textButton="S'inscrire"
              variant="red"
              onClick={handleRegister}
            />
          )
        )}
      </div>

    </div>
  );
};

export default MissionListCard;