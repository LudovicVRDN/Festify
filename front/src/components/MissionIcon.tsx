import React from 'react'

const MissionIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* feuille avec coin plié /}
    <path d="M12.5 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8l6 6v4" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    {/ crayon */}
    <path d="M10.4 12.6a2 2 0 0 1 3 3L8 21l-4 1 1-4Z" />
  </svg>
);

export default MissionIcon;