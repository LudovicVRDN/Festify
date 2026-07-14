import React from "react";

const StatusBadge = ({ status }: { status: string }) => {
  const isPast = status === "past";
  const isOngoing = status === "ongoing";

  return (
    <span
      className={`clipped-btn inline-block text-[9px] font-bold tracking-widest uppercase px-3 py-0.5 ml-2
      ${
        isPast
          ? "bg-[#141414] text-[#555] border border-[#222]"
          : isOngoing
            ? "bg-[#0a1a0a] text-green-400 border border-[#1a3a1a]"
            : "bg-[#1e0808] text-red-400 border border-[#3a1010]"
      }`}
    >
      {isPast ? "Passé" : isOngoing ? "En cours" : "À venir"}
    </span>
  );
};

export default StatusBadge;
