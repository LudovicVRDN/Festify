import React from "react";

const IconFestivalCard = ({
  icon,
  label,
}: {
  icon: "calendar" | "map-pin";
  label?: string | undefined;
}) => {
  const icons = {
    calendar: (
      <svg
        className="w-3 h-3"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    "map-pin": (
      <svg
        className="w-3 h-3"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  };

  return (
    <span className="flex items-center gap-1 text-[11px] text-[#555]">
      {icons[icon]}
      {label}
    </span>
  );
};

export default IconFestivalCard;
