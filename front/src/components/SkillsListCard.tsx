import React from "react";
import MissionIcon from "./MissionIcon";
import Button from "./ui/button";
import Modal from "./ui/modal";

interface cardProps {
  name: string;
  descritpion: string;
  id: number;
  showMore?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  handleDelete: (id: number) => void | Promise<void>;
}

const SkillsListCard = ({
  name,
  descritpion,
  id,
  showMore,
  handleDelete,
}: cardProps) => {
  return (
    <div
      className={`clipped-card w-full relative flex flex-col md:flex-row items-center gap-4
      p-4 mb-2 transition-colors border-red-700
      bg-[#111] hover:bg-[#161616]
      border-l-2 `}
    >
      <div className="flex gap-5">
        <div className="clipped-icon w-10 h-10 flex items-center justify-center bg-[#1e0808] border border-[#2f1010] shrink-0">
          <MissionIcon className={`w-5 h-5 $`} />
        </div>
        <div className="flex flex-col">
          <p className="text-lg">Compétence: {name}</p>
          <p className="text-lg">Description: {descritpion}</p>
        </div>
      </div>

      <div className="flex gap-2 shrink-0 ml-auto">
        <Button textButton="Plus d'infos" variant="grey" onClick={showMore} />
        <Modal
          buttonText="Supprimer"
          message="Est-tu sur de vouloir supprimer cette compétence ?"
          onClick={() => handleDelete(id)}
        />
      </div>
    </div>
  );
};

export default SkillsListCard;
